import './Header.css';

import React, {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {GoogleLogin} from "@react-oauth/google";
import { ToastsStore } from 'react-toasts';
import Cookies from 'universal-cookie';
import {isMobile} from 'react-device-detect';

import {ProductService, CartService} from "../lib/utils";
import {Credential} from '../models/Credential';
import {Product} from "../models/Product";

import Home from './Home';
import {Honey, Items} from './Shop';
import Cart from "./Cart";

function Header() {

    const [tabIndex, setTabIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>();

    const loadTab = (index: number) => {
        setTabIndex(index);
    }

    const googleSignIn = () => {
        return <div style={{position: 'absolute', top: '10px', left: '10px'}}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const cookies = new Cookies();
                    cookies.set("auth", (credentialResponse as Credential).credential, { path: '/' , sameSite: false, domain: process.env.REACT_APP_COOKIE_DOMAIN});
					ToastsStore.success("Logged In");
				}}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                auto_select
            />
        </div>
    }

    useEffect(() => {
        document.title = "Bee Positive Apiary";
        const init = async () => {
            setProducts(await ProductService.setProductList());
			let cart = CartService.getCartItems();
			cart = CartService.filterItemsWithNoQuantity(cart);
			CartService.saveCart(cart);
        }
        init();
    }, []);

    return (
        <div>
            <div className='header' style={{top: isMobile ? "50px" : ""}}>
                <h1>Bee Positive Apiary</h1>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => loadTab(index)}>
                    <TabList>
                        <Tab>Home</Tab>
                        <Tab>Honey</Tab>
                        <Tab>Products from the Hive</Tab>
                        <Tab>About Us</Tab>
                    </TabList>


                    <TabPanel><Home/></TabPanel>
                    <TabPanel><Honey/></TabPanel>
                    <TabPanel><Items/></TabPanel>
                    <TabPanel></TabPanel>
                </Tabs>
            </div>

            <Cart/>

            {googleSignIn()}
        </div>
    );

}

export default Header;
