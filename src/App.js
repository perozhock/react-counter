// import { render } from "@testing-library/react";
// import { useEffect, useState } from "react";
import React from "react";
import TodoList from "./ToDo";
import './App.css';

class App extends React.Component {

  state = {
    count: 0,
  }


plus = () => {
  this.setState(current => ({count: current.count + 1}));
}

minus = () => {
  this.setState(current => ({count: current.count - 1}));
}

render() {
  return <div>
    <h1>Число: {this.state.count}</h1>
    <button onClick={this.plus}>+</button>
    <button onClick={this.minus}>-</button>
    <TodoList />
  </div>
  
}
}

export default App;
