import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EmergencyReportCard = ({ report, onReset }) => {
  const navigate = useNavigate();
  if (!report) return null;

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize: "2rem", color: "#dc3545", textAlign: "center" }}>
        High Priority Alert Submitted!
      </h2>
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          marginTop: "1.5rem",
          borderLeft: "8px solid #dc3545",
        }}
      >
        <div
          style={{
            background: "#dc3545",
            color: "white",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.4rem" }}>
            {report.disasterType} Alert
          </h3>
        </div>
        <div
          style={{
            padding: "1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem 1.5rem",
          }}
        >
          <div>
            <strong style={{ display: "block", color: "#6c757d" }}>
              City/District:
            </strong>
            <span>{report.city}</span>
          </div>
          <div>
            <strong style={{ display: "block", color: "#6c757d" }}>
              Place/Village:
            </strong>
            <span>{report.placeName}</span>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <strong style={{ display: "block", color: "#6c757d" }}>
              Description:
            </strong>
            <p
              style={{
                background: "#f8f9fa",
                padding: "10px",
                borderRadius: "6px",
                margin: 0,
              }}
            >
              {report.description}
            </p>
          </div>
          <div>
            <strong style={{ display: "block", color: "#6c757d" }}>Image:</strong>
            <span>{report.imageUrl ? "Uploaded" : "No image uploaded"}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "0.9rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#6c757d",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "0.9rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#0d6efd",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Report Another Emergency
        </button>
      </div>
    </div>
  );
};

const EmergencyReportPage = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    placeName: "",
    city: "Ahmedabad",
    description: "",
    image: null,
  });
  const [submittedReport, setSubmittedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (formData.image) {
        const storageRef = ref(
          storage,
          `emergencies/${Date.now()}_${formData.image.name}`
        );
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const reportData = {
        disasterType: formData.disasterType,
        city: formData.city,
        placeName: formData.placeName,
        description: formData.description,
        imageUrl: imageUrl || null,
        priority: "High",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "emergencies"), reportData);
      setSubmittedReport({ ...reportData, id: docRef.id });
    } catch (error) {
      console.error("Error saving emergency:", error);
      alert("❌ Failed to submit emergency report.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedReport(null);
    setFormData({
      disasterType: "",
      placeName: "",
      city: "Ahmedabad",
      description: "",
      image: null,
    });
  };

  if (submittedReport) {
    return <EmergencyReportCard report={submittedReport} onReset={handleReset} />;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", color: "#dc3545" }}>
          Emergency Disaster Report
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
          Use this form for major, high-priority incidents ONLY.
        </p>
      </div>
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          border: "2px solid #f8d7da",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Disaster + City */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <label>Type of Disaster</label>
              <select
                name="disasterType"
                value={formData.disasterType}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              >
                <option value="" disabled>
                  -- Select Disaster --
                </option>
                <option value="Cyclone">Cyclone</option>
                <option value="Flood">Flood</option>
                <option value="Tornado">Tornado</option>
                <option value="Landslide">Landslide</option>
                <option value="Heavy Rainfall">Heavy Rainfall</option>
              </select>
            </div>
            <div>
              <label>City / District</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              >
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Surat">Surat</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Kutch">Kutch</option>
                <option value="Other">Village / Other</option>
              </select>
            </div>
          </div>

          {/* Place Name */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Place / Village Name</label>
            <input
              type="text"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Detailed Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            ></textarea>
          </div>

          {/* Image */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label>Upload Image (Optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "1rem",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "1.1rem",
              background: isLoading ? "#e9ecef" : "#dc3545",
              color: "white",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Submitting..." : "Submit Emergency Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyReportPage;
