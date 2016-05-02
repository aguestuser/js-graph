'use strict';

/**
 *
 * type TrRes = { routes: Array<Route> }
 * type Path = Array<string>
 *
 * */

import { satisfies } from '../../util/function';

// PARENT INCREMENTERS
// (increment parent accumulator as recursion travels down tree)

// (TrAcc, Edge) -> TrAcc
export const incrementPath = (parentAcc, node) => ({
  ...parentAcc,
  path: (parentAcc.path || []).concat(node.id)
});


// (TrAcc, Edge) -> TrAcc
export const incrementDistance = (parentAcc, node) => ({
  ...parentAcc,
  distance: (parentAcc.distance || 0) + parseInt(node.weight)
});


// CHILD COMBINERS
// (combine child accumulators as recursion returns back up tree)

// (TrAcc, Edge) -> TrAcc
export const combineRoutes = (childAcc, node) => ({
  ...childAcc,
  res: {
    ...childAcc.res,
      routes: (childAcc.res.routes || []).concat(node.res.routes || [])
    }
  });


// (TrAcc, Edge) -> TrAcc
export const combineCount = (childAcc, node) => ({
  ...childAcc,
  res: {
    ...childAcc.res,
      count: (childAcc.res.count || 1) + (parseInt(node.res.count) || 1)
    }
  });


// NODE VISITORS
// (transform the results field of a node's accumulator when the node is being visited)

// TrAcc -> TrAcc
export const addRouteIf = preds => acc =>
  satisfies(acc, preds) ? addRoute(acc) : acc;

// [Path -> Boolean] -> TrAcc  -> TrAcc
export const addRoute = (acc) => ({
  ...acc,
  res: {
    ...acc.res,
    routes: [acc.path]
  }
});