import React from 'react';

function PostTypeSelector({ selectedOption, onSelectOption }) {
    return (
        <div>
            <h2>Select Post Type</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="question"
                        checked={selectedOption === 'question'}
                        onChange={() => onSelectOption('question')}
                    />
                    Question
                </label>
                <label>
                    <input
                        type="radio"
                        value="article"
                        checked={selectedOption === 'article'}
                        onChange={() => onSelectOption('article')}
                    />
                    Article
                </label>
                <label>
                    <input
                        type="radio"
                        value="findQuestion"
                        checked={selectedOption === 'findQuestion'}
                        onChange={() => onSelectOption('findQuestion')}
                    />
                    Find Question
                </label>
            </div>
        </div>
    );
}

export default PostTypeSelector;