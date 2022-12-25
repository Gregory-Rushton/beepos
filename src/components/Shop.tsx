import {useEffect, useState} from "react";
import {Database} from '../lib/ajax';

//The honey and items shop code is too similar it can be put into one file


async function createHTML(location: string) {
    console.log(await Database.getProducts(location));
}

export function Honey() {

    const [content, setContent] = useState("");

    useEffect(() => {
        const init = async () => {
            const response = await Database.getProducts("null");//createHTML("honey");
            setContent(JSON.stringify(response));
            console.log(content);
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

    return (
        <div>
            <h1>Items</h1>
        </div>
    )
}