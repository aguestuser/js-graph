'use strict';

import chai from 'chai';

import { graph as g } from '../../../../support/sampleData';
import { shortestPath } from '../../../../../main/graph/traverse/dijkstra/dijkstraManager';

describe("Dijkstra's Algorithm Manager", () => {

  chai.should();

  describe('#shortestPath', () => {

    it('returns the shortest path between two nodes', () => {
      shortestPath(g, 'A', 'C').should.eql(9);
    });

    it('returns the shortest path between a node and itself', () => {
      shortestPath(g, 'B', 'B').should.eql(9);
    });
  });
});
