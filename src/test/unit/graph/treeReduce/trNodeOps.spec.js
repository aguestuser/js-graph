'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';

import {
  identity,
  addRoute,
  addRouteIf,
  hopsLessThan,
  distLessThan,
  endIs,
  distance,
} from '../../../../main/graph/treeReduce/trNodeOps';

describe('Tree Traversal Node Ops module', () => {

  chai.should();
  const p = ['A', 'D', 'E', 'B', 'C'];

  describe('transformers', () => {

    describe('identity', () => {

      it('returns the accumulator it is given as input', () => {
        identity({ path: p, distance: 2, res: { routes: [], distance: 0 } })
          .should.eql({ path: p, distance: 2, res: { routes: [], distance: 0 } });
      });
    });

    describe('#addToRoutes', () => {

      it("adds a path to an accumulator's routes field", () => {
        addRoute({ path: p, res: { routes: [] } })
          .should.eql({path: p, res: { routes: [p] }});
      });
    });

    describe('#addToRoutesIf', () => {

      it('adds a route to a routes collection if it satisfies a list of predicates', () => {
        addRouteIf([hopsLessThan(6), distLessThan(g)(20)])({ path: p, res: { routes: [] } })
          .should.eql({ path: p, res: { routes: [p] }});
      });

      it("doesn't add the route if it doesn't satisfy one of the predicates", () => {
        addRouteIf([distLessThan(g)(5)])({ path: p, res: { routes: [] } })
          .should.eql({ path: p, res: { routes: [] } });
      });
    });
  });

  describe('predicates', () => {

    describe('#hopsLessThan', () => {

      it('returns true if a route has less than n hops', () => {
        hopsLessThan(6)(p).should.be.true;
      });

      it('returns false if a route has n hops', () => {
        hopsLessThan(5)(p).should.be.false;
      });

      it('returns false if a route has greater than n hops', () => {
        hopsLessThan(4)(p).should.be.false;
      });
    });

    describe('#distLessThan', () => {

      it('returns true if a route has distance less than n', () => {
        distLessThan(g)(19)(p).should.be.true;
      });

      it('returns false if a route has distance equal to n', () => {
        distLessThan(g)(18)(p).should.be.false;
      });

      it('returns false if a route has distance greater than n', () => {
        distLessThan(g)(17)(p).should.be.false;
      });
    });

    describe('#endIs', () => {

      it('returns true if a route has specified end', () => {
        endIs('C')(p).should.be.true;
      });

      it('returns false if a route does not have specified end', () => {
        endIs('foo')(p).should.be.false;
      });
    });
  });
});