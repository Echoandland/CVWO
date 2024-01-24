import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
  
    // Fetch user information and test history from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user-info", {
          method: "GET",
          // You may need to include authentication headers here if required
        });
       
      
        if (response.ok) {
          const result = await response.json();
          setUserInfo(result.userInfo);
          setTestHistory(result.testHistory);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error during user information fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Account Information</h2>

      {userInfo && (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Username: {userInfo.username}</p>
          <p>Password: ********</p>
        </div>
      )}

      <h2>Test History</h2>

      {testHistory.length > 0 ? (
        <ul>
          {testHistory.map((test, index) => (
            <li key={index}>
              <p>Date: {test.date}</p>
              <p>Score: {test.score}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No test history available</p>
      )}
    </div>
  );
};

export default AccountPage;
