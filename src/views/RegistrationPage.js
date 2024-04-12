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
                <h2>Register</h2>
                <input type="text" name="name" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="tel" name="phone" placeholder="Phone" required />
                <input type="text" name="location" placeholder="Location" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="repeatPassword" placeholder="Repeat Password" required />
                <div style={{ marginTop: "50px" }}>
                    <button type="submit">Register</button>
                    <button>Already have an account? Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default App;
