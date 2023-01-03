import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const { isWaiting, index, isLoading, questions, nextQuestion, correct, checkAnswer } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />
  }

  if (isLoading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return <main>
    <section className="quiz">
      <div className="container">
        <p className='correct-answers'>correct answers : {correct}/{index}</p>
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
        <div className="btn-container">
        {answers.map((answer, index) => {
          return <button key={index} 
          className="answer-btn"
          onClick={() => checkAnswer(correct_answer === answer)} 
          dangerouslySetInnerHTML={{__html: answer}}
          />
        })}
        </div>
        <button className="next-question"
          onClick={nextQuestion}>
          next question
        </button>
      </div>
    </section>
    <Modal />
  </main>
}

export default App
