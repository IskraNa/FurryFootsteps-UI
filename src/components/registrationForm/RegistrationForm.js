import React, { useState } from 'react';
import './RegisterForm.css'; // Import the CSS file

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        repeatPassword: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        try {
            const response = await fetch('http://localhost:8080/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Registration failed');
            }
    
            const data = await response.json();
            console.log('Registration successful:', data);
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                password: '',
                repeatPassword: ''
            });
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    
                    <input
                        type="text"
                        name="name"
                        placeholder='Full Name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    
                    <input
                        type="tel"
                        name="phone"
                        placeholder='Phone number'
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    
                    <input
                        type="text"
                        name="location"
                        placeholder='Location'
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                   
                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder='Repeat password'
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">REGISTER</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
