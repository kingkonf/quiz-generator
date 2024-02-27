
import React from 'react';
import data, { answers } from '../dataset/data';
import './QuizResult.css'; // Import the CSS file for styling

const QuizResult = ({ selectedOptions, score }) => {
  const renderResult = () => {
    const totalQuestions = data.length;
    const percentage = (score / totalQuestions) * 100;
    const resultMessage = percentage >= 50 ? "Pass" : "Fail";

    return (
      <div className="result-container">
        <h2>Result</h2>
        <p>Score: {score} out of {totalQuestions}</p>
        <p>Percentage: {percentage.toFixed(2)}%</p>
        <p>{resultMessage}</p>
        {data.map((questionData, index) => (
          <div key={questionData.id} className="question-result">
            <p>{index + 1}. {questionData.question}</p>
            <p className={selectedOptions[index] === answers[index] ? "correct" : "incorrect"}>
              Your Answer: {questionData.options[selectedOptions[index]]}<br />
              Correct Answer: {questionData.options[answers[index]]}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="quiz-result">
      {renderResult()}
    </div>
  );
}

export default QuizResult;
