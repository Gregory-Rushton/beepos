import {useEffect, useState} from "react";
import {Database} from '../lib/ajax';
import * as utils from "../lib/utils";
//The honey and items shop code is too similar it can be put into one file


async function createHTML(location: string) {
    console.log(utils.getProductsByLocation(location));
}

export function Honey() {

    const [content, setContent] = useState("");

    createHTML("honey");


    useEffect(() => {
        const init = async () => {

        };
        init();
    });
    
    return (
        <div>
            <h1>Honey</h1>
        </div>
    );
}


export function Items() {

    createHTML("items");

    return (
        <div>
            <h1>Items</h1>
        </div>
    )
}