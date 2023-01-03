import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const {error, handleChange, handleSubmit, quiz} = useGlobalContext();
  return <main>
    <section className="quiz quiz-small">
      <form action="setup" className="setup-form"
      onSubmit={handleSubmit}
      >
        <h2>setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input type="amount" 
          name="amount" 
          id="amount" 
          className='form-input'
          min="1"
          max={50}
          value={quiz.amount}
          onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handleChange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
            </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">Select difficulty</label>
          <select name="difficulty" 
          id="difficulty" 
          value={quiz.difficulty}
          onChange={handleChange}
          className='form-input'>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
      {error && <p className="error">
        can't generate input, please try different options
        </p>}
        <button type="submit" className="submit-btn">
          start
        </button>
      </form>
    </section>
  </main>
}

export default SetupForm
