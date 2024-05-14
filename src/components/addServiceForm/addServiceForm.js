import React, { useState } from "react";
import "./addServiceForm.css";
import DateTimePicker from "react-datetime-picker";
import axiosInstance from "../../services/axiosInstance";

const AddServiceForm = ({ activityTypes, petTypes }) => {
  const [formData, setFormData] = useState({
    description: "",
    petSize: "",
    price: "",
    petTypeId: "",
    activityTypeId: "",
    availabilities: [],
    picture: [],
    userId: 1,
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

    // Read the file as a Blob
    const reader = new FileReader();
    reader.onloadend = () => {
      // Convert the Blob to a Uint8Array
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      // Set the Uint8Array as the picture data in the formData
      setFormData({
        ...formData,
        picture: Array.from(uint8Array),
      });
    };
    reader.readAsArrayBuffer(file);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/posts/add", formData);
      console.log("Response from server:", response.data);

      setFormData({
        description: "",
        petSize: "",
        price: "",
        petTypeId: "",
        activityTypeId: "",
        availabilities: [{ dateTimeFrom: "", dateTimeTo: "" }],
        picture: [],
        userId: 1,
      });
    } catch (error) {
      console.error("Error occurred while sending data to server:", error);
    }
  };

  return (
    <div className="add-service-container">
      <div className="add-service-form">
        <h2>Add a Service</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="activityTypeId"
            value={formData.activityTypeId}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            {/* <option value="default" disabled hidden style={{ color: "gray" }}>
              Select Type of Service
            </option> */}
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
            name="petTypeId"
            value={formData.petTypeId}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            {/* <option value="" disabled hidden style={{ color: "gray" }}>
              Select Type of Pet
            </option> */}
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
            {/* <option value="" disabled hidden style={{ color: "gray" }}>
              Select Size of Pet
            </option> */}
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
          </select>
          {/* <input
            type="text"
            name="location"
            placeholder="Location (City)"
            value={formData.location}
            onChange={handleInputChange}
            required
          /> */}
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
