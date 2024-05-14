import React, { useState } from 'react';
import './EditProfileForm.css'; // Import the CSS file
import DateTimePicker from "react-datetime-picker";
import { useLocation } from "react-router-dom";

const EditProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        repeatPassword: '',
        picture: []
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
                throw new Error('');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
            });
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            picture: file,
        });
    };

    return (
        <div className="edit-profile-form">
            <h2>Edit Information</h2>
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
                <div className="file-input-container">
                    <label htmlFor="picture" className="upload-image-label">
                        Upload Image
                    </label>
                    <input
                        id="picture"
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={handleFileChange}
                        className="form-input"
                        required
                    />
                    </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
}

export default EditProfileForm;
