import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

function Image() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`); // Fixed line
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error('Upload error: ', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageURL(downloadURL);
                });
            }
        );
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>Upload Progress: {progress}%</p>
            {imageURL && (
                <div>
                    <p>Image Uploaded:</p>
                    <img src={imageURL} alt="Uploaded" style={{ width: '200px' }} />
                </div>
            )}
        </div>
    );
}

export default Image;