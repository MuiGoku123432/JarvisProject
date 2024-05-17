import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/say-hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  }, []);

  return <h1>{message}</h1>;
};

export default App;
