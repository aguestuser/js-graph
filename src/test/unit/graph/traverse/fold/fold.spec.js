'use strict';

import chai from 'chai';

import { graph as g } from '../../../../support/sampleData';

import { identity, compose2 } from '../../../../../main/collection/util/function';
import { incrementPath, incrementDistance } from '../../../../../main/graph/traverse/fold/ops/traverse';
import { combineCount, combineRoutes, } from '../../../../../main/graph/traverse/fold/ops/combine';
import { addRoute, addRouteIf } from '../../../../../main/graph/traverse/fold/ops/visit';
import { hops, distance, endIs } from '../../../../../main/graph/traverse/fold/ops/predicate';

import { fold } from '../../../../../main/graph/traverse/fold/fold';

describe('Tree Fold module', () => {

  chai.should();

  describe('#fold', () => {

    it("performs a tree traversal of a graph until a set of predicates are satisfied, performing an operation at each node, and combining the results", () => {

      const ops = {
        done: [hops.equal(2)],
        visit: identity,
        increment: incrementPath,
        combine: combineCount
      };

      const acc0 = { path: ['C'], res: {} };

      fold(ops)(g, 'C', acc0).should.eql({ path: ['C'], res: { count:  6 }})
    });

    it("adds routes to a collection of routes at each node", () => {

      const ops = {
        done: [hops.equal(2)],
        visit: addRoute,
        increment: incrementPath,
        combine: combineRoutes
      };

      fold(ops)(g, 'C', { path: ['C'], res: {} }).should.eql({
        path: ['C'],
        res: {
          routes:  [
            [ 'C' ],
            [ 'C', 'D' ],
            [ 'C', 'D', 'C' ],
            [ 'C', 'D', 'E' ],
            [ 'C', 'E'],
            [ 'C', 'E', 'B']
          ]
        }
      })
    });

    it('finds routes to a destination with a specified number of hops', () => {

      const ops = {
        done: [hops.equal(4)],
        visit: addRouteIf([endIs('C'), hops.equal(4)]),
        increment: incrementPath,
        combine: combineRoutes
      };

      fold(ops)(g, 'A', { path: ['A'], res: {} }).should.eql({
        path: ['A'],
        res: {
          routes:  [
            [ 'A', 'B', 'C', 'D', 'C' ],
            [ 'A', 'D', 'C', 'D', 'C' ],
            [ 'A', 'D', 'E', 'B', 'C' ]
          ]
        }
      })
    });

    it('finds routes to a destination with less hops a than a specified number', () => {

      const ops = {
        done: [hops.equal(3)],
        visit: addRouteIf([endIs('C'), hops.lessThan(4)]),
        increment: incrementPath,
        combine: combineRoutes
      };

      fold(ops)(g, 'C', { path: ['C'], res: {} }).should.eql({
        path: ['C'],
        res: {
          routes: [ ['C'], [ 'C', 'D', 'C'], [ 'C', 'E', 'B', 'C'] ]
        }
      })
    });

    it('finds routes to a destination with a distance less than a specified number', () => {

      const ops = {
        done: [distance.greaterThan(g)(30)],
          visit: addRouteIf([endIs('C'), distance.greaterThan(g)(0), distance.lessThan(g)(30)]),
        increment: compose2([incrementPath, incrementDistance]),
        combine: combineRoutes
      };

      fold(ops)(g, 'C', { path: ['C'], res: {}}).should.eql({
        path: ['C'],
        res: {
          routes: [
            ["C", "D", "C"],
            ["C", "D", "C", "E", "B", "C"],
            ["C", "D", "E", "B", "C"],
            ["C", "E", "B", "C"],
            ["C", "E", "B", "C", "D", "C"],
            ["C", "E", "B", "C", "E", "B", "C"],
            ["C", "E", "B", "C", "E", "B", "C", "E", "B", "C"]
          ]
        }
      });
    });
  });
});