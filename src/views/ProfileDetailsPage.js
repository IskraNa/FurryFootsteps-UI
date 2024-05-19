import React from "react";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import Footer from "../components/footer/Footer";
import ProfileDetailsForm from "../components/profileDetailsForm/ProfileDetailsForm";
import "../components/registrationForm/RegisterForm.css";

const ProfileDetailsPage = ({ user, userPosts, userId }) => {
  return (
    <div>
      <HeaderSmall user={user} />
      <div className="profile-details-container">
        <ProfileDetailsForm user={user} userPosts={userPosts} userId = {userId} />
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default ProfileDetailsPage;
