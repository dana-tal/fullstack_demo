import { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(null);

  const increment = async () => {
    const res = await fetch('/api/increment');
    const data = await res.json();
    setCounter(data.counter);
  };

  const getCounter = async () => {
    const res = await fetch('/api/counter');
    const data = await res.json();
    setCounter(data.counter);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Session Counter: {counter !== null ? counter : 'Not loaded'}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={getCounter} style={{ marginLeft: 10 }}>Get Counter</button>
    </div>
  );
}

export default App;
