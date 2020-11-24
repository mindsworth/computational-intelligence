import React, { useState } from "react";
import { MathComponent } from "mathjax-react";
import { simplify, parse } from "mathjs";
import { parseModule, transformExpression } from "./utils";
import "./styles/App.scss";
import Canvas from "./components/Canvas";

function App() {
  const [expression, setExpression] = useState("3x^2");
  const [parseExpr, setParseExpr] = useState("");
  const [myGraph, setMyGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chooseComputation, setChooseComputation] = useState("native");


  const wolfram = (x) => {
    try {
      const f = parse(expression);
      const simplified = simplify(f);
      // console.log("x :", x, simplified.toString());
      const result = simplified.evaluate({ x });

      return result;
    } catch (error) {
      console.log("error :", error);
    }
  };

  const nativeParsing = (x) => {
    const expr = transformExpression(expression, x);
    const result = parseModule(expr);
    // console.log("expr :", expr, result, x);

    return result;
  };

  const handlePlot = (x) => {
    setParseExpr(expression);
    setIsLoading(true);

    // setTimeout(() => {
    myGraph.drawEquation(
      function (x) {
        return chooseComputation === "wolfram" ? wolfram(x) : nativeParsing(x);
      },
      "green",
      3
    );

    // console.log("isLoading :", isLoading);
    setIsLoading(false);
    // }, 1000);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="app-switch">
          <label
            htmlFor="native"
            className={`switch-label ${
              chooseComputation === "native" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="switch"
              value="native"
              id="native"
              onChange={(e) => setChooseComputation(e.target.value)}
            />
            Native
          </label>
          <label
            htmlFor="wolfram"
            className={`switch-label ${
              chooseComputation === "wolfram" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="switch"
              value="wolfram"
              id="wolfram"
              onChange={(e) => setChooseComputation(e.target.value)}
            />
            Wolfram
          </label>
        </div>
        <div className="input-container">
          <div className="form-input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Enter a mathematical expression"
              onChange={(e) => setExpression(e.target.value)}
            />
            <button onClick={handlePlot} className="plot-btn">
              Plot graph
            </button>
          </div>
        </div>
        <div className="content-container">
          <div className="input-expression">
            {parseExpr && (
              <>
                Input: <MathComponent tex={String.raw`${parseExpr}`} />
              </>
            )}
          </div>
          {isLoading ? (
            <div>rendering graph...</div>
          ) : (
            <Canvas
              width="1000"
              height="1000"
              plotGraph={setMyGraph}
              isRendering={parseExpr}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
