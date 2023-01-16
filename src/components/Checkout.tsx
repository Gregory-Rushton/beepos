import "./Header.css"
import "./Checkout.css"
import {useEffect, useState} from "react";
import {CartService, ProductService} from "../lib/utils";
import {CartItem} from '../models/CartItem'

function simpleHeader() {
    return (
        <div className="header">
            <h1> <a onClick={(e) => {}}>Bee Positive Apiary</a></h1>
        </div>
    );
}


function CheckoutMenu() {
    
    const [itemHTML, setItemHTML] = useState([] as JSX.Element[]);

    const cart = CartService.getCartItems();

    cart.forEach(element => {
        console.log(element);
    }) 


    return (
        <div className="checkout-box">
            Test
        </div>
    )
}


function Checkout() {


    let cart: CartItem[] = CartService.getCartItems();
    

    return (
        <div>
            {simpleHeader()}
            <br/>
            {CheckoutMenu()}

        </div>
    );
}

function Finalize() {
    return (
        <div>
            {simpleHeader()}

            <a>Checkout</a>

        </div>
    );
}

export default Checkout;