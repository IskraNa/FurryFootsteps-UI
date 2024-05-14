// import React from "react";
import "./ProfileDetailsForm.css";

const ProfileDetailsForm = ({ user, userPosts }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        Profile Details
        <img
          src={user.image}
          alt={user.name + " " + user.surname}
          className="user-image"
        />
      </div>
      <div className="details-flex">
        <div className="profile-info">
          <h2>Information Summary</h2>
          <p>
            <strong>Full name:</strong> {user.name + " " + user.surname}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
          <button className="button edit-information">Edit Information</button>
        </div>
        <div className="services-details">
          <div className="services-list">
            {userPosts.map((service) => (
              <div key={service.id} className="service-item">
                <img
                  src={service.image}
                  alt={service.activityTypeName}
                  className="service-image"
                />
                <h4>{service.activityTypeName}</h4>
                <p>{service.description}</p>
                <button className="button edit">Edit</button>
                <button className="button delete"></button>
              </div>
            ))}
          </div>
          <button className="button add-service">Add a new post +</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
