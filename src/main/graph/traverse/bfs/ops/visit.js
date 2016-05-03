'use strict';

// operations to perform on a bf-search's accumulator when a new node is being visited

// (BfAcc, Node, Edge) -> BfRes
export const addToPath = (acc, tail, head) =>  ({
  ...acc,
  res: {
    ...acc.res,
    path: acc.res.path.concat([head.id])
  }
});

// (BfAcc, Node, Edge) -> BfRes
export const addToHopMap = (acc, tail, head) => ({
  ...acc,
  res: {
    ...acc.res,
    hops: {
      ...acc.res.hops,
      [head.id]: (acc.res.hops[head.id] || 0) + parseInt(acc.res.hops[tail.id] || 0) + 1
    }
  }
});

// (BfAcc, Node, Edge) -> BfRes
export const addToDistanceMap = (acc, tail, head) => ({
  ...acc,
  res: {
    ...acc.res,
    distances: {
      ...acc.res.distances,
      [head.id]: (acc.res.distances[tail.id] || 0) + parseInt(head.weight)
    }
  }
});
