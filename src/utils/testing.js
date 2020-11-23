// Stack datastructure implementation]
function Stack(size) {
  this.items = [];

  this.push = function (item) {
    this.items.push(item);
  };

  this.pop = function () {
    if (this.items.length === 0) {
      return "Nothing to pop";
    }
    this.items.pop();
  };

  this.top = function () {
    return this.items[this.items.length - 1];
  };

  this.isEmpty = function () {
    return this.items.length === 0;
  };

  this.printStack = function () {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + "";
    }
    return str;
  };
}

let stack = new Stack();

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

// Convert infix to Postfix expression

function infixToPostfix(expr) {
  let operators = "()/*+-^";
  const parentheses = "()";
  let addSign = false;

  function hasHigherPrecedence(target, operator) {
    const hash = {};
    for (let i = 0; i < operators.length; i++) {
      hash[operators[i]] = i;
    }
    return hash[operator] > hash[target];
  }

  let stack = new Stack();
  let newExpr = "";
  let variableType = "";

  for (let i = 0; i < expr.length; i++) {
    const isNotOperator = (char) => operators.indexOf(char) === -1;

    // console.log('stack', stack.items, expr[i], isNotOperator(expr[i]), newExpr);

    if (isNotOperator(expr[i])) {
      if (stack.top() === "^") {
        newExpr += stack.top();
        newExpr += expr[i];
        stack.pop();
      } else if (stack.top() === ")") {
        newExpr += "*";
        newExpr += expr[i];
        stack.pop();
      } else {
        newExpr += expr[i];
      }
    } else if (expr[i] === ")") {
      if (addSign) {
        newExpr += "*";
        addSign = false;
      }

      while (!stack.isEmpty() && stack.top() !== "(") {
        newExpr += stack.top();
        stack.pop();
      }

      if (stack.top() === "(") {
        stack.pop();
      }

      if (expr[expr.length - 1] !== expr[i]) stack.push(expr[i]);
    } else if (expr[i] === "^") {
      stack.push(expr[i]);
    } else {
      if (!stack.isEmpty() && expr[i] === "(" && isNotOperator(expr[i - 1])) {
        addSign = true;
      }

      if (
        expr[i] === "-" &&
        isNotOperator(expr[i + 1]) &&
        (expr[i - 1] === undefined || !isNotOperator(expr[i - 1]))
      ) {
        // console.log('Unary Minus', expr[i + 1], isNotOperator(expr[i - 1]));
        newExpr += "_";
      } else {
        if (!stack.isEmpty() && hasHigherPrecedence(stack.top(), expr[i])) {
          if (!parentheses.includes(stack.top())) {
            newExpr += stack.top();
          }
          stack.pop();
        }

        stack.push(expr[i]);
      }

      // if(expr[i] === '(') stack.push(expr[i])
    }
  }
  while (!stack.isEmpty()) {
    if (!parentheses.includes(stack.top())) newExpr += stack.top();
    stack.pop();
  }

  return newExpr;
}

function postFixCalculator(expr) {
  let stack = new Stack();
  let res = 0;
  let oprs = "()/*+-^#";
  let isUnary = false;
  const calculate = (lhs, rhs, opr) => {
    // console.log('opr===>>>>', opr, rhs);
    switch (opr) {
      case "+":
        return lhs + rhs;
      case "*":
        return lhs * rhs;
      case "/":
        return lhs / rhs;
      case "-":
        return lhs - rhs;
      case "^":
        return Math.pow(lhs, rhs);
      // case '#':
      //   // console.log('rhs', rhs);
      //   if (rhs < 0) {
      //     const temp = 'Square root of a negative number.';
      //     throw temp;
      //   } else {
      //     return Math.sqrt(rhs);
      //   }
      default:
        return 0;
    }
  };

  // console.log(typeof(calculate))

  for (let i = 0; i < expr.length; i++) {
    // console.log('Stack ====>>>>>', expr[i], stack.items);
    if (oprs.indexOf(expr[i]) === -1) {
      if (expr[i] === "_") {
        // console.log('Here ====>>>>>');
        isUnary = true;
      } else {
        let intChar = Number.parseInt(expr[i]);

        if (isUnary) {
          intChar = -1 * intChar;
          isUnary = false;
        }
        stack.push(intChar);
      }
    } else if (stack.items.length === 1) {
      if (expr[i] === "-") stack.push(-1 * stack.top());
    } else {
      let rhs = stack.top();
      stack.pop();
      let lhs = stack.top();
      stack.pop();
      res = calculate(lhs, rhs, expr[i]);
      stack.push(res);
    }
  }

  //   console.log("postFixCalculator >>>>>", stack.top());

  return stack.top();
}

export const evaluateExpression = (str, variable) => {
  const expr = transformExpression(str, variable);
//   console.log("expr :", expr);
  const result = infixToPostfix(expr);
    // console.log("infixToPostfix >>>>", result);
  return postFixCalculator(result);
};
