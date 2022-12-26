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

export async function setUser() {

    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {}
    user = <User>(response["response"]);
}

export function setProductList(productListJson: Object) {
    productList = productListJson;
}

export let user: User;
export let productList: Object;// = {1: 1};


