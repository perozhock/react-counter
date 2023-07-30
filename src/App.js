import { render } from "@testing-library/react";
import React from "react";

class App extends React.Component {

  state = {
    count: 0
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
  </div>
}
}

export default App;
