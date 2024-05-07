import React from 'react';
import RegistrationForm from "../components/registrationForm/RegistrationForm";
import Header from "../components/header/Header";
import "../components/registrationForm/RegisterForm.css";
import Footer from "../components/footer/Footer"; // Import the CSS file

function App() {
    return (
        <div className="register-container">
            <Header />
            <div className="register-form">
                <RegistrationForm />
            </div>
        </div>
    );
}

export default App;
