import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertOctagon, FiSend, FiLoader } from 'react-icons/fi';
import { getAuth } from "firebase/auth";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EmergencyReportPage = () => {
    const [formData, setFormData] = useState({ disasterType: '', placeName: '', city: 'Ranchi', description: '', image: null });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
  
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = auth.currentUser;
        if (!user) {
            setIsLoading(false);
            return alert("You must be logged in.");
        }
        try {
            let imageUrl = "";
            if (formData.image) {
                const storageRef = ref(storage, `emergencies/${Date.now()}_${formData.image.name}`);
                await uploadBytes(storageRef, formData.image);
                imageUrl = await getDownloadURL(storageRef);
            }
            const docRef = await addDoc(collection(db, "emergencies"), {
                disasterType: formData.disasterType,
                city: formData.city,
                placeName: formData.placeName,
                description: formData.description,
                imageUrl: imageUrl || null,
                priority: "High",
                createdAt: serverTimestamp(),
                userId: user.uid,
            });

            await addDoc(collection(db, "notifications"), {
              userId: 'all_authorities',
              message: `New Emergency Reported: "${formData.disasterType}" in ${formData.city}.`,
              issueId: docRef.id,
              isRead: false,
              createdAt: serverTimestamp(),
            });

            alert("Emergency report submitted successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error saving emergency:", error);
            alert("Failed to submit emergency report.");
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Define styles object inside the component
    const styles = {
        pageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', padding: '2rem 1rem', backgroundColor: '#f8f9fa' },
        formCard: { width: '100%', maxWidth: '800px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)', overflow: 'hidden' },
        dangerCard: { border: '2px solid #f8d7da' },
        formHeader: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem', color: 'white' },
        dangerHeader: { backgroundColor: '#dc3545' },
        formSubtitle: { padding: '1rem 2rem', borderBottom: '1px solid #e9ecef', color: '#6c757d', margin: 0 },
        formBody: { padding: '2rem' },
        formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
        formGroup: { display: 'flex', flexDirection: 'column' },
        fullWidth: { gridColumn: '1 / -1' },
        label: { marginBottom: '0.5rem', fontWeight: '600', color: '#495057' },
        input: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
        btnSubmit: { width: '100%', padding: '1rem', marginTop: '2rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
        dangerSubmit: { backgroundColor: '#dc3545', color: 'white' },
        spinner: { animation: 'spin 1s linear infinite' },
    };

    return (
        <div style={styles.pageContainer}>
            <motion.div style={{...styles.formCard, ...styles.dangerCard}} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div style={{...styles.formHeader, ...styles.dangerHeader}}>
                    <FiAlertOctagon size={28}/>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Emergency Report</h1>
                </div>
                <p style={styles.formSubtitle}>For urgent, high-priority incidents ONLY. Misuse may lead to penalties.</p>
                <form onSubmit={handleSubmit} style={styles.formBody}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Type of Disaster</label>
                            <select style={styles.input} name="disasterType" value={formData.disasterType} onChange={handleChange} required>
                                <option value="" disabled>-- Select Disaster --</option>
                                <option value="Flood">Flood</option>
                                <option value="Fire">Fire</option>
                                <option value="Landslide">Landslide</option>
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>City / District</label>
                            <select style={styles.input} name="city" value={formData.city} onChange={handleChange} required>
                                <option value="Ranchi">Ranchi</option>
                                <option value="Jamshedpur">Jamshedpur</option>
                            </select>
                        </div>
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Place / Village / Landmark</label>
                            <input style={styles.input} type="text" name="placeName" value={formData.placeName} onChange={handleChange} required />
                        </div>
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Detailed Description</label>
                            <textarea style={styles.input} name="description" value={formData.description} onChange={handleChange} rows="5" required />
                        </div>
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Upload Image (Optional)</label>
                            <input style={styles.input} type="file" name="image" onChange={handleChange} accept="image/*" />
                        </div>
                    </div>
                    <button type="submit" style={{...styles.btnSubmit, ...styles.dangerSubmit, opacity: isLoading ? 0.7 : 1}} disabled={isLoading}>
                        {isLoading ? <FiLoader style={styles.spinner}/> : <FiSend />}
                        {isLoading ? "Submitting..." : "Submit Emergency Report"}
                    </button>
                </form>
            </motion.div>
             {/* Keyframes for spinner animation */}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default EmergencyReportPage;