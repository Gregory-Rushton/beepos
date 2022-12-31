import React from 'react';
import './App.css';
import Header from './components/Header';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId="521335006932-7p7d097e7urevemv8v04djf67jj75atk.apps.googleusercontent.com">
            <div>
                <Header/>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
