import './Header.css';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';


import { Database, Auth } from "../lib/ajax.js";
import * as utils from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';

function Header() {
    
    const [tabIndex, setTabIndex] = useState(0);
    const [profilePicUrl, setProfilePicUrl] = useState("https://cdn.beepositiveapiary.com/account/pfp.png");

    const loadTab = (index: number) => {
        setTabIndex(index);
    }
    
    const loadSiteData = async() => { //not sure if this is the best place for this
        await utils.setUser();
        utils.setProductList((await Database.getProducts())["response"]["products"]);
        if(utils.user.ID != undefined) {
            console.log("update");
            setProfilePicUrl(utils.user.pfpURL);
        }
    }
    loadSiteData();



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
            <img src={profilePicUrl} className="profileIcon"></img>
        </div>
    );

}

export default Header;
