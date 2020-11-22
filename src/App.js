import React, { useState } from "react";
import { MathComponent } from "mathjax-react";
import { simplify, parse, evaluate, format } from "mathjs";
import { evaluateExpression, transformExpression } from "./utils";
import "./styles/App.scss";
import Canvas from "./components/Canvas";

function App() {
  const [expression, setExpression] = useState("3x^2");
  const [parseExpr, setParseExpr] = useState("");
  const [myGraph, setMyGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("expression :", expression);

  const handlePlot = (x) => {
    setParseExpr(expression);
    setIsLoading(true);

    // setTimeout(() => {
    myGraph.drawEquation(
      function (x) {
        try {
          const f = parse(expression);
          const simplified = simplify(f);
          console.log("x :", x, simplified.toString());
          const result = simplified.evaluate({ x });
          console.log("result :<<<<<=====>>>>>", result);

          return result;
        } catch (error) {
          console.log("error :", error);
        }
      },
      "green",
      3
    );

    console.log("isLoading :", isLoading);
    setIsLoading(false);
    // }, 1000);
  };

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <div className="container">
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
