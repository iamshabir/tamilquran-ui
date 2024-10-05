import React, { useEffect, useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from localStorage
    const loggedInUsername = localStorage.getItem('username');
    if (loggedInUsername) {
      setUsername(loggedInUsername);
    }
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default Home;
