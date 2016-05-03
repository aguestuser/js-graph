'use strict';

import * as distance from '../graph/distance/distance';
import * as fold from '../graph/traverse/fold/foldManager';
import * as dijkstra from '../graph/traverse/dijkstra/dijkstraManager';

// CONSTANTS
export const EQUAL_TO = fold.EQUAL_TO;
export const GREATER_THAN = fold.GREATER_THAN;
export const LESS_THAN = fold.LESS_THAN;

// (Graph, [Node]) -> Either[String,Int]
export const computeDistance = (graph, route) =>
  distance.distance(graph, route);

// (Int, Graph, String, String) -> Int
export const countWhere = (graph, specs) =>
  fold.countWhere(graph, specs);

// (Graph, String, String) -> Int
export const shortestPath  = (graph, start, end) =>
  dijkstra.shortestPath(graph, start, end);