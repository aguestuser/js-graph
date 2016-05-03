'use strict';
import chai from 'chai';

import { graph as g } from '../../../../support/sampleData';
import { traverse, mapHops, mapDistances } from '../../../../../main/graph/traverse/bfs/bfsManager';

describe('BFS Manager', () => {
  chai.should();

  describe("#traverse", () => {

    it('returns the bread-first order traversal path of a graph', () => {
      traverse(g, 'A').should.eql(['A', 'B', 'D', 'E', 'C']);
    });

    it('does not visit unreachable nodes', () => {
      traverse(g, 'C').should.eql(['C', 'D', 'E', 'B']);
    });
  });

  describe('#mapHops', () => {

    it('returns a map from node id to hops required to reach that node via BFS', () => {
      mapHops(g, 'A').should.eql({ A: 0, B: 1, C: 2, D: 1, E: 1});
    });
  });

  describe('#mapDistances', () => {

    it('returns a map from node id to distance required to reach that node via BFS', () => {
      mapDistances(g, 'A').should.eql({ A: 0, B: 5, C: 9, D: 5, E: 7 });
    });
  });
});