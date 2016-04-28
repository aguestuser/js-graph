'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { traverse, mapHops, init } from '../../../../main/graph/bfs/bfGraphOps';
import { identity } from '../../../../main/graph/bfs/bfNodeOps';
import { visit } from '../../../../main/graph/bfs/bfSearch';

describe('Breadth First Graph Operations module', () => {
  chai.should();

  describe('#mapHops', () => {

    it('generates a map of number of hops from a node to all other nodes in graph', () => {
      mapHops(g, 'A').should.eql({ 0: ['A'], 1: ['B', 'D', 'E'], 2: ['C'] });
    });
  });

  describe("#traverse", () => {

    it('traverses all reachable nodes *once* in breadth-first order, returning the traversal path', () => {
      traverse(g, 'A').should.eql(['A', 'B', 'D', 'E', 'C']);
    });

    it('does not visit unreachable nodes', () => {
      traverse(g, 'C').should.eql(['C', 'D', 'E', 'B']);
    });
  });

  describe('helpers', () => {

    describe('#init', () => {

      it('initializes the accumulator for a BFS', () => {
        init(g, 'A', ['A'], identity)
          .should.eql({graph: visit(g, 'A'), visitors: ['A'], res: ['A'], op: identity });
      });
    });
  });
});