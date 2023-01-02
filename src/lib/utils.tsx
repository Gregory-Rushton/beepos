import {Auth, Database} from "./ajax.js";
import {User} from "../models/User";
import {Relation} from "../models/Relation";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import productsJson from "../resources/products.json";

export let user: User;
export let productList: Product[] = [];
export let cart: CartItem[] = [];

export async function setUser() {
    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {
    }
    user = (response["response"] as User);
}

export const ProductService = {

    setProductList: () => {
        productsJson.map((p, idx) => productList[idx] = JSON.parse(JSON.stringify(p)));
        return productList;
    },

    getProductsByLocation: (location: string) => {
        let products: Product[] = [];
        productList.forEach(element => {
            if (element.location === location) {
                products.push(element);
            }
        });
        return products;
    },

    getProduct: (id: string) => {
        for (let element in productList) {
            if (productList[element].id === id) {
                return productList[element];
            }
        }
        return ({} as Product);
    },

    getRelation: (id: string, subProductID: string) => {
        let product = ProductService.getProduct(id);
        return product.relations[subProductID as keyof typeof product.relations] as Object as Relation;
    },


    createProductString: (productString: string, cartItem: CartItem) => {
        let product: Product = ProductService.getProduct(cartItem.ID);
        let subProduct: Product = ProductService.getProduct(cartItem.subProductID);
        let relation: Relation = ProductService.getRelation(cartItem.ID, cartItem.subProductID);
        productString = productString.replace("{product}", product.name);
        productString = productString.replace("{subProduct}", subProduct.name);
        productString = productString.replace("{subProduct_of}", subProduct.name == "" ? "" : `${subProduct.name} of`);
        productString = productString.replace("{price}", relation.price.toString());
        productString = productString.replace("{description}", product.description);
        productString = productString.replace("{amount}", cartItem.amount.toString());
        productString = productString.replace("{fullPrice}", (relation.price*cartItem.amount).toFixed(2).toString())
        return productString;
    }

}

export const CartService = {
    getCartItems: () => {
        let items: CartItem[] = []
        let cartString: string | null = localStorage.getItem("cart");
        try {
            if(cartString === null) {
                throw console.error();
            }
            let cartObject: JSON[] = JSON.parse(cartString)['Items'];
            for(let i in cartObject) {
                items[i] =  (cartObject[i] as Object) as CartItem;
            }
        } catch (error) {
            console.log("Errored loading cart, creating a new one");
            localStorage.setItem("cart", '{"Items": []}');
        }
        return items;
    },

    addToCart: (ID: string, subProductID: string, amount: number) => {

        for(let item in cart) {
            if(cart[item].ID === ID && cart[item].subProductID === subProductID) {
                cart[item].amount += amount;
                return;
            }
        }

        cart.push({"ID": ID, "subProductID": subProductID, "amount": amount} as CartItem);
    },

    saveCart: () => {
        let cartString: Object[] = [];
        for(let i in cart) {
            cartString[i] = {"ID": cart[i].ID, "subProductID": cart[i].subProductID, "amount": cart[i].amount};
        }
        localStorage.setItem("cart", `{"Items": ${JSON.stringify(cartString)}}`)
    },

    cartAsDropdown: () => {
        let html: JSX.Element[] = [];
        for(let i in cart) {
            html[i] = <a>{ProductService.createProductString("{amount}x {subProduct_of} {product} (${fullPrice})", cart[i])}</a>;
        }
        return html;
    }
}

export function createRelation(relation: Object) {
    return ((relation as Relation));
}