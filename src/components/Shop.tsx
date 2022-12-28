import "./Shop.css";

import {useEffect, useState} from "react";
import {Database} from '../lib/ajax';
import * as utils from "../lib/utils";
//The honey and items shop code is too similar it can be put into one file


function createHTML(item: utils.Product, position: number) {
    
    let inlineStyles = { //purely used for positioning the element
        transform: `translate(${position%2==0 ? "-110%" : "10%"}%, ${position%2 * 110}%)`,
    }
    
    return (
        <table className="table" style={inlineStyles}> 
            <tbody>
                <tr className="itemTitleRow">
                    <td className="itemImage"> <img src={item.imageURL} className="itemImage"/> </td>
                    <td> <label className="itemNameLabel">{item.name}</label> <br/> <label className="itemDescriptionLabel">{item.description}</label></td>
                </tr>

                <tr>
                    <td> <label>Price</label> <br/><br/><br/> </td> 
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
                        <button className="buyButton"> Add to Cart</button>
                    </td>
                </tr>

            </tbody>
        </table>
    );
}

function createAllHTML(location: string) {
    let productsOnPage: utils.Product[] = utils.getProductsByLocation(location);
    let allHTML = "";

    productsOnPage.forEach((element) => {
        allHTML += createHTML(element, 0);
    })

    return allHTML;
}

export function Honey() {

    const [content, setContent] = useState("");

    
    
    return (createHTML(utils.productList[1], 0));
}


export function Items() {
    
    const [content, setContent] = useState();


    return (
        <div>
            <h1>Items</h1>
        </div>
    )
}