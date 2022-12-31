import './Header.css';
import {useEffect, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import * as utils from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';
import {GoogleLogin} from "@react-oauth/google";

function Header() {

    const [tabIndex, setTabIndex] = useState(0);
    const [profilePicUrl, setProfilePicUrl] = useState("https://cdn.beepositiveapiary.com/account/pfp.png");

    const loadTab = (index: number) => {
        setTabIndex(index);
    }

    useEffect(() => {
        const init = async () => {
            await utils.setUser();
            await utils.setProductList();
            if (utils.user.ID != undefined) {
                setProfilePicUrl(utils.user.pfpURL);
            }
        }
        init();
    }, []);

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
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
