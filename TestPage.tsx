// import React, { useState } from "react";

// const TestPage: React.FC = () => {
//   const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));
//   const [score, setScore] = useState<number | null>(null);

//   const handleAnswerSelection = (questionIndex: number, value: number) => {
//     const newAnswers = [...answers];
//     newAnswers[questionIndex] = value;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/submit-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ answers }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setScore(result.score);
//       } else {
//         console.error("Test submission failed");
//       }
//     } catch (error) {
//       console.error("Error during test submission:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Test Page</h2>
//       <p>
//         Please choose the best option after each question according to your
//         child's actual situation
//       </p>

//       {/* Render questions and answer options */}
//       {Array.from({ length: 10 }, (_, index) => (
//         <div key={index}>
//           <p>{`Question ${index + 1}: Your question goes here`}</p>
//           <label>
//             <input
//               type="radio"
//               name={`question_${index}`}
//               value={1}
//               onChange={() => handleAnswerSelection(index, 1)}
//             />
//             Completely incorrect
//           </label>
//           {/* Repeat similar structure for other answer options */}
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit</button>

//       {/* Display the test score after submission */}
//       {score !== null && (
//         <div>
//           <p>Thanks</p>
//           <p>Your score: {score}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestPage;
// 在你的 TestPage.tsx 中添加以下代码：

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const TestPage: React.FC = () => {
  const { user } = useAuth();
  const history = useNavigate();
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0)); // Initialize answers array with zeros
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include user token for authentication
        },
        body: JSON.stringify({ answers }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Test submitted successfully:", result);
        setSubmitted(true);
      } else {
        console.error("Test submission failed");
      }
    } catch (error) {
      console.error("Error during test submission:", error);
    }
  };

  const handleLogout = () => {
    // ... (与 MainPage.tsx 中的 handleLogout 方法相同)
  };

  return (
    <div>
      <h2>Behavioral Cognitive Impairment Test</h2>
      <p>
        Please choose the best option after each question according to your
        child's actual situation.
      </p>

      {/* Display test questions and answer options */}
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index}>
          <p>{`(${index + 1}) Question text goes here...`}</p>
          <div>
            {[
              "Completely Incorrect",
              "Incorrect",
              "Partially Correct",
              "Correct",
              "Completely Correct",
            ].map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  value={optionIndex + 1}
                  checked={answers[index] === optionIndex + 1}
                  onChange={() => handleAnswerChange(index, optionIndex + 1)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Display submit button if the test has not been submitted */}
      {!submitted && (
        <div>
          <button onClick={handleSubmit}>Submit Test</button>
        </div>
      )}

      {/* Display thank you message and score after test submission */}
      {submitted && (
        <div>
          <p>Thanks for completing the test!</p>
          <p>
            Your total score is:{" "}
            {answers.reduce((sum, value) => sum + value, 0)}
          </p>
        </div>
      )}

      {/* ... (与 MainPage.tsx 中的登录和注册按钮相同) */}
    </div>
  );
};

export default TestPage;
