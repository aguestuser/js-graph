'use strict';

// { [key: A]: B } -> [B]
export const values = o => Object.keys(o).map(k => o[k]);

// { [key: A]: B } -> { [key: B]: A }
export const groupByValue = o => groupBy(Object.keys(o), k => o[k]);

// ([A], A -> B) => { [key: B]: [A] }
export const groupBy = (arr, op=(a => a)) =>
  arr.reduce((acc, item) => {
    const key = op(item);
    return {
      ...acc,
      [key]: acc[key] ? acc[key].concat([item]) : [item]
    }
  }, {});

