import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import CategoryPage from './views/CategoryPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';
import Footer from './components/footer/Footer';
import RegistrationPage from './views/RegistrationPage';
import LoginPage from './views/LoginPage';
import AddServicePage from './views/AddServicePage';
import ServicesPage from './views/ServicesPage';
import ServiceDetailsPage from './views/ServiceDetailsPage';
import PostPage from "./views/PostPage";
import ProfileDetailsPage from "./views/ProfileDetailsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/category" element={<CategoryPage />} exact />
                <Route path="/about" element={<AboutPage />} exact />
                <Route path="/contact" element={<ContactPage />} exact />
                <Route path="/register" element={<RegistrationPage />} exact />
                <Route path="/login" element={<LoginPage />} exact />
                <Route path="/addService" element={<AddServicePage />} exact />
                <Route path="/services" element={<ServicesPage />} exact />
                <Route path="/details/:id" element={<ServiceDetailsPage />} />
                <Route path="/posts" element={<PostPage/>} exact />
                <Route path="/profile" element={<ProfileDetailsPage />} exact />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
