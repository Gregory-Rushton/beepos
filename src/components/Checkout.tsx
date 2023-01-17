import "./Header.css"
import "./Checkout.css"

import {useEffect, useState} from "react";

import { CartService, ProductService } from "../lib/utils";
import { CartItem } from '../models/CartItem'
import { Product } from "../models/Product";
import { Relation } from "../models/Relation";

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

    const [amount, setAmount] = useState(0);
    const [product, setProduct] = useState({} as Product);
    const [subproduct, setSubproduct] = useState({} as Product);
    const [relation, setRelation] = useState({"price": 0} as Relation);
    const [textColor, setTextColor] = useState({"color": "black"} as Object);

    const updateAmount = (newAmount: number) => {
        newAmount = Math.max(0, newAmount);
        setAmount(newAmount);
        let cart: CartItem[] = CartService.setItemAmount(CartService.getCartItems(), element.ID, element.subProductID, newAmount);
        CartService.saveCart(cart);

        if(newAmount === 0) {
            setTextColor({"color": "grey"});
            return;
        }
        setTextColor({"color": "black"});
    }

    useEffect(() => {
        setAmount(element.amount);
        setProduct(ProductService.getProduct(element.ID));
        setSubproduct(ProductService.getProduct(element.subProductID));
        setRelation(ProductService.getRelation(element.ID, element.subProductID));
    }, [])


    return (<tr key={`${element.ID}|${element.subProductID}`} className="checkout-item" style={textColor}>
        <td>
            {subproduct.name} {product.name}
        </td>
        <td>
            ${relation.price.toFixed(2)}
        </td>
        <td>
            x<input type="number" min={0} defaultValue={element.amount} onChange={(event) => {updateAmount(event.target.value as unknown as number)}}/>
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
    let tax: number = (subtotal * 0.0625) as number;
    let total = subtotal + tax;
    cartItems.push(<tr key="a"> <td> Subtotal: </td> <td/> <td/> <td> ${subtotal.toFixed(2)} </td>  </tr>)
    cartItems.push(<tr key="b"> <td> Tax:      </td> <td/> <td/> <td> + ${tax.toFixed(2)}    </td>  </tr>)
    cartItems.push(<tr key="c"> <td> Total:    </td> <td/> <td/> <td> ${total.toFixed(2)}    </td>  </tr>)

    return (
        <div className="checkout-container">
            <br />
            <label>Cart:</label>
            <br/>
            <br/>

            <div className="checkout-items">
                <table>
                    <tbody>
                        {cartItems}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function FinalizeMenu() {
    return (
        <div className="finalize-container">
            <a>Finalize</a>
        </div>
    );
}


function Checkout() {


    ProductService.setProductList();

    return (
        <div>
            {simpleHeader()}
            
            <div className="leftside-position">
                {CheckoutMenu()}
            </div>

            <div className="rightside-position">
                {FinalizeMenu()}
            </div>

        </div>
    );
}


export default Checkout;