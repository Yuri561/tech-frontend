import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  questions: Question[];
}

interface MultipleChoiceQuizProps {
  quiz: Quiz;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ quiz, setScore }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div className="quiz-content bg-gray-800 p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">Safety Quiz</h3>
      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-6">
          <p className="mb-2">{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="radio"
                id={`question-${questionIndex}-option-${optionIndex}`}
                name={`question-${questionIndex}`}
                value={optionIndex}
                checked={selectedAnswers[questionIndex] === optionIndex}
                onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                className="mr-2"
              />
              <label htmlFor={`question-${questionIndex}-option-${optionIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
      {showResults && (
        <div className="results mt-6">
          <h4 className="text-lg font-semibold">Quiz Results</h4>
          <p>You scored {selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} out of {quiz.questions.length}</p>
          {quiz.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <p className="font-semibold">{question.question}</p>
              <p className={`font-semibold ${selectedAnswers[questionIndex] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                {selectedAnswers[questionIndex] === question.correctAnswer ? 'Correct' : 'Incorrect'}
              </p>
              <p>Correct answer: {question.options[question.correctAnswer]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceQuiz;
