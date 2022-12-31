import './Header.css';
import {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import * as utils from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Header() {

    const [tabIndex, setTabIndex] = useState(0);

    const loadTab = (index: number) => {
        setTabIndex(index);
    }

    useEffect(() => {
        const init = async () => {
            await utils.setUser();
            await utils.setProductList();
        }
        init();
    }, []);

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    interface Credential {
                        clientId: string;
                        credential: string;
                        select_by: string;
                    }
                    const credential = jwtDecode<Credential>((credentialResponse as Credential).credential);
                    console.log(credential);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
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
        </div>
    );

}

export default Header;
