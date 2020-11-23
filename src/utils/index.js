// Transform Expression

export function transformExpression(expr, variable) {
  //   console.log("expr :===>>>>", expr);
  let operators = "()/*+-^";
  let newExpr = "";

  for (let i = 0; i < expr.length; i++) {
    let intChar = Number.parseInt(expr[i]);
    const isNotOperator = (char) => operators.indexOf(char) === -1;

    if (isNaN(intChar) && isNotOperator(expr[i])) {
      if (isNotOperator(expr[i - 1])) {
        newExpr += "*" + expr[i];
      } else {
        newExpr += expr[i];
      }
    } else {
      newExpr += expr[i];
    }
  }

  const str = newExpr.replace(/x/g, variable);
  console.log("newExpr ===>>>>> TRANSFORM", str);

  return str;
}

// split expression by operator considering parentheses
const split = (expression, operator) => {
  // console.log("SPLIT");
  const result = [];
  let braces = 0;
  let currentChunk = "";
  for (let i = 0; i < expression.length; ++i) {
    const curCh = expression[i];
    // console.log("here ==>>>", curCh, currentChunk);
    if (curCh === "(") {
      braces++;
      if (!isNaN(expression[i - 1])) {
        currentChunk += "*";
      }
    } else if (curCh === ")") {
      braces--;
    }
    if (braces === 0 && operator === curCh) {
      result.push(currentChunk);
      currentChunk = "";
    } else currentChunk += curCh;
  }
  if (currentChunk !== "") {
    result.push(currentChunk);
  }

  if (result[0].length === 0 && operator === "-") result[0] = "0";

  console.log("result", result, expression);
  return result;
};

// this will only take strings containing ^ operator [ no + ]
const parsePowerSeparatedExpression = (expression) => {
  console.log("POWER");
  const numbersString = split(expression, "^");
  const numbers = numbersString.map((noStr) => {
    if (noStr[0] == "(") {
      const expr = noStr.substr(1, noStr.length - 2);

      console.log("LOG+noStr", noStr, expr, noStr.length - 2, noStr.length);
      // recursive call to the main function
      return parsePlusSeparatedExpression(expr);
    }
    console.log("noStr ====>>>>", noStr);
    return +noStr;
  });

  // const numbers = numbersString.map(noStr => noStr);

  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => Math.pow(acc, no), initialValue);
  console.log("DIVISION result ====>>>>", result, numbers);
  return result;
};

// both ^ /
const parseDivisionSeparatedExpression = (expression) => {
  console.log("DIVISION");
  const numbersString = split(expression, "/");

  const numbers = numbersString.map((noStr) =>
    parsePowerSeparatedExpression(noStr)
  );

  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
  console.log("DIVISION result ====>>>>", result, numbers);
  return result;
};

// ^ / *
const parseMultiplicationSeparatedExpression = (expression) => {
  console.log("MULTIPLY");
  const numbersString = split(expression, "*");

  const numbers = numbersString.map((noStr) =>
    parseDivisionSeparatedExpression(noStr)
  );

  const initialValue = 1.0;
  const result = numbers.reduce((acc, no) => acc * no, initialValue);
  return result;
};

// ^ / * -
const parseMinusSeparatedExpression = (expression) => {
  console.log("MINUS");
  const numbersString = split(expression, "-");
  // const numbers = numbersString.map(noStr => noStr);
  const numbers = numbersString.map((noStr) =>
    parseMultiplicationSeparatedExpression(noStr)
  );
  console.log("MINUS=====numbers", numbers[0]);
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
  console.log("MiNUS result", result, numbersString);
  return result;
};

// ^ / * - +
const parsePlusSeparatedExpression = (expression) => {
  console.log("PLUS");
  const numbersString = split(expression, "+");

  // const numbers = numbersString.map(noStr => noStr);
  const numbers = numbersString.map((noStr) =>
    parseMinusSeparatedExpression(noStr)
  );
  const initialValue = 0.0;
  const result = numbers.reduce((acc, no) => acc + no, initialValue);
  console.log("RESULT=====numbers", result, numbers);
  return result;
};

export const parse = (expression) => {
  const result = parsePlusSeparatedExpression(expression, "+");
  return result;
};
