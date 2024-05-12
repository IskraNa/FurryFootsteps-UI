import React, { useState, useEffect } from "react";
import "./CardService.css";
import { Link } from "react-router-dom";
import getAllPosts from "../../services/postsService/getAllPosts.js";
import getAllActivityTypes from "../../services/activityType/getAllActivityTypes.js";

function CardService({ service }) {
  return (
    <div className="card-service">
      <Link to={`/details/${service.id}`}>
        <img
          //src={require(`../../assets/${service.image}`)}
          src={require(`../../assets/dog_walking.png`)}
          alt={service.serviceName}
        />
      </Link>
      <div className="card-details">
        <h3>{service.activityTypeName}</h3>
        <p>
          Pet size:{" "}
          {service.petSize.charAt(0) + service.petSize.slice(1).toLowerCase()}
        </p>

        <p>Price: ${service.price}</p>
        <p className="posted-by">Posted by: {service.user} </p>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&#8592;</button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&#8594;</button>
      )}
    </div>
  );
}

function CardServices() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activityTypeId, setActivityTypeId] = useState(null);
  const [activityTypes, setActivityTypes] = useState([]);

  const refreshActivityTypes = async () => {
    try {
      const response = await getAllActivityTypes();
      setActivityTypes(response);
    } catch (error) {
      console.error("Error fetching activity types:", error);
    }
  };

  useEffect(() => {
    refreshActivityTypes();
  }, []);

  const refreshPosts = async (page, activityTypeId) => {
    try {
      const response = await getAllPosts(page - 1, activityTypeId);
      setPosts(response.content);
      console.log("postovi", response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    refreshPosts(currentPage, activityTypeId);
  }, [currentPage, activityTypeId]);

  const handleActivityTypeClick = (id) => {
    setCurrentPage(1);
    setActivityTypeId(id === activityTypeId ? null : id);
  };

  return (
    <div className="App">
      <div className="filters">
        <h3>Services:</h3>
        <p
          className={!activityTypeId ? "active" : ""}
          onClick={() => handleActivityTypeClick(null)}
        >
          All
        </p>
        {activityTypes.map((activityType) => (
          <p
            key={activityType.id}
            className={activityTypeId === activityType.id ? "active" : ""}
            onClick={() => handleActivityTypeClick(activityType.id)}
          >
            {activityType.type}
          </p>
        ))}
      </div>
      <div className="services-pagination-container">
        <div className="card-services">
          {posts.length > 0 ? (
            posts.map((service) => (
              <CardService key={service.id} service={service} />
            ))
          ) : (
            <h2 className="card-services-none">Нема постови</h2>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CardServices;
