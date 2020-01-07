import React from "react";
import Login from "./Login";
import Register from "./Register";
import './App.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <Login />
      <Register />
    </div>
  );
}

export default App;
