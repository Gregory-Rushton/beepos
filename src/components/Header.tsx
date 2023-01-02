import './Header.css';
import React, {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import * as utils from "../lib/utils";
import {ProductService} from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import {Credential} from '../models/Credential';
import Cart from "./Cart";
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
                auto_select
            />
        </div>
    }

    useEffect(() => {
        const init = async () => {
            await utils.setUser();
            const products = await ProductService.setProductList();
            setProducts(products);
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
