// import { render } from "@testing-library/react";
// import { useEffect, useState } from "react";
import React from "react";
import TodoList from "./ToDo";
import './styles/App.css';
import Counter from "./Counter";
import CountdownTimer from "./CountdownTimer";
import Weather from "./weather/Weather";

class App extends React.Component {

  render() {
    return <div className="app">
      <Counter />
      <TodoList />
      <CountdownTimer />
      <Weather />
    </div>
  
  }
}

export default App;
