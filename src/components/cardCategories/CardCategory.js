import React from 'react';
import './CardCategory.css';

const CardCategory = ({ category, imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={category} className={category === "Pet Training" ? "training-image" : "card-image"} />
            <div className="card-content">
                <p className="category-name">{category}</p>
            </div>
        </div>
    );
}

export default CardCategory;
