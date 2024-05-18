import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/say-hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  }, []);

  const handleClick = () => {
    axios.post('http://localhost:5000/button-clicked')
      .then(response => {
        setMessage(response.data.message);
        setBgColor(response.data.color)
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  }

  return (
     <div className="container mx-auto p-4" style={{ backgroundColor: bgColor }}>
      <h1 className="text-3xl font-bold underline">{message}</h1>
      <button className="btn btn-primary mt-4" onClick={handleClick}>Change Background to White</button>
    </div>
  );
};

export default App;
