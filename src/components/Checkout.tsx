import "./Header.css"
import "./Checkout.css"

import {useEffect, useState} from "react";

import { CartService, ProductService } from "../lib/utils";
import { CartItem } from '../models/CartItem'
import { Product } from "../models/Product";
import { Relation } from "../models/Relation";

function simpleHeader() {
    return (
        <div className="header">
            <h1> <a onClick={(e) => {}}>Bee Positive Apiary</a></h1>
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
        <div>
            <a>Finalize</a>
        </div>
    );
}


function Checkout() {


    ProductService.setProductList();

    return (
        <div>
            {simpleHeader()}
            <br/>
            {CheckoutMenu()}

        </div>
    );
}


export default Checkout;