'use strict';
import chai from 'chai';

import { graph as g } from '../../support/sampleData';
import { traverse, mapHops, init, identity, addToPath, addToHopMap } from '../../../main/graph/bfOps';
import { visit } from '../../../main/graph/bfSearch';

describe('Breadth First Search Operations', () => {

  chai.should();

  describe('graph ops', () => {

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

  describe('node ops', () => {

    describe('#identity', () => {

      it('returns the result from the input accumulator', () => {
        identity({res: []}, g.A, g.B).should.eql([]);
      });
    });

    describe('#addToPath', () => {

      it('adds the id of the head to a path accumulator', () => {
        addToPath({res: []}, g.A, g.B).should.eql(['B']);
      });
    });

    describe('#addToHopMap', () => {

      it('adds the head node id to a map from node ids to hops required to reach them', () => {
        addToHopMap({ res: { A: 0 } }, g.A, g.B).should.eql({ A: 0, B: 1 });
      });
    });
  });
});