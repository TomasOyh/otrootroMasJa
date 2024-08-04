import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import videoSrc from './assets/Cryptopall_2023_AfterMovie.mp4'; // Asegúrate de que la ruta sea correcta

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const course = {
    id: 1,
    title: 'Blockchain Basics',
    description: 'Learn how blockchains work, smart contracts, and how to sign your first transaction.',
    level: 'Beginner',
    lessons: 20,
    duration: '3hrs',
    exams: 1,
    units: [
      { id: 1, title: 'Unidad 1', classes: ['Clase 1', 'Clase 2', 'Clase 3', 'Clase 4', 'Clase 5'] },
      { id: 2, title: 'Unidad 2', classes: ['Clase 1', 'Clase 2', 'Clase 3', 'Clase 4', 'Clase 5'] },
      { id: 3, title: 'Unidad 3', classes: ['Clase 1', 'Clase 2', 'Clase 3', 'Clase 4', 'Clase 5'] },
    ],
  };

  const totalItems = course.units.reduce((sum, unit) => sum + unit.classes.length + 1, 0); // +1 for each quiz
  const [completedItems, setCompletedItems] = useState(() => {
    return JSON.parse(localStorage.getItem(`completedItems-${courseId}`)) || Array(totalItems).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(`completedItems-${courseId}`, JSON.stringify(completedItems));
  }, [completedItems, courseId]);

  const handleCheckboxChange = (index) => {
    const updatedItems = [...completedItems];
    updatedItems[index] = !updatedItems[index];
    setCompletedItems(updatedItems);
  };

  const progress = Math.min((completedItems.filter(Boolean).length / totalItems) * 100, 100);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <video controls className="w-full h-96 object-cover rounded-lg mb-4">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-lg mb-4">{course.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-8 mb-6">
                <div className="bg-green-500 h-8 rounded-full text-center text-xs text-white leading-8" style={{ width: `${progress}%` }}>
                  {progress.toFixed(2)}%
                </div>
              </div>
              <div className="mb-8">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-blue-400 transition duration-300">
                  Compartir curso
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300">
                  Comprar
                </button>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-left">Detalles del curso</h2>
                <div className="flex flex-wrap gap-4">
                  <p className="bg-gray-600 p-2 rounded-lg shadow">{`Nivel: ${course.level}`}</p>
                  <p className="bg-gray-600 p-2 rounded-lg shadow">{`Clases: ${course.lessons}`}</p>
                  <p className="bg-gray-600 p-2 rounded-lg shadow">{`Exámenes: ${course.exams}`}</p>
                  <p className="bg-gray-600 p-2 rounded-lg shadow">{`Duración: ${course.duration}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Contenido del curso</h2>
              {course.units.map((unit, unitIndex) => (
                <details key={unit.id} className="mb-4">
                  <summary className="cursor-pointer text-lg font-bold bg-gray-800 p-2 rounded-lg">{unit.title}</summary>
                  <ul className="pl-4 pt-2 flex flex-col items-center">
                    {unit.classes.map((cls, classIndex) => (
                      <li key={classIndex} className="py-1 flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={completedItems[unitIndex * (unit.classes.length + 1) + classIndex]}
                          onChange={() => handleCheckboxChange(unitIndex * (unit.classes.length + 1) + classIndex)}
                          className="mr-2"
                        />
                        {cls}
                      </li>
                    ))}
                    <li className="py-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={completedItems[unitIndex * (unit.classes.length + 1) + unit.classes.length]}
                        readOnly
                        className="mr-2"
                      />
                      <Link
                        to={`/course/${courseId}/unit/${unit.id}/quiz`}
                        state={{ handleQuizCompletion: true }}
                        className="text-blue-500 hover:no-underline"
                      >
                        Take Quiz
                      </Link>
                    </li>
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
