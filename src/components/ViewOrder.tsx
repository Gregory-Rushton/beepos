import { useEffect, useState } from "react";

import { simpleHeader } from "./Checkout"
import { ProductService, CartService } from "../lib/utils";
import { Orders } from "../lib/ajax";

import { PlacedOrder } from "../models/PlacedOrder";
import { PurchasedItem } from "../models/PurchasedItem";


const CreateCartItem = (element: PurchasedItem) => {
    

    let amount: number = element.amount;

    return (<tr key={`${element.ID}|${element.subProductID}`} className="checkout-item">
        <td>
            {element.subProductName} {element.productName}
        </td>
        <td>
            (${element.price.toFixed(2)})
        </td>
        <td>
            x{element.amount}
        </td>
        <td>
            ${(amount * element.price).toFixed(2)}
        </td>
    </tr>);
}


function CheckoutMenu(order: PlacedOrder, cart: PurchasedItem[]) {

    let cartItems: JSX.Element[] = [];
    cart.forEach((element, i) => {
        cartItems.push(CreateCartItem(element));
    })
     
    let subtotal: number = CartService.getTotals(cart).cost as unknown as number;
    let tax: number = (subtotal * (parseFloat(order.tax) as any)) as number;

    cartItems.push(<tr key="a"> <td> Subtotal: </td><td/><td/><td> ${subtotal.toFixed(2)} </td>  </tr>);
    cartItems.push(<tr key="b"> <td> Tax:      </td><td/><td/><td> + ${tax.toFixed(2)}    </td>  </tr>);
    cartItems.push(<tr key="c"> <td> Total:    </td><td/><td/><td> ${(subtotal + tax).toFixed(2)}    </td>  </tr>);

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


function FinalizeMenu(order: PlacedOrder) {


    return (
        <div className="finalize-container">

            <br />
            <h2>Contact Information</h2>
            <br /><br />

            <table>
                <tbody>
                    <tr>
                        <td> <label>Name</label> </td>
                        <td> <label>{order.name}</label> </td>
                    </tr>
                    <tr>
                        <td> <label>Email</label> </td>
                        <td> <label>{order.email}</label> </td>
                    </tr>
                    <tr>
                        <td> <label>Phone</label> </td>
                        <td> <label>{order.phoneNumber}</label> </td>
                    </tr>
                    <tr>
                        <td> <label>Address</label> </td>
                        <td> <label>{order.address}</label> </td>
                    </tr>
                    <tr>
                        <td />
                        <td> <label><b>Order Information</b></label> </td>
                    </tr>
                    <tr>
                        <td> <label>Complete</label> </td>
                        <td> <label>{order.isComplete ? "Complete" : "Incomplete"}</label> </td>
                    </tr>
                    <tr>
                        <td> <label>Date Placed</label> </td>
                        <td> <label>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(order.date)}</label> </td>
                    </tr>


                </tbody>
            </table>
            <br />
            <br />

        </div>
    );
}


function ViewOrder() {

    const [productHTML, setProductHTML] = useState<JSX.Element>();
    const [finalizeHTML, setFinalizeHTML] = useState<JSX.Element>();
    const [header, setHeader] = useState<JSX.Element>();

    const queryParameters = new URLSearchParams(window.location.search);
    const orderID = queryParameters.get("orderID");
    const viewKey = queryParameters.get("viewKey");


    useEffect(() => {
        const init = async() => {
            await ProductService.setProductList();
            let res: JSON = await Orders.getByKey(orderID, viewKey);
            
            interface resObj {order: Object};
            let obj = res["response" as keyof JSON];
            let order = (obj as unknown as resObj).order as PlacedOrder;
            let purchases: PurchasedItem[] = order.purchases as PurchasedItem[];

            setProductHTML(CheckoutMenu(order, purchases));
            setHeader(simpleHeader(`Order #${orderID}`));
            setFinalizeHTML(FinalizeMenu(order));
        }
        init();
    }, []);

    return (
        <div>
            {header}
            <br /><br />
            <div className="leftside-position">
                {productHTML}
            </div>
            <div className="rightside-position">
                {finalizeHTML}
            </div>
        </div>
    );
}

export default ViewOrder;