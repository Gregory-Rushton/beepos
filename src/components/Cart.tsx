import {CartService, ProductService} from "../lib/utils";
import * as utils from "../lib/utils";
import {useEffect, useState} from "react";
import {CartItem} from "../models/CartItem";

function Cart() {

    const [cartItems, setCartItems] = useState(([] as CartItem[]));
    const [cartHTML, setCartHTML] = useState([<a key={0}></a>])

    useEffect(() => {
        setCartItems(CartService.getCartItems());
    }, []);

    useEffect(() => {
        const populateCartItemList = () => {
            console.log("rerender");
            let html: JSX.Element[] = [];
            for (let i in cartItems) {
                html[i] =
                    <a key={cartItems[i].ID}>{CartService.stringify(cartItems[i])}</a>;
            }
            return html;
        }
        setCartHTML(populateCartItemList());
    }, [cartItems])

    return (
        <div className="dropdown">
            <button key={"a0"} onMouseEnter={ () => setCartItems(CartService.getCartItems()) } className="dropbtn">Cart</button>
            <div key={"a1"} className="dropdown-content">
                {cartHTML}
            </div>
        </div>
    );
}

export default Cart;
