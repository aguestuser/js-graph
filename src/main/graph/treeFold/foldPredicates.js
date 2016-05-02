import { distance as dist } from '../../graph/distance';
import { last } from '../../util/array';


// TrAcc -> Boolean
export const hopsEqual = n => acc => acc.path.length === n + 1;

// Int -> TrAcc -> Boolean
export const hopsLessThan = n => acc => acc.path.length <= n;

// Graph -> Int -> TrAcc -> Boolean
export const distanceLessThan = graph => n => acc => dist(graph, acc.path) < n;

// Graph -> Int -> TrAcc -> Boolean
export const distanceGreaterThan = graph => n => acc => dist(graph, acc.path) > n;

// String -> TrAcc -> Boolean
export const endIs = end => acc => last(acc.path) === end;

// caller interface:

export const hops =  { equal: hopsEqual , lessThan: hopsLessThan };
export const distance = { lessThan: distanceLessThan, greaterThan: distanceGreaterThan };
