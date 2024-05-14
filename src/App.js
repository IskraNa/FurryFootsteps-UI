import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import CategoryPage from "./views/CategoryPage";
import AboutPage from "./views/AboutPage";
import ContactPage from "./views/ContactPage";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./views/RegistrationPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginPage from "./views/LoginPage";
import AddServicePage from "./views/AddServicePage";
import ServicesPage from "./views/ServicesPage";
import ServiceDetailsPage from "./views/ServiceDetailsPage";
import PostPage from "./views/PostPage";
import getAllActivityTypes from "../src/services/activityType/getAllActivityTypes.js";
import getAllPetTypes from "./services/petType/getAllPetTypes.js";

function App() {
  const [activityTypes, setActivityTypes] = useState([]);
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const response = await getAllActivityTypes();
        setActivityTypes(response);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };

    fetchActivityTypes();
  }, []);

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await getAllPetTypes();
        setPetTypes(response);
      } catch (error) {
        console.error("Error fetching pet types:", error);
      }
    };
    fetchPetTypes();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/category" element={<CategoryPage />} exact />
        <Route path="/about" element={<AboutPage />} exact />
        <Route path="/contact" element={<ContactPage />} exact />
        <Route path="/register" element={<RegistrationPage />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route
          path="/addService"
          element={
            <AddServicePage activityTypes={activityTypes} petTypes={petTypes} />
          }
          exact
        />
        <Route
          path="/services"
          element={<ServicesPage activityTypes={activityTypes} />}
          exact
        />
        <Route path="/details/:id" element={<ServiceDetailsPage />} />
        <Route path="/posts" element={<PostPage />} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
