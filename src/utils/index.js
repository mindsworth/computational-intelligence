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

// ^ / * - +
const parsePlusSeparatedExpression = (expression) => {
  console.log("PLUS");
  const numbersString = expression.split(expression, "+");

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
