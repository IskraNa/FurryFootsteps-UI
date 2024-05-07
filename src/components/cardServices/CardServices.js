import React, { useState } from 'react';
import servicesData from './serviceData.json';
import './CardService.css';
import { Link } from 'react-router-dom';

function CardService({ service }) {
    return (
        <div className="card-service">
            <Link to={`/details/${service.id}`}>
                <img src={require(`../../assets/${service.image}`)} alt={service.serviceName} />
            </Link>
            <div className="card-details">
                <h3>{service.serviceName}</h3>
                <p>Gender: {service.gender} - Age: {service.age}</p>
            </div>
        </div>
    );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>&#8592;</button>
            {pageNumbers.map(number => (
                <button key={number} onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
                    {number}
                </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>&#8594;</button>
        </div>
    );
}



function CardServices() {
    const [categories, setCategories] = useState({
        all: true,
        grooming: false,
        walking: false,
        training: false,
        adoption: false,
        events: false,
        veterinary: false
    });

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCategories(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const filteredServices = servicesData.filter(service => {
        if (categories.all) return true;
        return categories[service.category];
    });

    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="App">
            <div className="filters">
                <h3>Services:</h3>
                {Object.entries(categories).map(([category, checked]) => (
                    <label key={category}>
                        <input type="checkbox" name={category} checked={checked} onChange={handleChange} />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                ))}
            </div>
            <div className="services-pagination-container">
                <div className="card-services">
                    {currentServices.map(service => (
                        <CardService key={service.id} service={service} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
        </div>
    );
}


export default CardServices;
