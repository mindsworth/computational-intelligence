import React, { useState } from "react";
import { MathComponent } from "mathjax-react";
import "./styles/App.scss";
import Canvas from "./components/Canvas";

function App() {
  const [expression, setExpression] = useState("");
  console.log("expression :", expression);
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <div className="container">
        <div className="input-container">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a mathematical expression"
            onChange={(e) => setExpression(e.target.value)}
          />
          <div className="input-expression">
            <MathComponent tex={String.raw`${expression}`} />
          </div>
        </div>
        <div className="content-container">
          <Canvas width="1000" height="1000" expression={expression} />
        </div>
      </div>
    </div>
  );
}

export default App;
