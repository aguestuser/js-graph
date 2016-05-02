'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';

import {
  incrementPath,
  incrementDistance,
  combineRoutes,
  combineCount,
  addRoute,
  addRouteIf
} from '../../../../main/graph/treeFold/foldOps';

import {
  hopsLessThan,
  distanceLessThan
} from '../../../../main/graph/treeFold/foldPredicates';

import { compose2 } from '../../../../main/util/function';

describe('Tree Fold Ops module', () => {

  chai.should();
  const p = ['A', 'D', 'E', 'B', 'C'];

  describe('incrementers', () => {

    describe('incrementPath', () => {

      describe("when an accumulators `paths` fields contains an array of paths", () => {

        it("concatenates a node to the array", () => {
          incrementPath({ path: ['A']}, { id: 'B', weight: 1}).should.eql({ path: ['A', 'B']})
        });
      });

      describe("when an accumulator's `path` field is undefined", () => {

        it('adds an array containing the node to the field', () => {
          incrementPath({}, { id: 'A', weight: 1}).should.eql({ path: ['A'] })
        });
      });
    });

    describe('incrementDistance', () => {

      describe("when an accumulators `dist` fields contains a number", () => {

        it("adds a node's distance to the field", () => {
          incrementDistance({ distance: 1 }, { id: 'A', weight: 2 }).should.eql({ distance: 3 })
        });
      });

      describe("when an accumulator's `path` field is undefined", () => {

        it('adds an array containing the node to the field', () => {
          incrementDistance({}, { id: 'A', weight: '1'}).should.eql({ distance: 1 })
        });
      });
    });

    describe('composition', () => {

      it('passes an accumulator and node into a pipeline of incrementers', () => {

        compose2([incrementPath, incrementDistance])(
          { path: ['A'], distance: 1 },
          { id: 'B', weight: 2 }
        ).should.eql({ path: ['A', 'B'], distance: 3});

        compose2([incrementPath, incrementDistance])(
          {},
          { id: 'B', weight: 2 }
        ).should.eql({ path: ['B'], distance: 2});

      });
    });
  });

  describe('combiners', () => {

    describe('combineRoutes', () => {

      it('concatenates routes fields in two accumulators', () => {
        combineRoutes({ res: { routes: [['A', 'B']] } }, { res: { routes: [['C', 'D', 'E']] } })
          .should.eql({ res: { routes: [ [ 'A', 'B'], ['C', 'D', 'E'] ] } });
      });

      it("handles empty fields", () => {
        combineRoutes({ res: {} }, { res: { routes: [['C', 'D', 'E']] } })
          .should.eql({ res: { routes: [ ['C', 'D', 'E'] ] } });
      });
    });

    describe('combineCount', () => {

      it('adds the count fields in two accumulators', () => {
        combineCount({ res: { count: 2 } },  { res: { count: 3} }).should.eql({ res: { count: 5 }});
      });


      it('handles empty fields', () => {
        combineCount({ res: { } },  { res: {} }).should.eql({ res: { count: 2 }});
        combineCount({ res: { count: 1 } },  { res: {} }).should.eql({ res: { count: 2 }});
        combineCount({ res: {} },  { res: { count: 1 } }).should.eql({ res: { count: 2 }});
      });
    });

    describe('composition', () => {

      it('passes an accumulator and node into a pipeline of incrementers', () => {

        compose2([combineCount, combineRoutes])(
          { res: {  routes: [ ['A', 'B'] ] } },
          { res: {  routes: [ ['C', 'D'] ] } }
        ).should.eql({ res: { count: 2, routes: [ ['A', 'B'], ['C', 'D'] ] } });

      });
    });
  });


  describe('transformers', () => {

    describe('#addToRoutes', () => {

      it("adds a path to an accumulator's routes field", () => {
        addRoute({ path: p, res: { routes: [] } })
          .should.eql({path: p, res: { routes: [p] }});
      });
    });

    describe('#addToRoutesIf', () => {

      it('adds a route to a routes collection if it satisfies a list of predicates', () => {
        addRouteIf([hopsLessThan(6), distanceLessThan(g)(20)])({ path: p, res: { routes: [] } })
          .should.eql({ path: p, res: { routes: [p] }});
      });

      it("doesn't add the route if it doesn't satisfy one of the predicates", () => {
        addRouteIf([distanceLessThan(g)(5)])({ path: p, res: { routes: [] } })
          .should.eql({ path: p, res: { routes: [] } });
      });
    });
  });
});