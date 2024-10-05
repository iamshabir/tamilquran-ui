import React, { useState } from 'react';
import { Form, Input, Button, Message, Segment, Grid, Header, Divider } from 'semantic-ui-react';
import axios from './axios';  // Axios instance with baseURL and credentials enabled
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './Login.css'; // Custom CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use React Router's hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');  // Reset error message before making the request
    try {
      const response = await axios.post('/login', { username, password });
      
      // Save the username to localStorage
      localStorage.setItem('username', username);

      // Redirect to home page after successful login
      navigate('/home');
      
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Invalid username or password');  // Display a friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Grid centered>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment raised className="custom-segment">
            <Header as="h2" textAlign="center" className="custom-header">
              <i className="lock icon"></i> Login to Your Account
            </Header>
            <Divider />
            <Form onSubmit={handleLogin} loading={loading} error={!!errorMessage}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                className="custom-input"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                className="custom-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && <Message error header="Login Failed" content={errorMessage} />}
              <Button type="submit" color="teal" fluid size="large" className="custom-button">
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
