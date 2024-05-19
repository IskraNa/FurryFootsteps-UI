import React from "react";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import Footer from "../components/footer/Footer";
import ProfileDetailsForm from "../components/profileDetailsForm/ProfileDetailsForm";
import "../components/registrationForm/RegisterForm.css";

const ProfileDetailsPage = ({ user, userPosts, refreshUserPosts }) => {
  return (
    <div>
      <HeaderSmall user={user} />
      <div className="profile-details-container">
        <ProfileDetailsForm
          user={user}
          userPosts={userPosts}
          refreshUserPosts={refreshUserPosts}
        />
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default ProfileDetailsPage;
