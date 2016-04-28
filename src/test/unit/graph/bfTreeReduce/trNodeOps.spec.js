'use strict';
import chai from 'chai';

import {
  addToRoutes,
  addToRoutesIf,
  satisfies,
  hopsLessThan,
  distLessThan
} from '../../../../main/graph/treeReduce/trNodeOps';

describe('Bread First Tree Reduction Node Ops module', () => {

  chai.should();
  const r = { start: 'A', end: 'B', hops: 1, dist: 5};

  describe('#addToRoutes', () => {

    it('adds a route to a routes collection', () => {
      addToRoutes({ routes: []}, r).should.eql({routes: [r]});
    });
  });

  describe('#addToRoutesIf', () => {

    it('adds a route to a routes collection if it satisfies a list of predicates', () => {
      addToRoutesIf({ routes: []}, r, [hopsLessThan(2), distLessThan(6)]).should.eql({routes: [r]});
    });

    it("doesn't add the route if it doesn't satisfy one of the predicates", () => {
      addToRoutesIf({ routes: []}, r, [distLessThan(5)]).should.eql({routes: []});
    });
  });

  describe('#satisfies', () => {

    it('returns true if a route satisfies a list of predicates', () => {
      satisfies(r, [hopsLessThan(2), distLessThan(6)]).should.be.true;
    });

    it("returns false if a route satisfies no predicates in a list", () => {
      satisfies(r, [hopsLessThan(1), distLessThan(4)]).should.be.false;
    });

    it("returns false if a route satisfies some but not all predicates in a list", () => {
      satisfies(r, [hopsLessThan(2), distLessThan(1)]).should.be.false;
    });
  });

  describe('#hopsLessThan', () => {

    it('returns true if a route has less than n hops', () => {
      hopsLessThan(2)(r).should.be.true;
    });

    it('returns false if a route has n hops', () => {
      hopsLessThan(1)(r).should.be.false;
    });

    it('returns false if a route has greater than n hops', () => {
      hopsLessThan(0)(r).should.be.false;
    });
  });

  describe('#distLessThan', () => {

    it('returns true if a route has distance less than n', () => {
      distLessThan(6)(r).should.be.true;
    });

    it('returns false if a route has distance equal to n', () => {
      distLessThan(5)(r).should.be.false;
    });

    it('returns false if a route has distance greater than n', () => {
      distLessThan(4)(r).should.be.false;
    });
  })
});