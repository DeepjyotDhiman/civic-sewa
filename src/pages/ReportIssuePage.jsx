import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiSend, FiUploadCloud, FiXCircle, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db, storage } from "../firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const townsInJharkhand = ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh", "Bokaro"];
const priorityLevels = ["Low", "Medium", "High"];

const ReportIssuePage = () => {
    // ... (Your state and functions remain exactly the same)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [town, setTown] = useState("");
    const [village, setVillage] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !town) return alert("Please fill required fields.");
        setIsSubmitting(true);
        const user = auth.currentUser;
        if (!user) {
            setIsSubmitting(false);
            return alert("You must be logged in.");
        }
        try {
            let imageUrl = "";
            if (imageFile) {
                const imageRef = ref(storage, `issues/${uuidv4()}-${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }
            await addDoc(collection(db, "issues"), {
                title, description, priority, imageUrl,
                address: { town, village },
                status: "Submitted",
                createdAt: serverTimestamp(),
                userId: user.uid,
            });
            alert("Issue submitted!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error: ", error);
            alert("Failed to submit issue.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div style={styles.pageContainer}>
            <motion.div style={styles.formCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={styles.formHeader}>
                    <FiAlertTriangle size={28} />
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Report a Civic Issue</h1>
                </div>
                <form onSubmit={handleSubmit} style={styles.formBody}>
                    <div style={styles.formGrid}>
                        {/* Fields will now stack automatically on small screens */}
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Title</label>
                            <input style={styles.input} type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Description</label>
                            <textarea style={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Town (Jharkhand)</label>
                            <select style={styles.input} value={town} onChange={(e) => setTown(e.target.value)} required>
                                <option value="">-- Select Town --</option>
                                {townsInJharkhand.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Village / Area</label>
                            <input style={styles.input} type="text" value={village} onChange={(e) => setVillage(e.target.value)} />
                        </div>
                        <div style={{...styles.formGroup, ...styles.fullWidth}}>
                            <label style={styles.label}>Priority</label>
                             <select style={styles.input} value={priority} onChange={(e) => setPriority(e.target.value)} required>
                                {priorityLevels.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Upload Image (Optional)</label>
                        <AnimatePresence>
                        {imagePreview ? (
                            <motion.div style={styles.imagePreviewWrapper}>
                                <img src={imagePreview} alt="Preview" style={styles.imagePreviewImg} />
                                <button type="button" onClick={handleRemoveImage} style={styles.removeImageBtn}><FiXCircle /></button>
                            </motion.div>
                        ) : (
                            <div style={styles.fileDropzone} onClick={() => fileInputRef.current.click()}>
                                <FiUploadCloud size={24} />
                                <span>Click to upload</span>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                            </div>
                        )}
                        </AnimatePresence>
                    </div>

                    <button type="submit" style={{...styles.btnSubmit, opacity: isSubmitting ? 0.7 : 1}} disabled={isSubmitting}>
                        {isSubmitting ? <FiLoader style={styles.spinner} /> : <FiSend />}
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    pageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', padding: '2rem 1rem', backgroundColor: '#f8f9fa' },
    formCard: { width: '100%', maxWidth: '800px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)', overflow: 'hidden' },
    formHeader: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem', backgroundColor: '#0d6efd', color: 'white' },
    formBody: { padding: '2rem' },
    // ✅ This makes the grid responsive. It creates as many columns as can fit (with a minimum width of 300px).
    // On small screens, only one column will fit, so they stack vertically.
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    fullWidth: { gridColumn: '1 / -1' },
    label: { marginBottom: '0.5rem', fontWeight: '600', color: '#495057' },
    input: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ced4da', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
    fileDropzone: { border: '2px dashed #ced4da', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#6c757d', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' },
    imagePreviewWrapper: { position: 'relative' },
    imagePreviewImg: { width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' },
    removeImageBtn: { position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    btnSubmit: { width: '100%', padding: '1rem', marginTop: '1rem', border: 'none', borderRadius: '8px', backgroundColor: '#0d6efd', color: 'white', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    spinner: { animation: 'spin 1s linear infinite' },
};

export default ReportIssuePage;