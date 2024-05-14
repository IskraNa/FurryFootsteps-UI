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
import ProfileDetailsPage from "./views/ProfileDetailsPage";
import getAllActivityTypes from "../src/services/activityType/getAllActivityTypes.js";
import getAllPetTypes from "./services/petType/getAllPetTypes.js";
import getAllPosts from "./services/postsService/getAllPosts.js";

function App() {
    const [activityTypes, setActivityTypes] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [activityTypeId, setActivityTypeId] = useState(null);

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

    const refreshPosts = async (page, activityTypeId) => {
        try {
            const response = await getAllPosts(page - 1, activityTypeId);
            setPosts(response.content);
            setTotalPages(response.totalPages);
            console.log("postovi", posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleActivityTypeClick = (id) => {
        setCurrentPage(1);
        setActivityTypeId(id === activityTypeId ? null : id);
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage onClick={handleActivityTypeClick} />}
                    exact
                />
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
                    element={
                        <ServicesPage
                            activityTypes={activityTypes}
                            posts={posts}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            activityTypeId={activityTypeId}
                            refreshPosts={refreshPosts}
                            handleActivityTypeClick={handleActivityTypeClick}
                        />
                    }
                    exact
                />
                <Route path="/details/:id" element={<ServiceDetailsPage />} />
                <Route path="/posts" element={<PostPage />} exact />
                <Route path="/profile" element={<ProfileDetailsPage />} exact />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;