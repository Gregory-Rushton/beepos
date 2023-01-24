import { useEffect, useState } from "react";

import { simpleHeader } from "./Checkout"
import { ProductService, CartService } from "../lib/utils";
import { Orders } from "../lib/ajax";

import { Product } from "../models/Product";
import { Relation } from "../models/Relation";
import { CartItem } from "../models/CartItem";
import { PlacedOrder } from "../models/PlacedOrder";
import { PurchasedItem } from "../models/PurchasedItem";


const CreateCartItem = (element: CartItem, priceAtPurchase: number) => {
    
    let product: Product = ProductService.getProduct(element.ID);
    let subproduct: Product = ProductService.getProduct(element.subProductID);
    let relation: Relation = ProductService.getRelation(element.ID, element.subProductID);
    let amount: number = element.amount;

    return (<tr key={`${element.ID}|${element.subProductID}`} className="checkout-item">
        <td>
            {subproduct.name} {product.name}
        </td>
        <td>
            ${priceAtPurchase.toFixed(2)}
        </td>
        <td>
            <label>{element.amount}</label>
        </td>
        <td>
            (${(amount * priceAtPurchase).toFixed(2)})
        </td>
    </tr>);
}


function CheckoutMenu() {

    const [cartItemHTML, setCartItemHTML] = useState<JSX.Element[]>();

    const queryParameters = new URLSearchParams(window.location.search);
    const orderID = queryParameters.get("orderID");
    const viewKey = queryParameters.get("viewKey");

    useEffect(() => {
        const setOrders = async() => {

            interface resObj {order: Object};

            let res: JSON = await Orders.getByKey(orderID, viewKey);
            let obj = res["response" as keyof JSON];
            let order = (obj as unknown as resObj).order as PlacedOrder;

            // let cart = order.
            let cartItems: JSX.Element[] = [];
            // cart.forEach((element, i) => {
            //     cartItems.push(CreateCartItem(element, ProductService.getRelation(element.ID, element.subProductID).price));
            // })
            
            // let subtotal: number = CartService.getTotals(cart).cost as unknown as number;
            // let tax: number = (subtotal * (process.env.REACT_APP_TAX as any)) as number;
        
            // cartItems.push(<tr key="a"> <td> Subtotal: </td><td/><td/><td> ${subtotal.toFixed(2)} </td>  </tr>);
            // cartItems.push(<tr key="b"> <td> Tax:      </td><td/><td/><td> + ${tax.toFixed(2)}    </td>  </tr>);
            // cartItems.push(<tr key="c"> <td> Total:    </td><td/><td/><td> ${(subtotal + tax).toFixed(2)}    </td>  </tr>);
            setCartItemHTML(cartItems);
        }
        setOrders();
    }, []);


    return (
        <div className="checkout-container">
            <br />
            <h2>Cart</h2>
            <br/>
            <br/>

            <div className="checkout-items">
                <table>
                    <tbody>
                        {cartItemHTML}
                    </tbody>
                </table>
                Payment will be exchanged when the items are delivered 
                <br /><br />
            </div>
        </div>
    )
}


function ViewOrder() {

    const [productHTML, setProductHTML] = useState<JSX.Element>();

    useEffect(() => {
        const init = async() => {
            await ProductService.setProductList();
            setProductHTML(<CheckoutMenu />);
        }
        init();
    }, []);

    return (
        <div>
            {simpleHeader(`Order: `)}
            <br /><br />
            <div className="leftside-position">
                {productHTML}
            </div>
            <div className="rightside-position">
            </div>
        </div>
    );
}

export default ViewOrder;