import {Auth, Database} from "./ajax.js";
import {User} from "../models/User";
import {Relation} from "../models/Relation";
import {Product} from "../models/Product";

export let user: User;
export let productList: Product[] = [];

export async function setUser() {
    let response = {"response": {}}
    try {
        response = await Auth.getUser();
    } catch {
    }
    user = (response["response"] as User);
}

export const ProductService = {

    setProductList: async () => {
        let productListArray: Object[] = (await Database.getProducts())["response"]["products"];

        for (let element in productListArray) {
            productList[element] = (productListArray[element] as Product);
        }

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
    }
}

export function createRelation(relation: Object) {
    return ((relation as Relation));
}