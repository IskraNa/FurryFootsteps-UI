import React from "react";
import addServiceForm from "../components/addServiceForm/addServiceForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../components/addServiceForm/addServiceForm.css";
import AddServiceForm from "../components/addServiceForm/addServiceForm";
import HeaderSmall from "../components/headerSmall/HeaderSmall";

function App({ activityTypes, petTypes }) {
  return (
    <div className="app-container">
      <HeaderSmall />
      <div className="content-container">
        <AddServiceForm activityTypes={activityTypes} petTypes={petTypes} />
      </div>
    </div>
  );
}

export default App;
