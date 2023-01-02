import './Header.css';
import {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import * as utils from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import {Credential} from '../models/Credential';

function Header() {

    const [tabIndex, setTabIndex] = useState(0);
    const [dropdownHTML, setDropdownHTML] = useState([<a></a>]);
    
    document.title = "Bee Positive Apiary"

    const reloadDropdownHMTL = () => {
        setDropdownHTML(utils.cartAsDropdown());
    }

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
            />
        </div>
    }

    useEffect(() => {
        const init = async () => {
            await utils.setUser();
            await utils.setProductList();
            await utils.loadCart();
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
            <div className="dropdown">
                <button onMouseEnter={reloadDropdownHMTL} className="dropbtn">Cart</button>
                <div className="dropdown-content">
                    {dropdownHTML}
                </div>
            </div>
            {googleSignIn()}

        </div>
    );

}

export default Header;
