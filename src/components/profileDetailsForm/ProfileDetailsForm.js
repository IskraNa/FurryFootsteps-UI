import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileDetailsForm.css';

const ProfileDetailsForm = () => {
    const [user, setUser] = useState({});
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users/1')
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user data:', error));

        axios.get('http://localhost:4000/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services data:', error));
    }, []);

    if (!user || services.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-details-container">
            <div className="profile-header">
                Profile Details
                <img src={user.image} alt={user.fullName} className="user-image" />
            </div>
            <div className="details-flex">
                <div className="profile-info">
                    <h2>Information Summary</h2>
                    <p><strong>Full name:</strong> {user.fullName}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <button className="button edit-information">Edit Information</button>
                </div>
                <div className="services-details">
                    <button className="button add-service">Add service</button>
                    <div className="list-item">
                        {services.map(service => (
                        <div key={service.id} className="service-item">
                            <img src={service.image} alt={service.name} className="service-image" />
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <button className="button edit">Edit</button>
                            <button className="button delete"></button>
                        </div>
                    ))}</div>

                </div>
            </div>
        </div>
    );
};

export default ProfileDetailsForm;
