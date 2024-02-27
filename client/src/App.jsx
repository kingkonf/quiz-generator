import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import Middleware from './components/Middleware';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='Quiz' element={<Quiz/>}/>
        <Route path='QuizResult' element={<QuizResult/>}/>
        <Route path='middleware' element={<Middleware/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
