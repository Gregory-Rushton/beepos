import "./Shop.css";

import {useEffect, useState} from "react";
import * as utils from "../lib/utils";
import {Product} from "../models/Product";
import {Relation} from "../models/Relation";
import {ProductService, CartService} from "../lib/utils";

//The honey and items shop code is too similar it can be put into one file


function CreateHTML(item: Product, position: number) {

    const [price, setPrice] = useState(0.0);
    const [imageURL, setImageURL] = useState(item.imageURL);
    const [quantity, setQuantity] = useState(0);
    const [selectedSubProduct, setSelectedSubProduct] = useState("");

    const handleCountChange = (event: any) => {
        setQuantity(event.target.value);
    }

    const updateItemInfo = (value: any) => {
        setSelectedSubProduct(value.target.value);
        let related: keyof typeof item.relations = value.target.value;
        let relation: Relation = utils.createRelation(item.relations[related]);
        setPrice(relation.price);
        setImageURL(relation.imageURL);
    }

    const addToCart = () => {
        CartService.addToCart(item.id, selectedSubProduct, Math.max(quantity, 1));
        CartService.saveCart();
    }


    let dropdownHTML: JSX.Element[] = [];

    // let relation: keyof typeof item.relations; //Typescript moment, needed to iterate over a json object
    for (let relation in item.relations) {
        dropdownHTML.push(<option key={relation} value={relation}> {ProductService.getProduct(relation).name} </option>);
    }

    let subProductHTML: JSX.Element = (
        <form>
            Size: &nbsp;
            <select onChange={value => updateItemInfo(value)}>
                {dropdownHTML}
            </select>
        </form>
    );

    let inlineStyles = { //purely used for positioning the element. I use absolute positioning because its easier.
        transform: `translate(${position % 2 === 0 ? "-110" : "10"}%, ${Math.floor(position / 2) * 110 + 10}%)`,
    }

    
    useEffect(() => {
        let firstRelation: keyof typeof item.relations = dropdownHTML[0].props.value;
        let relation: Relation = utils.createRelation(item.relations[firstRelation]);
        setPrice(relation.price);
        setSelectedSubProduct(firstRelation.toString());
    }, [dropdownHTML, item]);

    return (
        <table className="table" style={inlineStyles} key={item.id}>
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
                    {dropdownHTML.length === 1 ? null : subProductHTML}
                </td>

                <td style={{textAlign: 'right'}}>
                    <input onChange={event => handleCountChange(event)} type="number" className="quantityBox"/> Quantity
                </td>
            </tr>

            <tr style={{textAlign: 'right'}}>
                <td></td>
                <td>
                    <button onClick={(element) => {
                        addToCart();
                    }} className="buyButton"> Add to Cart
                    </button>
                </td>
            </tr>

            </tbody>
        </table>
    );
}

function CreateAllHTML(location: string) {
    let productsOnPage: Product[] = ProductService.getProductsByLocation(location);

    let allHTML: JSX.Element[] = [];

    for (let element in productsOnPage) {
        allHTML.push(CreateHTML(productsOnPage[element], parseInt(element)));
    }
    return (
        <div>
            {allHTML}
        </div>
    );
}

export function Honey() {
    return (CreateAllHTML("honey"));
}


export function Items() {
    return (CreateAllHTML("items"))
}