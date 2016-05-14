'use strict';
import chai from 'chai';

import {
  identity,
  identity2,
  compose,
  compose2,
  satisfies,
  compareNums
} from '../../../../main/collection/util/function';

describe('Function utility module', () => {
  chai.should();

  describe('identity', () => {

    it('returns its input', () => {
      identity('foo').should.eql('foo');
    });
  });

  describe('#identity2', () => {

    it('returns the second argument of a 2-arity function', () => {
      identity2('foo', 'bar').should.eql('bar');
    });
  });

  describe('#compose', () => {

    it('composes a list of functions in left to right order', () => {

      const add1 = n => n +1;
      const square = n => n * n;
      const sub1 = n => n -1;

      compose([add1, square, sub1])(2).should.eql(8);

    });
  });

  describe('#compose2', () => {

    it('composes a sequence of arity-2 functions left-to-right, currying second argument', () => {
      const add = (m, n) => m + n;
      const mult = (m, n) => m * n;

      compose2([add, mult])(2,3).should.eql(15);
    });
  });

  describe('#satisfies', () => {

    const foo = { bar: 2, baz: 2 };
    const lessThan = (n, key) => foo => foo[key] < n;

    it('returns true if an object satisfies a list of predicates', () => {
      satisfies(foo, [lessThan(3, 'bar'), lessThan(3, 'baz')]).should.be.true;
    });

    it("returns false if an satisfies no predicates in a list", () => {
      satisfies(foo, [lessThan(1, 'bar'), lessThan(1, 'baz')]).should.be.false;
    });

    it("returns false if an object satisfies some but not all predicates in a list", () => {
      satisfies(foo, [lessThan(3, 'bar'), lessThan(1, 'baz')]).should.be.false;
    });
  });

  describe('#compareInts', () => {

    describe('when first arg is greater than second arg', () => {

      it('returns a value less than zero', () => {
        compareNums(0,1).should.be.lessThan(0);
      });
    });

    describe('when first arg is less than second arg', () => {

      it('returns a value greater than zero', () => {
        compareNums(1,0).should.be.greaterThan(0);
      });
    });

    describe('when two args are equal', () => {

      it('returns zero', () => {
        compareNums(0,0).should.equal(0);
      });
    });
  });
});