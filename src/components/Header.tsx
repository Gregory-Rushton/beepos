import './Header.css';
import React, {useEffect, useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import Home from './Home';
import {Honey, Items} from './Shop';
import Cart from "./Cart";
import {Checkout, Finalize} from './Checkout';

import * as utils from "../lib/utils";
import {ProductService, CartService} from "../lib/utils";
import {Credential} from '../models/Credential';
import {Product} from "../models/Product";

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
                    const credential = jwtDecode<Credential>((credentialResponse as Credential).credential);
                    console.log(credential);
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
        const init = async () => {
            await utils.setUser();
            setProducts(await ProductService.setProductList());
        }
        init();
    }, []);

    return (
        <div>
            <div className='header'>
                <h1>Bee Positive Apiary</h1>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => loadTab(index)}>
                    <TabList>
                        <Tab>Home</Tab>
                        <Tab>Honey</Tab>
                        <Tab>Products from the Hive</Tab>
                        <Tab>About Us</Tab>
                    </TabList>

                    <div id="root">
                        <TabPanel><Home/></TabPanel>
                        <TabPanel><Honey/></TabPanel>
                        <TabPanel><Items/></TabPanel>
                        <TabPanel></TabPanel>
                    </div>
                </Tabs>
            </div>

            <Cart/>

            {googleSignIn()}
        </div>
    );

}

export default Header;
