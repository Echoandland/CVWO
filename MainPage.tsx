// MainPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>
        Our platform provides questionnaire assessment services for children
        with behavioral cognitive impairment. Each registered customer will
        have their own account for recording assessment reports. The assessment
        system adopts the mode of answering questions and gives diagnostic reports
        and suggestions according to the situation of answering questions.
      </p>
      <Link to="/test">Test</Link>
      <Link to="/account">Account</Link>
    </div>
  );
};

export default MainPage;
