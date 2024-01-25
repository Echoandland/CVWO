// TestPage.tsx

import React, { useState } from 'react';
import axios from 'axios';

const TestPage: React.FC = () => {
  const questions = [
    "It is difficult to remember some lengthy instructions.",
    "He or she rarely seems to be able to motivate himself or herself to do something that he or she does not enjoy doing.",
    "It's hard to remember what you did in the middle of the event.",
    "A tendency to act without first thinking about the consequences",
    "It's hard to follow through on unattractive tasks unless someone promises a reward.",
    "When there are several things for him or her to do, he or she will only remember the first or last thing.",
    "When he or she is troubled by a problem, it is difficult to think of another way to solve it.",
    "When something has to be done, he or she is often distracted by other, more engaging things.",
    "It's easy to forget what someone has asked him/her to bring back. One, two, three, four, five",
    "When something special is about to happen (e.g., going out for a visit, going to a party), it is very exciting Stoked."
  ];

  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    // Calculate the total score
    const totalScore = answers.reduce((acc, answer) => acc + answer, 0);

    // Send the test results to the backend
    axios.post('/submit-test', { userID: 1, score: totalScore })
      .then((response) => {
        setScore(totalScore);
        setSubmitted(true);
      })
      .catch((error) => console.error('Error submitting test:', error));
  };

  return (
    <div>
      <h2>Behavioral Cognitive Impairment Test</h2>
      
      {!submitted ? (
        <div>
          <p>Please choose the best option after each question according to your child's actual situation:</p>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              <div>
                {[1, 2, 3, 4, 5].map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => {
                        const newAnswers = [...answers];
                        newAnswers[index] = option;
                        setAnswers(newAnswers);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>
          <p>Thanks for completing the test!</p>
          <p>Your score is: {score}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;


