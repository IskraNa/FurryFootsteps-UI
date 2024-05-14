import React from 'react';
import Header from "../components/header/Header";
import LoginForm from "../components/loginForm/LoginForm";
// import Footer from "../components/footer/Footer";

function App() {
    return (
        <div className="login-container">
            <Header />
            <div className="login-form">
                <LoginForm/>
            </div>
        </div>
    );

}

export default App;
