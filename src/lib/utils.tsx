import internal from "stream";
import { createObjectBindingPattern } from "typescript";
import { Auth, Database } from "./ajax.js";

//For products, relations, and the logged in user. Mostly static
export interface Product {
    id: string,
    name: string,
    description: string,
    location: string,
    imageURL: string,
    stock: number,
    relations: JSON
}

export interface Relation {
    price: number;
    imageURL: string;
}

export interface User {
    ID: string,
    authID: string,
    authType: string,
    name: string,
    pfpURL: string,
    email: string,
    permissions: string
}

//for the shopping cart info
export interface CartItem {
    ID: string,
    subProductID: string,
    amount: number
}



export let user: User;
export let productList: Product[] = [];
export let cart: CartItem[] = [];

export async function setUser() {
    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {}
    user = (response["response"]) as User;
}

export async function setProductList() {
    let productListArray: Object[] = (await Database.getProducts())["response"]["products"];
    
    for(let element in productListArray) {
        productList[element] = productListArray[element] as Product;
    }

}

export function getProduct(id: string) {
    for(let element in productList) {
        if(productList[element].id == id) {
            return productList[element];
        }
    }
    return {} as Product;
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

export function createRelation(relation: Object) {
    return relation as Relation;
}

export function loadCart() {
    
    let cartString: string | null = localStorage.getItem("cart");
    try {
        if(cartString == null) {
            throw console.error();
        }
        let cartObject: JSON[] = JSON.parse(cartString)['Items'];
        
        for(let i in cartObject) {
            cart[i] =  (cartObject[i] as Object) as CartItem;
        }

        console.log(cart);

    } catch (error) {
        console.log("Errored loading cart, creating a new one");
        console.log(error);
        localStorage.setItem("cart", '{"Items": []}');
        window.location.reload();
    }
}

export function addToCart(ID: string, subProductID: string, amount: number) {

    for(let item in cart) {
        if(cart[item].ID == ID && cart[item].subProductID == subProductID) {
            cart[item].amount += amount;
            return;
        }
    }

    cart.push({"ID": ID, "subProductID": subProductID, "amount": amount} as CartItem);
}


export function saveCart() {
    let cartString: Object[] = [];
    for(let i in cart) {
        cartString[i] = {"ID": cart[i].ID, "subProductID": cart[i].subProductID, "amount": cart[i].amount};
    }
    localStorage.setItem("cart", `{"Items": ${JSON.stringify(cartString)}}`)
}

export function cartAsDropdown() {
    let html: JSX.Element[] = [];
    for(let i in cart) {
        html[i] = <table></table>;
    }
}