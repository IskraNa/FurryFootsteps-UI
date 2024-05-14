import React from "react";
import "../components/addServiceForm/addServiceForm.css";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import CardServices from "../components/cardServices/CardServices";

function App({ activityTypes }) {
  return (
    <div className="app-container">
      <HeaderSmall />
      <div className="content-container">
        <CardServices activityTypes={activityTypes} />
      </div>
    </div>
  );
}

export default App;
