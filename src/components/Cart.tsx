import {CartService, ProductService} from "../lib/utils";
import {useEffect, useState} from "react";
import {CartItem} from "../models/CartItem";

function Cart() {

    const [cartItems, setCartItems] = useState(([] as CartItem[]));

    useEffect(() => {
        setCartItems(CartService.getCartItems());
    }, []);

    const populateCartItemList = () => {
        let html: JSX.Element[] = [];
        for (let i in cartItems) {
            html[i] =
                <a>{CartService.stringify(cartItems[i])}</a>;
        }
        return html;
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">Cart</button>
            <div className="dropdown-content">
                {populateCartItemList()}
            </div>
        </div>
    );
}

export default Cart;
