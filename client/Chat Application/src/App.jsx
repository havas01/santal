import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
function App() {
 const [socket, setSocket] = useState(null);
  const [arr, setArr] = useState([]);
  const [message, setMessage] = useState('');

  // Initialize socket connection
  useEffect(() => {
    const ns = io('http://localhost:4000');
    setSocket(ns);
    return () => {
      ns.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on('receive_message', (message) => { 
       setArr(a => [...a, message]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);
  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <>
      <div>
        <input value = {message} onChange={(e) => {
          setMessage(e.target.value);
        }}/>
        <button onClick={
          sendMessage
        }>Send Message</button>
      </div>
      <div>
      {arr.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </>
  )
}

export default App
