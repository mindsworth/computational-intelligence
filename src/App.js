import React, { useState } from "react";
import { MathComponent } from "mathjax-react";
import { simplify, parse } from "mathjs";
import { parseModule, transformExpression } from "./utils";
import "./styles/App.scss";
import Canvas from "./components/Canvas";

// HE2PHVKJYA
// const WolframAlphaAPI = require("wolfram-alpha-api");
// const waApi = WolframAlphaAPI("RT4G4A-HE2PHVKJYA");

function App() {
  const [expression, setExpression] = useState("3x^2");
  const [parseExpr, setParseExpr] = useState("");
  const [myGraph, setMyGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chooseComputation, setChooseComputation] = useState("native");

  console.log("expression :", expression);

  // Example POST method implementation:
  // async function postData(url = "", data = {}) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     mode: "no-cors",
  //   });
  //   console.log('response', response)
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }

  // postData("https://api.wolframalpha.com/v2/query?appid=RT4G4A-HE2PHVKJYA&input=sin%20x&output=json").then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });

  // waApi
  //   .getFull("sin x", { mode: "no-cors" })
  //   .then(console.log)
  //   .catch(console.error);

  // waApi
  //   .getFull({
  //     input: "sin(x)",
  //     output: 'json',
  //   })
  //   .then((queryresult) => {
  //     const pods = queryresult.pods;
  //     const output = pods
  //       .map((pod) => {
  //         const subpodContent = pod.subpods
  //           .map(
  //             (subpod) =>
  //               `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
  //           )
  //           .join("\n");
  //         return `<h2>${pod.title}</h2>\n${subpodContent}`;
  //       })
  //       .join("\n");
  //     console.log(output);
  //   })
  //   .catch(console.error);

  const wolfram = (x) => {
    try {
      const expr = transformExpression(expression, x);
      const f = parse(expression);
      const simplified = simplify(f);
      console.log("x :", x, simplified.toString());
      const result = simplified.evaluate({ x });
      console.log("result :<<<<<=====>>>>>", f, expr, result, x);

      return result;
    } catch (error) {
      console.log("error :", error);
    }
  };

  const nativeParsing = (x) => {
    const expr = transformExpression(expression, x);
    const result = parseModule(expr);
    console.log("expr :", expr, result, x);

    return parseModule(expr);
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
