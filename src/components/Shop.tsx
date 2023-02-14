import "./Shop.css";
import "../App.css";

import {useEffect, useState} from "react";
import {ToastsStore} from 'react-toasts'

import * as utils from "../lib/utils";
import {Product} from "../models/Product";
import {Relation} from "../models/Relation";
import {CartItem} from "../models/CartItem";
import {ProductService, CartService} from "../lib/utils";


//The honey and items shop code is too similar it can be put into one file


function ProductElement({item, position}: {item: Product, position: number}) {

    const [price, setPrice] = useState(0.0);
    const [imageURL, setImageURL] = useState(`${process.env.REACT_APP_CDN_URL}/products/${item.id[0]}00/${item.id.slice(1)}.png`);
    const [quantity, setQuantity] = useState(1);
    const [selectedSubProduct, setSelectedSubProduct] = useState("");
	const [stockNotifier, setStockNotifier] = useState(<a></a>);

    const handleCountChange = (event: any) => {
        setQuantity(event.target.value);
    }

    const updateSubProduct = (subProductID: string) => {
        setSelectedSubProduct(subProductID);

        let related: keyof typeof item.relations = subProductID as keyof typeof item.relations;
        let relation: Relation = utils.createRelation(item.relations[related]);

        setPrice(relation.price);
        setImageURL(`${process.env.REACT_APP_CDN_URL}/relations/${item.id}/${subProductID}.png`);
    }

	let dropdownHTML: JSX.Element[] = [];
	for (let relation in item.relations) {
		dropdownHTML.push(<option key={relation} value={relation}> {ProductService.getProduct(relation).name} </option>);
	}

    const addToCart = () => {
		if(dropdownHTML.length === 0) {
			ToastsStore.error("This product's price is not set by the site administrator");
			return;
		}

		if(item.stock != null && item.stock-quantity < 0) {
			ToastsStore.error("Not enough stock left");
			return;
		}

        let cart: CartItem[] = CartService.addToCart(CartService.getCartItems(), item.id, selectedSubProduct, quantity) as CartItem[];
        CartService.saveCart(cart);
        ToastsStore.info(`Added ${item.name} to Cart`);
    }


    let subProductHTML: JSX.Element = (
        <form>
            Size: &nbsp;
            <select onChange={event => updateSubProduct(event.target.value)}>
                {dropdownHTML}
            </select>
        </form>
    );

    useEffect(() => {
		try {
			let firstRelation: keyof typeof item.relations = dropdownHTML[0].props.value;
			let relation: Relation = utils.createRelation(item.relations[firstRelation]);
			setPrice(relation.price);
			setSelectedSubProduct(firstRelation.toString());
		} catch {
			setPrice(0);
			setSelectedSubProduct("0");
		}
		if(item.stock <= 5 && item.stock > 0 && item.stock != null) {
			setStockNotifier(<label>Only {item.stock} Left!</label>);
		} else if (item.stock == 0) {
			setStockNotifier(<label>Item is out of stock</label>)
		}
    }, []);


    return (
        <table className="itemTable" key={position}>
            <tbody>
            <tr className="itemTitleRow">
                <td className="itemImage"><img src={imageURL} className="itemImage" alt={item.name}/></td>
                <td><label className="itemNameLabel">{item.name}</label> <br/> <label
                    className="itemDescriptionLabel">{item.description}</label></td>
            </tr>

            <tr>
                <td style={{verticalAlign: "top"}}><label>${price.toFixed(2)}</label></td>
            </tr>

            <tr style={{verticalAlign: "bottom"}}>
                <td>
                    {dropdownHTML.length <= 1 ? null : subProductHTML}
                </td>

                <td style={{textAlign: 'right'}}>
                    <input onChange={event => handleCountChange(event)} defaultValue={1 as number} min={1} type="number" className="quantityBox"/> Quantity
                </td>
            </tr>

            <tr style={{textAlign: 'right'}}>
                <td style={{textAlign: "left"}}>
					{stockNotifier}
				</td>
                <td>
                    <button onClick={(element) => {
                        addToCart();
                    }}> Add to Cart
                    </button>
                </td>
            </tr>

            </tbody>
        </table>
    );
}

function CreateAllHTML(location: string) {
    let productsOnPage: Product[] = ProductService.getProductsByLocation(location);

	productsOnPage.sort((a, b) => {
		if(a.position == b.position) {
			return ( a.id < b.id ? -1 : 1 );
		} else {
			return ( a.position < b.position ? -1 : 1 );
		}
	});

    let allHTML: JSX.Element[] = [];

	for(let i=0; i<productsOnPage.length; i += 2) {

		let secondElement;
		if(i+1 < productsOnPage.length) {
			secondElement = <ProductElement key={i+1} item={productsOnPage[i+1]} position={i+1} />;
		}
		allHTML.push(
		<tr className="displayTable tr">
			<td className="displayTable td">
				<ProductElement key={i} item={productsOnPage[i]} position={i} />
			</td>
			<td className="displayTable td">
				{secondElement}
			</td>
		</tr>);

	}

    return (
		<div>

		<table className="displayTable">
			<tbody>
				{allHTML}
			</tbody>
		</table>

		</div>
    );
}

export function Honey() {
    return (CreateAllHTML("honey"));
}


export function Items() {
    return (CreateAllHTML("items"))
}