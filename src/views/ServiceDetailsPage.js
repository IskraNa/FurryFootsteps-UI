import HeaderSmall from "../components/headerSmall/HeaderSmall";
import React from "react";
import ServiceDetails from "../components/cardServices/ServiceDetails";

function App() {
    return (
        <div className="app-container">
            <HeaderSmall />
            <div className="content-container">
                <ServiceDetails/>
            </div>
        </div>
    );
}

export default App;
