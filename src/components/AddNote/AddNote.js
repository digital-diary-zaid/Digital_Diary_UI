import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddNote.module.css";

function AddNote() {
    const path = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!title.trim()) {
            errors.title = 'Title is required.';
        }

        if (!description.trim()) {
            errors.description = 'Description is required.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleCancel = () => {
        console.log("Cancelled");
    };

    async function submit(e) {
        e.preventDefault();

        if (validateForm()) {
            const userNote = {
                title,
                description
            };

            try {
                const response = await axios.post("/addNote", userNote);
                console.log(response);

                if (response.data.message === "User not found") {
                    console.log("Please Log in to add a note");
                    path("/login");
                } else if (response.data.message === "Note saved successfully") {
                    path("/");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    }

    return (
       <div className={styles.mainDiv}>
           <div className={`container ${styles.container}`}>
            <div className={`card ${styles.card}`}>
                <div className={`card-body ${styles.cardBody}`}>
                    <h2 className={`card-title text-center ${styles.customHeading}`}>Add Note</h2>
                    <form onSubmit={submit} className={styles.saveNote}>
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="title">Title:</label>
                            <input type="text" name='title' id="title" className={`form-control ${styles.customInput}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                            {formErrors.title && <p className={styles.errorMsg}>{formErrors.title}</p>}
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="description">Description:</label>
                            <textarea name='description' id="description" className={`form-control ${styles.customTextarea}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                            {formErrors.description && <p className={styles.errorMsg}>{formErrors.description}</p>}
                        </div>
                        <div className={`text-center ${styles.buttonGroup}`}>
                            <input type="submit" value="Save" className={`btn btn-primary ${styles.saveButton}`} />
                            <button type="button" onClick={handleCancel} className={`btn btn-danger ${styles.cancelButton}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </div>
    )
}

export default AddNote;