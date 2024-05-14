import React from 'react';
import HeaderSmall from '../components/headerSmall/HeaderSmall';
import Footer from '../components/footer/Footer';
import ProfileDetailsForm from '../components/profileDetailsForm/ProfileDetailsForm';
import "../components/registrationForm/RegisterForm.css";



const ProfileDetailsPage = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="profile-details-container">
                <ProfileDetailsForm />
            </div>
            {/*<Footer />*/}
        </div>
    );
}

export default ProfileDetailsPage;
