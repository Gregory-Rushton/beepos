import {CartService, ProductService} from "../lib/utils";
import * as utils from "../lib/utils";
import {useEffect, useState} from "react";
import {CartItem} from "../models/CartItem";
import {isMobile} from "react-device-detect";

function Cart() {

    const [cartHTML, setCartHTML] = useState([<a key={0}></a>])

    const populateCartItemList = async(cart: CartItem[]) => {
		let html: JSX.Element[] = [];
        for (let i in cart) {
            html[i] =
                <a key={`${cart[i].ID}|${cart[i].subProductID}`}>{await CartService.stringify(cart[i])}</a>;
        }
        html.push(<a key="checkout" href="/checkout">Checkout</a>);
        return html;
    }

    return (
        <div className="dropdown" style={{right: isMobile ? "20px" : "20%"}}>
            <button key={"a0"} onMouseEnter={ async() => setCartHTML(await populateCartItemList(CartService.getCartItems())) } className="dropbtn">Cart</button>
            <div key={"a1"} className="dropdown-content">
                {cartHTML}
            </div>
        </div>
    );
}

export default Cart;
