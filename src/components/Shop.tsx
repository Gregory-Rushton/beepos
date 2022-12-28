import "./Shop.css";

import {useEffect, useState} from "react";
import {Database} from '../lib/ajax';
import * as utils from "../lib/utils";
//The honey and items shop code is too similar it can be put into one file


function CreateHTML(item: utils.Product, position: number) {

    const [price, setPrice] = useState(0.0);
    const [imageURL, setImageURL] = useState("");
    
    const updateItemInfo = (item: utils.Product) => {
    }

    let inlineStyles = { //purely used for positioning the element. I use absolute positioning because its easier.
        transform: `translate(${position%2==0 ? "-110" : "10"}%, ${Math.floor(position/2) * 110 + 10}%)`,
    }

    
    return (
        <table className="table" style={inlineStyles}> 
            <tbody>
                <tr className="itemTitleRow">
                    <td className="itemImage"> <img src={item.imageURL} className="itemImage"/> </td>
                    <td> <label className="itemNameLabel">{item.name}</label> <br/> <label className="itemDescriptionLabel">{item.description}</label></td>
                </tr>

                <tr>
                    <td style={{verticalAlign: "top"}}> <label>{price}</label>  </td> 
                </tr>

                <tr style={{verticalAlign: "bottom"}}>
                    <td>
                        Subproduct HTML
                    </td>

                    <td style={{textAlign: 'right'}}>
                        <input className="quantityBox"/> Quantity
                    </td>
                </tr>

                <tr style={{textAlign: 'right'}}>
                    <td></td>
                    <td>
                        <button onClick={() => (console.log("pressed buy"))} className="buyButton"> Add to Cart</button>
                    </td>
                </tr>

            </tbody>
        </table>
    );
}

function CreateAllHTML(location: string) {
    let productsOnPage: utils.Product[] = utils.getProductsByLocation(location);
    
    let allHTML: JSX.Element[] = [];

    for(let element in productsOnPage) {
        allHTML.push(CreateHTML(productsOnPage[element], parseInt(element)));
    }
    return (
        <div>
            {allHTML}
        </div>
    );
}

export function Honey() {
    return (CreateAllHTML("honey"));
}


export function Items() {
    return (CreateAllHTML("items"))
}