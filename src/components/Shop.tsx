import {useEffect, useState} from "react";
import {Database} from '../lib/ajax';
import * as utils from "../lib/utils";
//The honey and items shop code is too similar it can be put into one file


function createHTML(item: utils.Product, side: string) {
    
    side = side == "left" ? ".tableLeft" : ".tableRight";
    
    return (
        <div>
            Hello There!
        </div>
    );
}

function createAllHTML(location: string) {
    let productsOnPage: utils.Product[] = utils.getProductsByLocation(location);
    let allHTML = "";
    productsOnPage.forEach((element) => {
        allHTML += createHTML(element, "left");
    })

    return allHTML;
}

export function Honey() {

    const [content, setContent] = useState("");


    
    
    return (
        <div>
            <h1>Honey</h1>
        </div>
    );
}


export function Items() {
    
    const [content, setContent] = useState();


    return (
        <div>
            <h1>Items</h1>
        </div>
    )
}