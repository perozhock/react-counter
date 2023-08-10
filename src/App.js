// import { render } from "@testing-library/react";
// import { useEffect, useState } from "react";
import React from "react";
import TodoList from "./ToDo";
import './App.css';
import Counter from "./Counter";
import CountdownTimer from "./CoundownTimer";

class App extends React.Component {

render() {
  return <div>
    <Counter />
    <TodoList />
    <CountdownTimer />
  </div>
  
}
}

export default App;
