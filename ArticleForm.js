import React, { useState } from 'react';
import './ArticleForm.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Image from './Image';

function ArticleForm() {
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        article: '',
        tag: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const writeUserData = async () => {
        await addDoc(collection(db, "article"), formData)
            .then(() => alert("Data Uploaded!"))
            .catch((error) => console.error("Error uploading data: ", error));
    };

    return (
        <>
            <div className="img">
                <h2>Add an image:</h2>
                <Image />
            </div>
            <div className='articleHeader'>
                <h2>What do you want to share?</h2>
                <div className='title'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        onChange={handleChange}
                    />
                </div>
                <div className='Abstract'>
                    <label>Abstract:</label>
                    <input
                        type="text"
                        name="abstract"
                        placeholder="Enter article abstract"
                        onChange={handleChange}
                    />
                </div>
                <div className='Article'>
                    <label>Article Text:</label>
                    <input
                        type="text"
                        name="article"
                        placeholder="Enter article text"
                        onChange={handleChange}
                    />
                </div>
                <div className='Tag'>
                    <label>Tags:</label>
                    <input
                        type="text"
                        name="tag"
                        placeholder="Enter tags"
                        onChange={handleChange}
                    />
                </div>
                <button onClick={writeUserData} className="Button">Post</button>
            </div>
        </>
    );
}

export default ArticleForm;