import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import './FindQuestion.css';

function FindQuestion() {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState({ title: '', tag: '' });
    const [newQuestion, setNewQuestion] = useState({ title: '', tag: '', desc: '', date: '' });
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getDocs(collection(db, 'questions'));
            const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionData);
        };
        fetchQuestions();
    }, []);

    const handleFilter = () => {
        const filtered = questions.filter((q) =>
            q.title.toLowerCase().includes(filter.title.toLowerCase()) &&
            q.tag.toLowerCase().includes(filter.tag.toLowerCase())
        );
        setQuestions(filtered);
    };

    const handleSubmitNewQuestion = async () => {
        const currentDate = new Date().toLocaleDateString();
        await addDoc(collection(db, 'questions'), { ...newQuestion, date: currentDate });
        setNewQuestion({ title: '', tag: '', desc: '', date: '' });
    };

    return (
        <div className='FindQuestion'>
            <h2>Filter Questions</h2>
            <div className="filter">
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={filter.title}
                    onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Filter by tag"
                    value={filter.tag}
                    onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
                />
                <button className="Button" onClick={handleFilter}>Filter</button>
            </div>

            <h2>Questions</h2>
            {questions.map((question, index) => (
                <div className="card" key={question.id}>
                    <h2>{question.title}</h2>
                    {expandedIndex === index && (
                        <p>{question.desc}</p>
                    )}
                    <button className="Button" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                        {expandedIndex === index ? 'Hide' : 'Expand'}
                    </button>
                    <button className="Button" onClick={() => deleteDoc(doc(db, 'questions', question.id))}>Delete</button>
                </div>
            ))}

            <h2>Add a New Question</h2>
            <div className="new-question-form">
                <input
                    type="text"
                    placeholder="Question title"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={newQuestion.tag}
                    onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newQuestion.desc}
                    onChange={(e) => setNewQuestion({ ...newQuestion, desc: e.target.value })}
                />
                <button className="Button" onClick={handleSubmitNewQuestion}>Add Question</button>
            </div>
        </div>
    );
}

export default FindQuestion;