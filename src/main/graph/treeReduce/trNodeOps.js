/**
 *
 * type TrRes = { routes: Array<Route> }
 * type Path = Array<string>
 *
 * */

import { satisfies, sum, last, includes } from '../../collection/object';
import { distance } from '../../graph/distance';


// TRANSFORMERS

// TrAcc -> TrAcc
export const identity = acc => acc;

// TrAcc -> TrAcc
export const countNode = acc => ({
  ...acc,
  res: {
    ...acc.res,
    count: acc.count + 1
  }
});

// TrAcc -> TrAcc
export const addRouteIf = preds => acc =>
  satisfies(acc.path, preds) ? addRoute(acc) : acc;


// [Path -> Boolean] -> TrAcc  -> TrAcc
export const addRoute = (acc) => ({
  ...acc,
  res: {
    ...acc.res,
    routes: [acc.path]
  }
});


// PREDICATES

// Int -> Route -> Boolean
export const hopsLessThan = n => route => route.length < n;

// Graph -> Int -> Route -> Boolean
export const distLessThan = graph => n => route => distance(graph, route) < n;

// String -> Route -> Boolean
export const endIs = end => route => last(route) === end;
