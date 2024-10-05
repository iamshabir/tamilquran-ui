import React, { useState } from 'react';
import { Form, Input, Button, Message, Segment } from 'semantic-ui-react';
import axios from './axios';  // Axios instance with baseURL and credentials enabled

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');  // Reset any previous error message
    try {
      const response = await axios.post('/signup', { username, password });
      alert(response.data);  // Display the server response
    } catch (error) {
      console.error('Error during signup', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else {
        setErrorMessage('An error occurred during signup.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment raised>
      <Form onSubmit={handleSignup} loading={loading} error={!!errorMessage}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Username"
          value={username}
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <Message error header="Signup Failed" content={errorMessage} />}
        <Button type="submit" color="blue" fluid size="large">
          Sign Up
        </Button>
      </Form>
    </Segment>
  );
};

export default Signup;
