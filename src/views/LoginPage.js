import React from 'react';
import Header from "../components/header/Header";
import LoginForm from "../components/loginForm/LoginForm";
// import Footer from "../components/footer/Footer";

function App() {
    return (
<<<<<<< HEAD
        
=======

>>>>>>> master
        <div className="login-container">
            <Header />
            <div className="login-form">
                <h2>Login</h2>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <div style={{ marginTop: "50px" }}>
                    <div className="login-actions">
                        <button type="submit" className="login-button">LOGIN</button>
                        <a href="#" className="forgot-password-link">Forgot Password?</a>
                    </div>
                </div>
                <div className="divider-container">
                    <div className="line"></div>
                    <div className="or-text">OR</div>
                    <div className="line"></div>
                </div>
                <div className="social-login">
                    <button type="button" className="social-button google" />
                </div>
            </div>
        </div>
    );
<<<<<<< HEAD

=======
>>>>>>> master
}

export default App;
