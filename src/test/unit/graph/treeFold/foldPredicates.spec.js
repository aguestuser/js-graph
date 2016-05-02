'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';

import {
  hops,
  distance,
  endIs
} from '../../../../main/graph/treeFold/foldPredicates';

describe('Tree Fold predicates', () => {

  chai.should();
  const p = ['A', 'D', 'E', 'B', 'C'];

  describe('hop predicates', () => {

     describe('#equal', () => {

      it('returns false if a route has less than n hops', () => {
        //hops.equal(5)({ path: p }).should.be.false;
        hops.equal(5)({ path: p }).should.be.false;
      });

      it('returns true if a route has n hops', () => {
        hops.equal(4)({ path: p }).should.be.true;
      });

      it('returns false if a route has greater than n hops', () => {
        hops.equal(3)({ path: p }).should.be.false;
      });
    });

    describe('#lessThan', () => {

      it('returns true if a route has less than n hops', () => {
        hops.lessThan(5)({ path: p }).should.be.true;
      });

      it('returns false if a route has n hops', () => {
        hops.lessThan(4)({ path: p }).should.be.false;
      });

      it('returns false if a route has greater than n hops', () => {
        hops.lessThan(3)({ path: p }).should.be.false;
      });
    });
  });

  describe('distance predicates', () => {

    describe('#lessThan', () => {

      it('returns true if a route has distance less than n', () => {
        distance.lessThan(g)(19)({ path: p }).should.be.true;
      });

      it('returns false if a route has distance equal to n', () => {
        distance.lessThan(g)(18)({ path: p }).should.be.false;
      });

      it('returns false if a route has distance greater than n', () => {
        distance.lessThan(g)(17)({ path: p }).should.be.false;
      });
    });

    describe('#greaterThan', () => {

      it('returns false if a route has distance less than n', () => {
        distance.greaterThan(g)(19)({ path: p }).should.be.false;
      });

      it('returns false if a route has distance equal to n', () => {
        distance.greaterThan(g)(18)({ path: p }).should.be.false;
      });

      it('returns false if a route has distance greater than n', () => {
        distance.greaterThan(g)(17)({ path: p }).should.be.true;
      });
    });
  });

  describe('#endIs', () => {

    it('returns true if a route has specified end', () => {
      endIs('C')({ path: p }).should.be.true;
    });

    it('returns false if a route does not have specified end', () => {
      endIs('foo')({ path: p }).should.be.false;
    });
  });

});