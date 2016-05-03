'use strict';

import { distance as dist } from '../../../distance/distance';
import { last } from '../../../../collection/util/array';

// inspect a fold's accumulator to see if it satisfies the predicates that specify (1) when the fold should stop, (2) whether a route should be added to an accumulator

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
