'use strict';

import { heapify, extractMin, update, valueAt } from '../../../collection/minHeap';
import { first, second, compare2 } from '../../../collection/pair';
import { pairify } from '../../../collection/pair';

import * as bfs from '../bfs/bfsInterface';
import * as dijkstra from './dijkstra';

const ops = {
  heapify: heapify(first, compare2),
  extractMin: extractMin(first, compare2),
  update: update(first, compare2),
  valueAt: valueAt(second)
};

export const shortestPath = (graph, start, end) => {
  const distances = ops.heapify(pairify(bfs.mapDistances(graph, start)));
  return dijkstra.shortestPath(graph, ops, end)({
    distance: 0,
    unvisited: ops.update(distances, start, [start, Number.MAX_SAFE_INTEGER])
  });
};

