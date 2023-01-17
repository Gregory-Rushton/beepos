import {Auth, Database} from "./ajax.js";
import {User} from "../models/User";
import {Relation} from "../models/Relation";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import productsJson from "../resources/products.json";

export let user: User;
export let productList: Product[] = [];


export async function setUser() {
    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {}
    user = (response["response"] as User);
}

export const ProductService = {

    setProductList: () => {
        productsJson.map((p, idx) => productList[idx] = p as Object as Product);
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
            items = []; //reset it if error
        }
        return items;
    },

    saveCart: (cart: CartItem[]) => {
        let cartString: Object[] = [];
        for(let i in cart) {
            cartString[i] = {"ID": cart[i].ID, "subProductID": cart[i].subProductID, "amount": cart[i].amount};
        }
        localStorage.setItem("cart", `{"Items": ${JSON.stringify(cartString)}}`)
    },

    addToCart: (cart: CartItem[], ID: string, subProductID: string, amount: number) => {
        for(let item in cart) {
            if(cart[item].ID === ID && cart[item].subProductID === subProductID) {
                cart[item].amount += amount;
                return cart;
            }
        }
        cart.push({"ID": ID, "subProductID": subProductID, "amount": amount} as CartItem);

        return cart;
    },

    setItemAmount: (cart: CartItem[], ID: string, subProductID: string, newAmount: number) => {
        for(let item in cart) {
            if(cart[item].ID === ID && cart[item].subProductID === subProductID) {
                cart[item].amount = newAmount;
                return cart;
            }
        }

        return cart;
    },

    cartAsDropdown: (cart: CartItem[]) => {
        let html: JSX.Element[] = [];
        for(let i in cart) {
            html[i] = <a>{CartService.stringify(cart[i])}</a>;
        }
        return html;
    },

    stringify: (item: CartItem) => {
        productList = ProductService.setProductList();
        let product: Product = ProductService.getProduct(item.ID);
        let subProduct: Product = ProductService.getProduct(item.subProductID);
        let relation: Relation = ProductService.getRelation(item.ID, item.subProductID);

        return `$${item.amount}x ${subProduct.name === "" ? "" : `${subProduct.name} of`} ${product.name} ($${relation.price * item.amount})`
    }
}

export function createRelation(relation: Object) {
    return ((relation as Relation));
}