import React from "react";
import Header from "../components/header/Header";
import CardCategory from "../components/cardCategories/CardCategory";
import "../components/cardCategories/CardCategory.css";
import "../components/cardCategories/UsefulPetKnowledge.css";
import UsefulPetKnowledge from "../components/cardCategories/UsefulPetKnowledge";
import PetData from "../components/cardCategories/PetData";
import { Link } from "react-router-dom";

const HomePage = ({ onClick }) => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="custom-container">
        {/* First Row */}
        <div className="custom-row">
          <div className="custom-col">
            <CardCategory
              category="Pet Walking"
              imageUrl={require("../assets/dog_walking.png")}
              onClick={onClick}
              value="1"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Pet Grooming"
              imageUrl={require("../assets/pet_groominh.png")}
              onClick={onClick}
              value="2"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Pet Adoption"
              imageUrl={require("../assets/pet_adoption.png")}
              onClick={onClick}
              value="3"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="custom-row">
          <div className="custom-col">
            <CardCategory
              category="Veterinary Services"
              imageUrl={require("../assets/veterinary_services.png")}
              onClick={onClick}
              value="4"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Pet Training"
              imageUrl={require("../assets/pet_training.webp")}
              onClick={onClick}
              value="5"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Pet Events"
              imageUrl={require("../assets/pet_event_2.png")}
              style={{ marginLeft: "3%" }}
              onClick={onClick}
              value="6"
            />
          </div>
        </div>
      </div>
      <div className="view-all-button-container">
        <Link to="/services" className="view-all-button">
          View All
        </Link>
      </div>{" "}
      <div className="post-container">
        <UsefulPetKnowledge petData={PetData} />
      </div>
    </div>
  );
};

export default HomePage;
