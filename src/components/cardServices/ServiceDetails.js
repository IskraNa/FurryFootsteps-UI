import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetails.css";
import CommentsSection from "./CommentsSection";
import getPostById from "../../services/postsService/getPostById";
import axiosInstance from "../../services/axiosInstance";
import axios from "axios";

function ServiceDetailsPage({ user }) {
  const { id: postId } = useParams();
  const [service, setService] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [requestId, setRequestId] = useState(null);
  //const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   // Retrieve userId from local storage
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   // console.log("User Data:", userData);

  //   if (userData) {
  //     const { id } = userData;
  //     // console.log("User ID:", id);
  //     setUserId(id);
  //   }
  // }, []);

  const refreshService = async (id) => {
    try {
      const response = await getPostById(id);
      setService(response);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPostById(postId);
        setService(response);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  useEffect(() => {
    refreshService(postId);
  }, [postId]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const handleApply = async () => {
    if (selectedAvailability) {
      console.log("Selected Availability:", selectedAvailability);
      try {
        const requestData = {
          status: "PENDING",
        };

        console.log("Request Data:", requestData);
        console.log("user", user.id);
        console.log("avaliability", selectedAvailability.id);
        const response = await axios.post(
          "http://localhost:8080/api/requests/create",
          requestData,
          {
            params: {
              availabilityId: selectedAvailability.id,
              userRequesterId: user.id,
            },
          }
        );

        setRequestId(response.data.id);
        console.log("Created request.", response.data.id); // Use response.data.id
        alert("Request successfully created!");
      } catch (error) {
        console.error("Error creating request:", error.message);
        alert("Error creating request. Please try again later.");
      }
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
                  {/* {service.availabilities.map((availability, index) => (
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
                  ))} */}
                  {service.availabilities.map((availability, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="radio"
                          id={`availability${index}`}
                          name="availability"
                          value={availability.availabilityId}
                          checked={selectedAvailability?.id === availability.id}
                          onChange={() => setSelectedAvailability(availability)}
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
