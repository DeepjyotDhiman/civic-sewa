import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const IssueCard = ({ issue, onReset }) => {
  const navigate = useNavigate();
  if (!issue) return null;

  const priorityColors = {
    high: { backgroundColor: "#ff4d4f", color: "#fff", padding: "4px 8px", borderRadius: "6px" },
    medium: { backgroundColor: "#faad14", color: "#fff", padding: "4px 8px", borderRadius: "6px" },
    low: { backgroundColor: "#52c41a", color: "#fff", padding: "4px 8px", borderRadius: "6px" },
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#1890ff" }}>Issue Reported Successfully!</h2>
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginTop: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h3>{issue.issueName}</h3>
          <span style={priorityColors[issue.priority?.toLowerCase()]}>
            {issue.priority}
          </span>
        </div>
        <p><strong>Type:</strong> {issue.issueType}</p>
        <p><strong>City:</strong> {issue.city}</p>
        <p><strong>Address:</strong> {issue.address}</p>
        {issue.image && (
          <div>
            <strong>Image:</strong><br />
            <img src={issue.image} alt="Issue" style={{ maxWidth: "100%", marginTop: "10px" }} />
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ marginRight: "10px", padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#ddd" }}
        >
          Back to Dashboard
        </button>
        <button
          onClick={onReset}
          style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#1890ff", color: "#fff" }}
        >
          Report Another Issue
        </button>
      </div>
    </div>
  );
};

const ReportIssuePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    issueName: "",
    issueType: "",
    priority: "",
    city: "Ahmedabad",
    address: "",
    image: null,
  });
  const [submittedIssue, setSubmittedIssue] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async () => {
    if (!formData.priority) {
      alert("Please select a priority level.");
      return;
    }

    let imageUrl = null;
    if (formData.image) {
      const imageRef = ref(storage, `issues/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const issueData = {
      ...formData,
      image: imageUrl,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "issues"), issueData);
      setSubmittedIssue(issueData);
    } catch (error) {
      console.error("Error saving issue: ", error);
      alert("Something went wrong while saving the issue.");
    }
  };

  const handleReset = () => {
    setSubmittedIssue(null);
    setCurrentStep(1);
    setFormData({
      issueName: "",
      issueType: "",
      priority: "",
      city: "Ahmedabad",
      address: "",
      image: null,
    });
  };

  if (submittedIssue) {
    return <IssueCard issue={submittedIssue} onReset={handleReset} />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#1890ff" }}>Report a Civic Issue</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Please provide details for the non-emergency issue below.
      </p>
      <h3>Step {currentStep} of 2</h3>

      {currentStep === 1 && (
        <>
          <div style={{ marginBottom: "12px" }}>
            <label>Name of Issue</label>
            <input
              type="text"
              name="issueName"
              value={formData.issueName}
              onChange={handleChange}
              placeholder="e.g., Large pothole on C.G. Road"
              style={{ width: "100%", padding: "8px", marginTop: "6px", border: "1px solid #ddd", borderRadius: "6px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label>Type of Issue</label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginTop: "6px", border: "1px solid #ddd", borderRadius: "6px" }}
              >
                <option value="" disabled>-- Select a category --</option>
                <option value="Streets">Streets</option>
                <option value="Roads">Roads</option>
                <option value="Electricity">Electricity</option>
                <option value="Sewage">Sewage</option>
                <option value="Forest">Forest</option>
                <option value="Garbage">Garbage</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Priority Level</label>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                {["High", "Medium", "Low"].map((level) => (
                  <div
                    key={level}
                    onClick={() => setFormData({ ...formData, priority: level })}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      backgroundColor:
                        formData.priority === level
                          ? (level === "High" ? "#ff4d4f" : level === "Medium" ? "#faad14" : "#52c41a")
                          : "#f0f0f0",
                      color: formData.priority === level ? "#fff" : "#000",
                    }}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div style={{ marginBottom: "12px" }}>
            <label>City / District</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "6px", border: "1px solid #ddd", borderRadius: "6px" }}
            >
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Other">Village / Other</option>
            </select>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Village / Location Details</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Near Law Garden, Ellisbridge"
              style={{ width: "100%", padding: "8px", marginTop: "6px", border: "1px solid #ddd", borderRadius: "6px" }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Upload Image (Optional)</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
          </div>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
          style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#ddd" }}
        >
          Previous
        </button>
        {currentStep < 2 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#1890ff", color: "#fff" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#52c41a", color: "#fff" }}
          >
            Submit Issue
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportIssuePage;
