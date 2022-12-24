import './Header.css';
import { useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import Home from './Home';
import Honey from './Honey';

function Header() {

    const [tabIndex, setTabIndex] = useState(0);

    const loadTab = (index: number) => {
        console.log(index);
        setTabIndex(index);
    }

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
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
            </Tabs>

        </div>
    );

}

export default Header;
