import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { isModalOpen, setIsModalOpen, closeModal, correct, questions } = useGlobalContext();

  return <div className={`${isModalOpen ? "modal-container isOpen" : "modal-container"}`}>
    <article className="modal-content">
      <h2>congrats!</h2>
      <p>Congratulations you answerd {((correct / questions.length) * 100).toFixed(0)}% of questions correctly</p>
      <button className="close-btn" onClick={closeModal}>
        play again
      </button>
    </article>
  </div>
}

export default Modal
