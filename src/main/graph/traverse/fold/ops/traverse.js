'use strict';

// increment the path or distance fields of a fold's accumulator as the recursion travels down the tree from parent to child

// (GraphAcc, Edge) -> GraphAcc
export const incrementPath = (parentAcc, node) => ({
  ...parentAcc,
  path: (parentAcc.path || []).concat(node.id)
});

// (GraphAcc, Edge) -> GraphAcc
export const incrementDistance = (parentAcc, node) => ({
  ...parentAcc,
  distance: (parentAcc.distance || 0) + parseInt(node.weight)
});