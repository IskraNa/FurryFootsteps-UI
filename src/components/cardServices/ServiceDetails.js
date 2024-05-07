import React from 'react';
import { useParams } from 'react-router-dom';
import servicesData from './serviceData.json';
import './ServiceDetails.css';
import CommentsSection from './CommentsSection'; // Import the CommentsSection component

function ServiceDetailsPage() {
    const { id } = useParams();
    const service = servicesData.find(service => service.id === parseInt(id));

    if (!service) {
        return <div>Service not found</div>;
    }

    const excludedProperties = ['image']; // List of properties to exclude
    const propertyChanges = {
        serviceName: 'Service Name', // Change property name from "serviceName" to "Service Name"
        price: 'Price',
        providerName: 'Provider Name',
        id: 'Id',
        category: 'Category',
        gender: 'Gender',
        age: 'Age'
        // Change property name from "price" to "Price"
        // Add more property name changes as needed
    };

    // Function to render star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="star">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="star">&#9734;</span>);
            }
        }
        return stars;
    };

    return (
        <div>
            <div className="service-card">
                <div className="service-details-container">
                    <div className="service-details-image">
                        <img src={require(`../../assets/${service.image}`)} alt={service.serviceName} />
                        <div className="star-rating">
                            {renderStars(service.rating)} {/* Render stars based on service rating */}
                        </div>
                    </div>
                    <div className="service-details-info">
                        <div className="service-name">{service.serviceName}</div>
                        <div className="service-price">{service.price}</div>
                        <button className="apply-button">Apply</button>
                        <div className="service-properties">
                            {Object.entries(service).map(([key, value]) => {
                                if (excludedProperties.includes(key)) {
                                    return null; // Skip rendering excluded properties
                                }
                                const propertyName = propertyChanges[key] || key; // Get updated property name
                                return (
                                    <div className="service-property" key={key}>
                                        <div className="service-key">{propertyName}</div>
                                        <div className="service-value">{value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <CommentsSection serviceId={service.id} /> {/* Render the CommentsSection component outside of the card */}
        </div>
    );
}

export default ServiceDetailsPage;
