// { [key: A]: B } -> [[A,B]]
export const pairify = obj =>
  Object.keys(obj).map(k => [k, obj[k]]);

// [[A,B]] -> { [key: A]: B }
export const objectify = pairs =>
  pairs.reduce((acc, p) => ({...acc, [p[0]]: p[1] }),{});

// [A,B] -> A
export const first = pair => pair[0];

// [A,B] -> B
export const second = pair => pair[1];

// ([A,B],[A,B]) -> [A,B]
export const compare1 = (p1, p2) => p1[0] - p2[0];

// ([A,B],[A,B]) -> [A,B]
export const compare2 = (p1, p2) => p1[1] - p2[1];