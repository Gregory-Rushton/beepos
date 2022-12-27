import internal from "stream";
import { Auth, Database } from "./ajax.js";
interface Product {
    name: string,
    description: string,
    location: string,
    imageURL: string,
    stock: number,
    relations: Object
}

interface User {
    ID: string,
    authID: string,
    authType: string,
    name: string,
    pfpURL: string,
    email: string,
    permissions: string
}

export let user: User;
export let productList: Product[] = [];


export async function setUser() {
    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {}
    user = <User>(response["response"]);
}

export async function setProductList() {
    let productListArray: Object[] = (await Database.getProducts())["response"]["products"];
    for(let element in productListArray) {
        productList[element] = ( <Product>( productListArray[element] ) );
    }
}

export function getProductsByLocation(location: string) {
    let products: Product[] = [];
    productList.forEach(element => {
        if(element.location == location) {
            products.push(element);
        }
    });
    return products;
}



