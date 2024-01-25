import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const AccountPage: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch user data
      axios.get(`/user/${user.id}`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error fetching user data:', error));

      // Fetch test results
      axios.get(`/user/${user.id}/test-results`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((response) => setTestResults(response.data))
        .catch((error) => console.error('Error fetching test results:', error));
    }
  }, [user]);

  return (
    <div>
      <h1>Account Information</h1>

      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
        </div>
      )}

      <h2>Test Results History</h2>

      {testResults.length > 0 ? (
        <ul>
          {testResults.map((result, index) => (
            <li key={index}>
              <p>Test ID: {result.id}</p>
              <p>Score: {result.score}</p>
              {/* Add more information if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No test results available.</p>
      )}
    </div>
  );
};

export default AccountPage;

