import React from "react";
import { Link } from "react-router-dom";
import "./ProfileDetailsForm.css";

const ProfileDetailsForm = ({ user, userPosts }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        <img
          src={require("../../assets/post2.png")}
          alt={user.name + " " + user.surname}
          className="user-image"
        />{" "}
        Profile Details
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
          <h2>Your Posts</h2>
          <div className="services-list">
            {userPosts.length === 0 ? (
              <p>You don't have any posts. Create here!</p>
            ) : (
              userPosts.map((service) => (
                <div key={service.id} className="service-item">
                  <Link to={`/details/${service.id}`}>
                    <img
                      //   src={service.picture}
                      src={require("../../assets/post1.jpg")}
                      alt={service.activityTypeName}
                      className="service-image"
                    />
                  </Link>

                  <h4>{service.activityTypeName}</h4>
                  <p>{service.description}</p>
                  <button className="button edit">Edit</button>
                  <button className="button delete"></button>
                </div>
              ))
            )}
          </div>
          <Link to="/addService" className="button add-service">
            Add a new post +
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
