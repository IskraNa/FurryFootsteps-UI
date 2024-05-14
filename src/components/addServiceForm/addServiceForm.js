import React, { useState } from "react";
import "./addServiceForm.css";
import DateTimePicker from "react-datetime-picker";
import { useLocation } from "react-router-dom";

const AddServiceForm = ({ activityTypes, petTypes }) => {
  const [formData, setFormData] = useState({
    description: "",
    petSize: "",
    price: "",
    petType: "",
    activityType: "",
    availabilities: [{ dateTimeFrom: new Date(), dateTimeTo: new Date() }],
    picture: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      picture: file,
    });
  };

  const handleDateTimeChange = (index, field, value) => {
    const updatedAvailabilities = [...formData.availabilities];
    updatedAvailabilities[index][field] = value;
    setFormData({
      ...formData,
      availabilities: updatedAvailabilities,
    });
  };

  const handleAddTime = () => {
    setFormData({
      ...formData,
      availabilities: [
        ...formData.availabilities,
        { dateTimeFrom: new Date(), dateTimeTo: new Date() },
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="add-service-container">
      <div className="add-service-form">
        <h2>Add a Service</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled hidden style={{ color: "gray" }}>
              Select Type of Service
            </option>
            {activityTypes.map((activityType) => (
              <option key={activityType.id} value={activityType.id}>
                {activityType.type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price of Service"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="form-input number-input"
          />

          <select
            name="petType"
            value={formData.petType}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            {petTypes.map((petType) => (
              <option key={petType.id} value={petType.id}>
                {petType.type}
              </option>
            ))}
          </select>

          <select
            name="petSize"
            value={formData.petSize}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled hidden style={{ color: "gray" }}>
              Select Size of Pet
            </option>
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location (City)"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "2px solid #6F4E90",
              borderRadius: "12px",
            }}
          />

          {/* <div>
            <label htmlFor="dateTimeFrom" className="choose-picture-label">
              Date and Time From:
            </label>
            {formData.availabilities.map((availability, index) => (
              <div key={index} className="datetime-picker-container">
                <DateTimePicker
                  className="datetime-picker"
                  value={availability.dateTimeFrom}
                  onChange={(value) =>
                    handleDateTimeChange(index, "dateTimeFrom", value)
                  }
                />
              </div>
            ))}
          </div> */}

          {/* <div>
            <label htmlFor="dateTimeTo" className="choose-picture-label">
              Date and Time To:
            </label>
            {formData.availabilities.map((availability, index) => (
              <div key={index} className="datetime-picker-container">
                <DateTimePicker
                  className="datetime-picker"
                  value={availability.dateTimeTo}
                  onChange={(value) =>
                    handleDateTimeChange(index, "dateTimeTo", value)
                  }
                />
              </div>
            ))}
          </div> */}

          <button type="button" onClick={handleAddTime}>
            Add Time
          </button>

          <label htmlFor="picture" className="choose-picture-label">
            Choose Photo of Pet
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            name="picture"
            onChange={handleFileChange}
            className="form-input"
            required
          />

          <div style={{ marginTop: "50px" }}>
            <button type="submit">Add Service</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
