import { useEffect, useState } from "react";
import "./App.css";
import User from "./components/user";
import Input from "./components/input";

function App() {
  //states for testing the fetch api
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  //states for testing user-event when counter is increased
  const [counter, setCounter] = useState(0);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((resp) => resp.json())
      .then((user) => setUser(user))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  const increment = () => {
    setCounter((prev) => ++prev);
  };

  const decrement = () => {
    setCounter((prev) => --prev);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <span data-testid="mySpan">Yokizzy</span>

      <ul className="animals">
        <li>Cat</li>
        <li>Whale</li>
        <li>Lion</li>
        <li>Elephant</li>
        <li>Rhino</li>
      </ul>

      <div>
        <h2 data-testid="counter">{counter}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>

      <Input handleChange={handleChange} inputValue={inputValue} />

      {user && <User user={user} />}
      {!user && <span>Loading...</span>}
    </div>
  );
}

export default App;
