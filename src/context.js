import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = '';
const tempUrl = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({amount: 10, category: "sports", difficulty: "easy"});

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    const response = await axios(url).catch(err => console.log(err));
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setIsWaiting(false);
        setError(false);
      } else {
        setIsWaiting(true);
        setError(true);
      }
    } else {
      setIsWaiting(true);
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${quiz.difficulty}&type=multiple`;
    fetchQuestions(url);
  }

  const nextQuestion = () => {
    if (index > questions.length - 2) {
      setIsModalOpen(true);
      setIndex(0);
    } else {
      setIndex(index + 1);
      return index
    }
  }

  const checkAnswer = (value) => {
    if(value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const closeModal = () => {
    setIsWaiting(true);
    setIsModalOpen(false);
    setCorrect(0);
  }

  return <AppContext.Provider value={{
    handleChange,
    handleSubmit,
    quiz,
    questions,
    isWaiting,
    isLoading,
    isModalOpen,
    error,
    index,
    correct,
    setIsModalOpen,
    nextQuestion,
    checkAnswer,
    closeModal
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
