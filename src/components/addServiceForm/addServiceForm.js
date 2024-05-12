import React, { useState } from 'react';
import './addServiceForm.css'; // Import the CSS file

const AddServiceForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        price: '',
        petType: '',
        petSize: '',
        location: '',
        description: '',
        availableTimes: []

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first selected file
        setFormData({
            ...formData,
            picture: file // Update the state with the selected file
        });
    };

    const handleAddTime = () => {
        const newTime = document.getElementById("availableTime").value.trim();
        if (newTime) {
            setFormData(prevFormData => ({
                ...prevFormData,
                availableTimes: [...prevFormData.availableTimes, newTime]
            }));
            document.getElementById("availableTime").value = ''; // Clear the input field after adding the time
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // Add further logic here, such as form validation and submission
    };

    return (
        <div className="add-service-container">
            <div className="add-service-form">
                <h2>Add a Service</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="form-input" // Add this className to apply the common styling
                    >
                        <option value="" disabled hidden style={{ color: 'gray' }}>Select Type of Service</option>
                        <option value="Pet Walking">Pet Walking</option>
                        <option value="Pet Grooming">Pet Grooming</option>
                        <option value="Pet Adoption">Pet Adoption</option>
                        <option value="Veterinary Services">Veterinary Services</option>
                        <option value="Pet Training">Pet Training</option>
                        <option value="Pet Events">Pet Events</option>
                        {/* Add more options as needed */}
                    </select>

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
                        name="price"
                        placeholder="Type of Pet"
                        value={formData.petType}
                        onChange={handleInputChange}
                        required
                    />
                    <select
                        name="petSize"
                        value={formData.petSize}
                        onChange={handleInputChange}
                        required
                        className="form-input" // Add this className to apply the common styling

                    >
                        <option value="" disabled hidden style={{ color: 'gray' }}>Select Size of Pet</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        {/* Add more options as needed */}
                    </select>
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
                            width: '100%',
                            padding: '15px',
                            border: '2px solid #6F4E90',
                            borderRadius: '12px',
                        }}
                    />
                    <div>
                        <label htmlFor="availableTime" className="choose-picture-label">
                            Add Available Time:
                        </label>
                        <input
                            type="text"
                            id="availableTime"
                            name="availableTime"
                            placeholder="Enter available time (e.g., 30-04-2024 12:00 - 30-04-2024 17:00)"
                            required
                        />
                        <button type="button" onClick={handleAddTime}>Add Time</button>
                    </div>

                    <ul>
                        {formData.availableTimes.map((time, index) => (
                            <li key={index}>{time}</li>
                        ))}
                    </ul>






                    <label htmlFor="picture" className="choose-picture-label">
                        Choose Photo of Pet
                    </label>
                    <input
                        id="picture"
                        type="file"
                        accept="image/*"
                        name="picture"
                        onChange={handleFileChange}
                        className="form-input"
                        required
                        // style={{ display: 'none' }}
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
