import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetails.css";
import CommentsSection from "./CommentsSection";
import getPostById from "../../services/postsService/getPostById";

function ServiceDetailsPage({ user }) {
  const { id: postId } = useParams();
  const [service, setService] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const refreshService = async (id) => {
    try {
      const response = await getPostById(id);
      setService(response);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  useEffect(() => {
    refreshService(postId);
  }, [postId]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const handleApply = () => {
    if (selectedAvailability) {
      // TODO: logika za rezervacija
      console.log("Selected availability:", selectedAvailability);
    } else {
      alert("Please select an availability");
    }
  };

  const excludedProperties = [
    "id",
    "reviews",
    "price",
    "petTypeId",
    "userId",
    "activityTypeId",
    "availabilities",
  ];
  const propertyChanges = {
    description: "Description",
    petSize: "Pet Size",
    price: "Price",
    activityType: "Activity Type",
    user: "Posted by",
    petType: "Pet Type",
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div>
      <div className="service-card">
        <div className="service-details-container">
          <div className="service-details-image">
            <img
              src={require(`../../assets/dog_walking.png`)}
              alt={service.serviceName}
            />
            {/* <div className="star-rating">{renderStars(service.rating)} </div> */}
          </div>
          <div className="service-details-info">
            <div className="service-name">{service.serviceName}</div>
            <h1 className="service-description">
              {service.activityType} - ${service.price}
            </h1>

            <div className="service-properties">
              {Object.entries(service).map(([key, value]) => {
                if (excludedProperties.includes(key)) {
                  return null;
                }
                const propertyName = propertyChanges[key] || key;
                return (
                  <div className="service-property" key={key}>
                    <div className="service-key">{propertyName}</div>
                    <div className="service-value">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <div className="availabilities-section">
              <h4>Select Availability:</h4>
              <table className="availabilities-table">
                <thead>
                  <tr>
                    <th colSpan={2}>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {service.availabilities.map((availability, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="radio"
                          id={`availability${index}`}
                          name="availability"
                          value={availability.dateTimeFrom}
                          checked={
                            selectedAvailability === availability.dateTimeFrom
                          }
                          onChange={() =>
                            setSelectedAvailability(availability.dateTimeFrom)
                          }
                        />
                      </td>
                      <td>{availability.dateTimeFrom}</td>
                      <td>{availability.dateTimeTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <button className="apply-button" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
      <CommentsSection
        reviews={service.reviews}
        user={user}
        postId={postId}
        refreshService={refreshService}
      />{" "}
    </div>
  );
}

export default ServiceDetailsPage;
