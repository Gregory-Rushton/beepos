import internal from "stream";
import {Database} from "./ajax.js";

interface Product {
    name: string,
    description: string,
    location: string,
    imageURL: string,
    stock: number,
    relations: JSON
}

interface ProductList {
    products: Product[]
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
export let productList: ProductList;


