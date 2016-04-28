'use strict';

// { [key: A]: B } -> [B]
export const values = o => Object.keys(o).map(k => o[k]);

// { [key: A]: B } -> { [key: B]: A }
export const groupByValue = o => groupBy(Object.keys(o), k => o[k]);

// (Object, Either[String,Int]) -> Boolean
export const hasKey = (o, k) => includes(Object.keys(o), k);

// (Object, Any) -> Boolean
export const hasValue = (o,v) => includes(values(o), v);

// v --- todo: move to collection/array ? ---v

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
