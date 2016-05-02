// A -> A
export const identity = a => a;

// (A,B) -> B
export const identity2 = (a, b) => b;

// [A -> B] -> B
export const compose = funcs => arg =>
  funcs.reduce((acc, func) => func(acc), arg);

// [(A, B) -> C] -> C
export const compose2 = funcs => (arg1, arg2) =>
  funcs.reduce((acc_, func) => func(acc_, arg2), arg1);

// (A, [A -> Boolean] -> Boolean
export const satisfies = (obj, preds) =>
  preds.reduce((acc, pred) => acc && pred(obj), true);