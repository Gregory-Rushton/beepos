import React from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts'

import './App.css';
import Header from './components/Header';
import Checkout from './components/Checkout';

function App() {
    return (
        <BrowserRouter>
                <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore}/>
                <Routes>
                    <Route path="/">
                        <Route index element={
                            <GoogleOAuthProvider clientId="521335006932-7p7d097e7urevemv8v04djf67jj75atk.apps.googleusercontent.com">
                                <Header />
                            </GoogleOAuthProvider>
                        } />
                        <Route path="/checkout" element={<Checkout />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        
    );
}

export default App;
