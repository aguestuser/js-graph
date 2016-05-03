'use strict';

import { bfSearch } from './bfs';
import { addToPath, addToHopMap, addToDistanceMap } from './ops/visit';

// (Graph, string) => Array<string>
export const traverse = (g, id) =>
  bfSearch(g, addToPath)({
    visitors: [id],
    visited: { [id]: true },
    res: { path: [id]}
  }).res.path;

// (Graph, string) => { [key: String]: number }
export const mapHops = (g, id) =>
  bfSearch(g, addToHopMap)({
    visitors: [id],
    visited: { [id]: true },
    res: { hops: { [id]: 0 }}
  }).res.hops;

// (Graph, string) => { [key: String]: number }
export const mapDistances = (g, id) =>
  bfSearch(g, addToDistanceMap)({
    visitors: [id],
    visited: { [id]: true },
    res: { distances: { [id]: 0 }}
  }).res.distances;


