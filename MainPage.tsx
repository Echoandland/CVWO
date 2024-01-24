// MainPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const MainPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/Login'); // Redirect to login page upon logout
    };
  

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
      <Link to="/TestPage">
        <button>Test</button>
      </Link>
      {user ? (
        <>
          <Link to="/AccountPage">
            <button>Account</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/Login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default MainPage;
