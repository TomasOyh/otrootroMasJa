import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { courseId, unitId } = useParams();
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    setQuizCompleted(true);

    // Actualizar el progreso en localStorage
    const completedItems = JSON.parse(localStorage.getItem(`completedItems-${courseId}`)) || [];
    const unitIndex = parseInt(unitId) - 1;
    const quizIndex = unitIndex * (5 + 1) + 5; // Asumiendo que cada unidad tiene 5 clases y 1 quiz
    completedItems[quizIndex] = true;
    localStorage.setItem(`completedItems-${courseId}`, JSON.stringify(completedItems));

    setTimeout(() => {
      navigate(`/course/${courseId}`);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Quiz</h1>
        <p className="text-center mb-4">Complete the quiz and submit your answers.</p>
        <form onSubmit={handleQuizSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Question 1</label>
            <div className="flex flex-col">
              <label className="mb-2">
                <input type="radio" name="question1" value="option1" className="mr-2" /> Option 1
              </label>
              <label className="mb-2">
                <input type="radio" name="question1" value="option2" className="mr-2" /> Option 2
              </label>
              <label className="mb-2">
                <input type="radio" name="question1" value="option3" className="mr-2" /> Option 3
              </label>
              <label className="mb-2">
                <input type="radio" name="question1" value="option4" className="mr-2" /> Option 4
              </label>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 p-2 rounded-lg hover:bg-blue-400 transition duration-300">
              Submit Quiz
            </button>
          </div>
        </form>
        {quizCompleted && <p className="text-center mt-4 text-green-500">Quiz Completed! Redirecting...</p>}
      </div>
    </div>
  );
};

export default QuizPage;
