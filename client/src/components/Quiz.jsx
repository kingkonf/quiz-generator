import React, { useState } from 'react';
import axios from 'axios';
import data, { answers } from '../dataset/data';
import QuizResult from './QuizResult'; // Import the QuizResult component
import './Quiz.css'; // Import the CSS file for styling

const Quiz = () => {
  const [selectedOptions, setSelectedOptions] = useState(Array(data.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username and email are provided
    if (!username || !email) {
      alert('Please provide both username and email before submitting.');
      return;
    }

      // Check if the username and email match the specified values for admin
  if (username === 'admin' && email === 'admin@gmail.com') {
    // Redirect to the middleware page
    window.location.href = '/middleware';
    return;
  }

    // Calculate score
    let newScore = 0;
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] === answers[i]) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowResult(true);

    const percentage = (newScore / data.length) * 100;
    const resultMessage = percentage >= 50 ? "Pass" : "Fail";

    // Prepare quiz data to send to the backend
    const quizData = data.map((questionData, index) => ({
      questionId: questionData.id,
      selectedOption: selectedOptions[index],
      correctOption: answers[index]
    }));

    // Send data to the backend
    axios.post('http://localhost:3001/users', {
      username,
      email,
      resultstatus: `${newScore} out of ${data.length}`,
      percentage: percentage,
      resulttype: resultMessage,
    })
    .then(response => {
      console.log(response.data);
      // Optionally, you can redirect the user to another page
      // window.location.href = "/";
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <form onSubmit={handleSubmit}>
            
          <input className="userid" type="text" placeholder='Username*' value={username} onChange={handleUsernameChange} />
          <br />
          <br />
          <input className="emailid" type="email" placeholder='Email*' value={email} onChange={handleEmailChange} />

          {data.map((questionData, index) => (
            <div key={questionData.id} className="question-container">
              <h3 className="question">{index + 1}. {questionData.question}</h3>
              <ul className="options">
                {questionData.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className={selectedOptions[index] === optionIndex ? "option selected" : "option"}
                    onClick={() => handleOptionSelect(index, optionIndex)}
                  >
                    <input
                      type="radio"
                      id={`option-${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={selectedOptions[index] === optionIndex}
                      readOnly
                    />
                    <label htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <br/>
          <br/>
          <br/>

          <button className="submit" type="submit">Submit</button>
        </form>
      ) : (
        <QuizResult selectedOptions={selectedOptions} score={score} />
      )}
    </div>
  );
}

export default Quiz;
