import React, { useState } from 'react';
import './addServiceForm.css'; // Import the CSS file

const AddServiceForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        price: '',
        petType: '',
        petSize: '',
        location: '',
        description: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // Add further logic here, such as form validation and submission
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Add a Service</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="type"
                        placeholder="Type of Service"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price of Service"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="petType"
                        placeholder="Type of Pet"
                        value={formData.petType}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="petSize"
                        placeholder="Size of Pet"
                        value={formData.petSize}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location (City)"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '64%',
                            padding: '15px',
                            marginLeft: '15%',
                            border: '2px solid #6F4E90',
                            borderRadius: '12px',
                            // Add any other styles you need
                        }}
                    />
                    <div style={{ marginTop: "50px" }}>
                        <button type="submit">Add Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddServiceForm;
