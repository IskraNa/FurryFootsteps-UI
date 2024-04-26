import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
    return (
        <div className="login-form-container">
            <div className="login-form-card">
                <h2>Login</h2>
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Username" required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" required />
                    </div>
                    <div className="login-actions">
                        <button type="submit" className="login-button">LOGIN</button>
                        <a href="#" className="forgot-password-link">Forgot Password?</a>
                    </div>
                    <div className="divider-container">
                        <div className="line"></div>
                        <div className="or-text">OR</div>
                        <div className="line"></div>
                    </div>
                    <div className="social-login">
                        <button type="button" className="social-button google" />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
