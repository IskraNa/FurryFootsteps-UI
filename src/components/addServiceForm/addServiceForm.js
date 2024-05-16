import React, { useState } from "react";
import "./addServiceForm.css";
import axiosInstance from "../../services/axiosInstance";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { format, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";

const AddServiceForm = ({
  activityTypes,
  petTypes,
  userId,
  refreshUserPosts,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    petSize: "",
    price: "",
    petTypeId: "",
    activityTypeId: "",
    availabilities: [],
    picture: [],
    userId: userId,
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

    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      setFormData({
        ...formData,
        picture: Array.from(uint8Array),
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDateTimeChange = (index, field, value) => {
    const dateObject = value.$d;

    const isInPast = isPast(dateObject);
    if (isInPast) {
      setError("Selected date is in the past!");
    }

    const formattedDate = format(dateObject, "dd-MM-yyyy HH:mm:ss");

    const updatedAvailabilities = [...formData.availabilities];
    updatedAvailabilities[index][field] = formattedDate;
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
        petSize: formData.petSize,
        price: "",
        petTypeId: formData.petTypeId,
        activityTypeId: formData.activityTypeId,
        availabilities: [{ dateTimeFrom: "", dateTimeTo: "" }],
        picture: null,
        userId: userId,
      });
      navigate("/profile");
      refreshUserPosts(userId);
    } catch (error) {
      setError("Failed to add service. Please try again.");
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
            <option value="" disabled>
              Select a service type
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
            name="petTypeId"
            value={formData.petTypeId}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Select a pet type
            </option>
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
            <option value="" disabled>
              Select a pet size
            </option>
            <option value="SMALL">Small</option>
            <option value="MEDIUM">Medium</option>
            <option value="LARGE">Large</option>
          </select>

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
          <div>
            {formData.availabilities.map((availability, index) => (
              <div key={index} className="date-time-container">
                <div className="date-time-picker">
                  <label className="choose-picture-label">
                    Date and Time From:
                  </label>
                  <MobileDateTimePicker
                    onChange={(value) =>
                      handleDateTimeChange(index, "dateTimeFrom", value)
                    }
                  />
                </div>
                <div className="date-time-picker">
                  <label className="choose-picture-label">
                    Date and Time To:
                  </label>
                  <MobileDateTimePicker
                    onChange={(value) =>
                      handleDateTimeChange(index, "dateTimeTo", value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

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
          {error && <p className="error-message">{error}</p>}

          <div style={{ marginTop: "50px" }}>
            <button type="submit">Add Service</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
