'use strict';

import { satisfies } from '../../../../collection/util/function';

// transform the results field of a node's accumulator when the node is being visited

// FoldAcc -> GraphAcc
export const addRouteIf = preds => acc =>
  satisfies(acc, preds) ? addRoute(acc) : acc;

// [Path -> Boolean] -> FoldAcc -> FoldAcc
export const addRoute = (acc) => ({
  ...acc,
  res: {
    ...acc.res,
    routes: [acc.path]
  }
});