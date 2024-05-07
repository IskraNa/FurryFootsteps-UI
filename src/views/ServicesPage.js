import React from 'react';
import "../components/addServiceForm/addServiceForm.css";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import CardServices from "../components/cardServices/CardServices";


function App() {
    return (
        <div className="app-container">
            <HeaderSmall />
            <div className="content-container">
                <CardServices/>
            </div>
        </div>
    );
}

export default App;
