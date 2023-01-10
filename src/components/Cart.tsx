import {CartService, ProductService} from "../lib/utils";
import * as utils from "../lib/utils";
import {useEffect, useState} from "react";
import {CartItem} from "../models/CartItem";

function Cart() {

    const [cartHTML, setCartHTML] = useState([<a key={0}></a>])

    const populateCartItemList = (cartItems: CartItem[]) => {
        let html: JSX.Element[] = [];
        for (let i in cartItems) {
            html[i] =
                <a key={cartItems[i].ID}>{CartService.stringify(cartItems[i])}</a>;
        }
        html.push(<a key="checkout" href="">Checkout</a>);
        return html;
    }
 
    return (
        <div className="dropdown">
            <button key={"a0"} onMouseEnter={ () => setCartHTML(populateCartItemList(CartService.getCartItems())) } className="dropbtn">Cart</button>
            <div key={"a1"} className="dropdown-content">
                {cartHTML}
            </div>
        </div>
    );
}

export default Cart;
