// ([A], A -> B) => { [key: B]: [A] }
export const groupBy = (arr, op=(a => a)) =>
  arr.reduce((acc, item) => {
    const key = op(item);
    return {
      ...acc,
      [key]: acc[key] ? acc[key].concat([item]) : [item]
    }
  }, {});

// ([Any]) -> Int
export const count = (xs, a) => xs.reduce((acc, x) => x === a ? acc + 1 : acc, 0);

// ([Any]) -> Boolean
export const includes = (xs, a) => xs.indexOf(a) > -1;

// [A] -> A
export const last = xs => xs.slice(-1)[0];

// [A] -> Int
export const sum = xs => xs.reduce((acc, x) => acc + x, 0);