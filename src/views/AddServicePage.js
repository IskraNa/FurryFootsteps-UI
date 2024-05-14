import React from "react";
import addServiceForm from "../components/addServiceForm/addServiceForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../components/addServiceForm/addServiceForm.css";
import AddServiceForm from "../components/addServiceForm/addServiceForm";
import HeaderSmall from "../components/headerSmall/HeaderSmall";

function App({ activityTypes, petTypes, userId }) {
  return (
    <div className="app-container">
      <HeaderSmall />
      <div className="content-container">
        <AddServiceForm
          activityTypes={activityTypes}
          petTypes={petTypes}
          userId={userId}
        />
      </div>
    </div>
  );
}

export default App;
