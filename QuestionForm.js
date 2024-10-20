import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function QuestionForm() {
    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        desc: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitQuestion = async () => {
        await addDoc(collection(db, "questions"), formData)
            .then(() => alert("Question Submitted"))
            .catch((error) => console.error("Error uploading question: ", error));
    };

    return (
        <div>
            <h2>Ask a Question</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter question title"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Tag:</label>
                <input
                    type="text"
                    name="tag"
                    placeholder="Enter question tag"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="desc"
                    placeholder="Enter question description"
                    onChange={handleChange}
                />
            </div>
            <button onClick={submitQuestion}>Submit</button>
        </div>
    );
}

export default QuestionForm;