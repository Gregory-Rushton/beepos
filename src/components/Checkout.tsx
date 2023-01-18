import "./Header.css"
import "./Checkout.css"

import React, { useEffect, useState } from "react";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts'
import  { AxiosError } from 'axios';

import { CartService, ProductService } from "../lib/utils";
import { Orders } from "../lib/ajax"
import { CartItem } from '../models/CartItem'
import { Product } from "../models/Product";
import { Relation } from "../models/Relation";
import { CreateOrderResponse } from "../models/CreateOrderResponse";


function simpleHeader() {
    return (
        <div>
            <div className="header" style={{border: "1px solid black"}}>
                <h1> <a onClick={(e) => {window.location.href="/"}}>Bee Positive Apiary</a></h1>
            </div>

            <div className="header">
                <h2>Checkout</h2>
            </div>
        </div>
    );
}


const CreateCartItem = (element: CartItem) => {

    const [amount, setAmount] = useState<number>(0);
    const [product, setProduct] = useState<Product>({} as Product);
    const [subproduct, setSubproduct] = useState<Product>({} as Product);
    const [relation, setRelation] = useState<Relation>({"price": 0} as Relation);
    const [textColor, setTextColor] = useState<Object>({"color": "black"} as Object);

    const updateAmount = (newAmount: number) => {
        newAmount = Math.max(0, newAmount);
        setAmount(newAmount);
        let cart: CartItem[] = CartService.setItemAmount(CartService.getCartItems(), element.ID, element.subProductID, newAmount);
        CartService.saveCart(cart);

        setTextColor({"color": newAmount===0 ? "grey" : "black"} as Object);
    }

    useEffect(() => {
        setAmount(element.amount);
        setProduct(ProductService.getProduct(element.ID));
        setSubproduct(ProductService.getProduct(element.subProductID));
        setRelation(ProductService.getRelation(element.ID, element.subProductID));
        setTextColor({"color": element.amount===0 ? "grey" : "black"} as Object);
    }, [])


    return (<tr key={`${element.ID}|${element.subProductID}`} className="checkout-item" style={textColor}>
        <td>
            {subproduct.name} {product.name}
        </td>
        <td>
            ${relation.price.toFixed(2)}
        </td>
        <td>
            <input type="number" min={0} defaultValue={element.amount} onChange={(event) => {updateAmount(event.target.value as unknown as number)}}/>
        </td>
        <td>
            (${(amount * relation.price).toFixed(2)})
        </td>
    </tr>);
}


function CheckoutMenu() {

    const cart = CartService.getCartItems();

    let cartItems: JSX.Element[] = [];
    cart.forEach((element, i) => {
        cartItems.push(CreateCartItem(element));
    })

    let subtotal: number = CartService.getTotals(cart).cost as unknown as number;
    let tax: number = (subtotal * (process.env.REACT_APP_TAX as any)) as number;
    let total = subtotal + tax;
    cartItems.push(<tr key="a"> <td> Subtotal: </td><td/><td/><td> ${subtotal.toFixed(2)} </td>  </tr>)
    cartItems.push(<tr key="b"> <td> Tax:      </td><td/><td/><td> + ${tax.toFixed(2)}    </td>  </tr>)
    cartItems.push(<tr key="c"> <td> Total:    </td><td/><td/><td> ${total.toFixed(2)}    </td>  </tr>)

    return (
        <div className="checkout-container">
            <br />
            <h2>Cart</h2>
            <br/>
            <br/>

            <div className="checkout-items">
                <table>
                    <tbody>
                        {cartItems}
                    </tbody>
                </table>
                Payment will be exchanged when the items are delivered 
                <br /><br />
            </div>
        </div>
    )
}

function FinalizeMenu() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    const placeOrder = async() => {
        try {
            let response = await Orders.add(CartService.getCartItems(), name, email, phone, `${street} ${city} ${state}`);
            ToastsStore.success(`Order has been placed!`);
            const data = response.data as CreateOrderResponse;

            setTimeout(() => {
                window.location.href = `/viewOrder?orderId=${data.orderID}&viewKey=${data.viewKey}`;
            }, 1500);

        } catch(error) {
            const err = error as AxiosError;
            const data = err.response?.data as JSON;
            console.log(data);
            ToastsStore.error(`There was an error placing your order: ${data["response" as keyof typeof data]}`);
        }
    }

    return (
        <div className="finalize-container">

            <br />
            <h2>Contact Information</h2>
            <br /><br />

            <table>
                <tbody>
                    <tr>
                        <td> <label>Name</label> </td>
                        <td> <input onChange={(event) => {setName(event.target.value as unknown as string)}} /> </td>
                    </tr>
                    <tr>
                        <td> <label>Email</label> </td>
                        <td> <input onChange={(event) => {setEmail(event.target.value as unknown as string)}} /> </td>
                    </tr>
                    <tr>
                        <td> <label>Phone</label> </td>
                        <td> <input onChange={(event) => {setPhone(event.target.value as unknown as string)}} /> </td>
                    </tr>
                    <tr>
                        <td/>
                        <td> <label>Address</label> </td>
                    </tr>
                    <tr>
                        <td> <label>State</label> </td>
                        <td> <input onChange={(event) => {setState(event.target.value as unknown as string)}} /> </td>
                    </tr>
                    <tr>
                        <td> <label>City</label> </td>
                        <td> <input onChange={(event) => {setCity(event.target.value as unknown as string)}}/> </td>
                    </tr>
                    <tr>
                        <td> <label>Street</label> </td>
                        <td> <input onChange={(event) => {setStreet(event.target.value as unknown as string)}}/> </td>
                    </tr>
                    

                </tbody>
            </table>

            <button onClick={(event) => {placeOrder()}}> Place Order </button>
            <br />
            <br />

        </div>
    );
}

function Checkout() {
    const [state, setState] = useState<Product[]>([]);
    const [checkoutMenuHTML, setCheckoutMenuHTML] = useState(<a>Loading</a>);

    useEffect(() => {
        const init = async() => {
            setState(await ProductService.setProductList());
        }
        init();
    }, []);


    useEffect(() => {
        if(state.length > 0) {
            setCheckoutMenuHTML(<CheckoutMenu />);
        }
    }, [state])

    return (
        <div>
            {simpleHeader()}
            <div className="leftside-position">
                {checkoutMenuHTML}
            </div>
            <div className="rightside-position">
                <FinalizeMenu />
            </div>
         </div>
    );
}


export default Checkout;