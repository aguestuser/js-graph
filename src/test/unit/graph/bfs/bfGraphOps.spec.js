'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { traverse, mapHops, mapNHops, init } from '../../../../main/graph/bfs/bfGraphOps';
import { identity } from '../../../../main/graph/bfs/bfNodeOps';
import { visit } from '../../../../main/graph/bfs/bfSearch';

describe('Breadth First Graph Operations module', () => {
  chai.should();



  describe("#traverse", () => {

    it('traverses all reachable nodes *once* in breadth-first order, returning the traversal path', () => {
      traverse(g, 'A').should.eql(['A', 'B', 'D', 'E', 'C']);
    });

    it('does not visit unreachable nodes', () => {
      traverse(g, 'C').should.eql(['C', 'D', 'E', 'B']);
    });
  });

  describe('#mapHops', () => {

    it('returns a map from # of hops to nodes reachable in that # hops from starting node', () => {
      mapHops(g, 'A').should.eql({ 0: ['A'], 1: ['B', 'D', 'E'], 2: ['C'] });
    });
  });


  describe('#mapNHops', () => {

    it.only('maps hops to n levels from a starting node', () => {
      mapNHops(g, 'A', 'C', 5).should.eql({});
    });
  });

  describe('helpers', () => {

    describe('#init', () => {

      it('initializes the accumulator for a BFS', () => {
        init(g, 'A', ['A'], [identity])
          .should.eql({graph: visit(g, 'A'), visitors: ['A'], res: ['A'], ops: [identity] });
      });
    });
  });
});