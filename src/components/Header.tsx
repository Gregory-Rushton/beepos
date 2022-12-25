import './Header.css';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import { Database, Auth } from "../lib/ajax.js";
import * as utils from "../lib/utils";

import Home from './Home';
import {Honey, Items} from './Shop';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

function Header() {

    const [tabIndex, setTabIndex] = useState(0);

    const loadTab = (index: number) => {
        console.log(index);
        setTabIndex(index);
    }

    const load = async() => {
        utils.user = await Auth.getUser();
    }
    load();

    return (
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
    );

}

export default Header;
