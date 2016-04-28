/**
 *
 * TrRes is defined as follows:
 *
 * type TrRes = { routes: Array<Route> }
 * type Route = { start: string, end: string, hops: number, dist: number }
 *
 * */

// (TrRes, Route) -> TrRes
export const addToRoutes = (res, route) => ({
  ...res,
  routes: (res.routes || []).concat(route)
});

// (TrRes, Route, [Route -> Boolean]) -> TrRes
export const addToRoutesIf = (res, route, preds) =>
  satisfies(route, preds) ? addToRoutes(res, route) : res;

// (Route, [Route -> Boolean]) -> Boolean
export const satisfies = (route, preds) =>
  preds.reduce((acc, pred) => acc && pred(route), true);

// Int -> Route -> Boolean
export const hopsLessThan = n => route => route.hops < n;

// Int -> Route -> Boolean
export const distLessThan = n => route => route.dist < n;