'use strict';

import { parseGraph } from './graph/parse';
import * as r from './service/route';

const { LESS_THAN, EQUAL_TO } = r;

// String -> ()
export const run = () => print(compute(parseGraph(`${__dirname}/input.txt`)));

// Graph -> [String|Int]
export const compute = g => [
  r.computeDistance(g, ['A', 'B', 'C']),
  r.computeDistance(g, ['A', 'D']),
  r.computeDistance(g, ['A', 'D', 'C']),
  r.computeDistance(g, ['A', 'E', 'B', 'C', 'D']),
  r.computeDistance(g, ['A', 'E', 'D']),
  r.countWhere(g, { start: 'C', end: 'C', hops: {mustBe: LESS_THAN, num: 3 }}),
  r.countWhere(g, { start: 'A', end: 'C', hops: {mustBe: EQUAL_TO, num: 4 }}),
  r.shortestPath(g, 'A', 'C'),
  r.shortestPath(g, 'B', 'B'),
  r.countWhere(g, { start: 'C', end: 'C', distance: { mustBe: LESS_THAN, num: 30 }})
];

// [String|Int] => String
export const print = results =>
  results.map((res,i) => `Output #${i+1}: ${res}`).join('\n');