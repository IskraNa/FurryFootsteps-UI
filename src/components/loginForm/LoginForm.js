import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate  } from 'react-router-dom'
const LoginForm = () => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const handleInputChange = (event) =>  {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
       
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('userData', JSON.stringify(data));    
            setFormData({
                email: '',
                password: '',
            });
            // const User = JSON.parse(localStorage.getItem('userData'))
            navigate('/');
            
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleInputChange}

                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}

                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="login-actions">
                        <button type="submit" className="login-button">LOGIN</button>
                        <a href="#" className="forgot-password-link">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;