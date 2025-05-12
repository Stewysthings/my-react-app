import React, { useState } from 'react';
import './App.css';

function App() {
  // Declaring state for message with an initial value
  const [message, setMessage] = useState('This is my first React app.');

  // Function to change the message when the button is clicked
  const changeMessage = () => {
    setMessage('You clicked the button!');
  };

  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <p>{message}</p> {/* Display the message */}
      <button onClick={changeMessage}>Click Me!</button> {/* Button to trigger state change */}
    </div>
  );
}

export default App;