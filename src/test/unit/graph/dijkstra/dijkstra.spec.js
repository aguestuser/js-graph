'use stric';

import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { shortestPath } from '../../../../main/graph/dijkstra/dijkstra';
import { heapify, extractMin, insert, remove, valueAt } from '../../../../main/collection/minHeap';
import { first, second, compare2 } from '../../../../main/collection/pair';

describe("Dijkstra's Algorithm module", () => {

  chai.should();

  describe('#shortestPath', () => {

      const ops = {
        heapify: heapify(first, compare2),
        extractMin: extractMin(first, compare2),
        insert: insert(first, compare2),
        remove: remove(first, compare2),
        valueAt: valueAt(second)
      };

    it('returns the length of the shortest path between two nodes', () => {

      const acc0 = {
        distance: 0,
        unvisited: ops.heapify([
          [ 'A', Number.MAX_SAFE_INTEGER ],
          [ 'B', 5 ],
          [ 'C', 9 ],
          [ 'D', 5 ],
          [ 'E', 7 ]
        ])
      };

      shortestPath(g, ops, 'C')(acc0).should.eql(9);
    });

    it('returns the length of the shortest path between a node and itself', () => {

      const acc0 = {
        distance: 0,
        unvisited: ops.heapify([
          [ 'B', Number.MAX_SAFE_INTEGER ],
          [ 'C', 4 ],
          [ 'D', 12 ],
          [ 'E', 6 ]
        ], first, compare2)
      };

      shortestPath(g, ops, 'B')(acc0).should.eql(9);

    });
  });
});