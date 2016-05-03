'use strict';

// combine a fold's child accumulators as recursion returns back up the tree from child to parent

// (FoldAcc, Edge) -> FoldAcc
export const combineRoutes = (childAcc, node) => ({
  ...childAcc,
  res: {
    ...childAcc.res,
      routes: (childAcc.res.routes || []).concat(node.res.routes || [])
    }
  });


// (FoldAcc, Edge) -> FoldAcc
export const combineCount = (childAcc, node) => ({
  ...childAcc,
  res: {
    ...childAcc.res,
      count: (childAcc.res.count || 1) + (parseInt(node.res.count) || 1)
    }
  });