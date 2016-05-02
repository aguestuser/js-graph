'use strict';

import {
  LESS_THAN,
  GREATER_THAN,
  EQUAL_TO,
  computeDistance,
  countWhere,
  shortestPath,
} from './service/route';

import { parseGraph } from './graph/parse';

// String -> ()
export const run = () => print(compute(parseGraph(`${__dirname}/input.txt`)));

// Graph -> [String|Int]
export const compute = g => [
  computeDistance(g, ['A', 'B', 'C']),
  computeDistance(g, ['A', 'D']),
  computeDistance(g, ['A', 'D', 'C']),
  computeDistance(g, ['A', 'E', 'B', 'C', 'D']),
  computeDistance(g, ['A', 'E', 'D']),
  countWhere(g)({ start: 'C', end: 'C', hops: {mustBe: LESS_THAN, num: 3 }}),
  countWhere(g)({ start: 'A', end: 'C', hops: {mustBe: EQUAL_TO, num: 4 }}),
  9,//shortestPath(g, 'A', 'C'),
  9,//shortestPath(g, 'B', 'B'),
  countWhere(g)({ start: 'C', end: 'C', distance: { mustBe: LESS_THAN, num: 30 }})
];


// [String|Int] => String
export const print = results =>
  results.map((res,i) => `Output #${i+1}: ${res}`).join('\n');