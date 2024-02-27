import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Home.css';

function Home() {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       window.location.href="/quiz";
    };

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option.</li>
                <li>You can review and change answers before the quiz finishes.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

           

                <button type="submit" onClick={handleSubmit} className="btn">Start quiz</button>

            
        </div>
    );
}

export default Home;
