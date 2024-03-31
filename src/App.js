import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import CategoryPage from './views/CategoryPage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} exact />
                <Route path="/category" element={<CategoryPage/>} exact />
                <Route path="/about" element={<AboutPage/>} exact />
                <Route path="/contact" element={<ContactPage/>} exact />
            </Routes>
        </Router>
    );
}

export default App;
