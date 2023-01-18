import {Database} from "./ajax.js";
import {Relation} from "../models/Relation";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import productsJson from "../resources/products.json";

export let productList: Product[] = [];


export const ProductService = {

    setProductList: async () => {
        // let response: JSON = ((await Database.getProducts()) as unknown as JSON)["response" as keyof JSON] as unknown as JSON;
        // let productsJson: JSON[] = response["products" as keyof JSON] as unknown as JSON[];
        
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
        return ({"relations": {}} as Product);
    },

    getRelation: (id: string, subProductID: string) => {
        let product = ProductService.getProduct(id);
        if(product.relations[subProductID as keyof typeof product.relations] as Object as Relation == undefined) {
            return {"price": 0.00, "imageURL": "about:blank"} as Object as Relation;
        }
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

    cartAsDropdown: async (cart: CartItem[]) => {
        let html: JSX.Element[] = [];
        for(let i in cart) {
            html[i] = <a>{await CartService.stringify(cart[i])}</a>;
        }
        return html;
    },

    getTotals: (cart: CartItem[]) => {
        let totalCost: number = 0.0;
        let totalItems: number = 0;

        cart.forEach((element, i) => {
            totalItems += element.amount;
            let relation = ProductService.getRelation(element.ID, element.subProductID);
            totalCost += relation.price * element.amount;
        })

        return {"items": totalItems, "cost": totalCost};
    },

    stringify: async (item: CartItem) => {
        productList = await ProductService.setProductList();
        let product: Product = ProductService.getProduct(item.ID);
        let subProduct: Product = ProductService.getProduct(item.subProductID);
        let relation: Relation = ProductService.getRelation(item.ID, item.subProductID);

        return `$${item.amount}x ${subProduct.name === "" ? "" : `${subProduct.name} of`} ${product.name} ($${relation.price * item.amount})`
    }
}

export function createRelation(relation: Object) {
    return ((relation as Relation));
}