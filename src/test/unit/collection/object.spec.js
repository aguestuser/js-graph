'use strict';
import chai from 'chai';

import {
  values,
  hasKey,
  hasValue,
  groupByValue,
  groupBy,
  count,
  includes,
  last,
  sum,
  satisfies
} from '../../../main/collection/object';

describe('Object module', () => {
  chai.should();

  describe('#values', () => {

    it('returns the values from an object', () => {
      values({foo: 1, bar: 2}).should.eql([1,2]);
    });
  });

  describe('#groupByValue', () => {

    it('groups the keys of an object by their values', () => {
      groupByValue({ foo: 1, bar: 1, baz: 2}).should.eql({
        1: ['foo', 'bar'],
        2: ['baz']
      })
    });
  });

  describe('#hasKey', () => {

    it('returns true if an object contains a key', () => {
      hasKey({foo: 1, bar: 2}, 'foo').should.be.true;
    });

    it('returns true if an object contains a key', () => {
      hasKey({foo: 1, bar: 2}, 'baz').should.be.false;
    });
  });

  describe('#hasValue', () => {

    it('returns true if an object contains a value', () => {
      hasValue({foo: 1, bar: 2}, 2).should.be.true;
    });

    it('returns true if an object contains a value', () => {
      hasValue({foo: 1, bar: 2}, 3).should.be.false;
    });
  });



  describe('#groupBy', () => {

    it('groups an array of items by an operation', () => {
      groupBy(['hi','yo','there'], n => n.length).should.eql({
        2: ['hi', 'yo'],
        5: ['there']
      });
    });
  });

  describe('#count', () => {

    it('counts the instances of an item in an array', () => {
      count([1,2,3,1,2,1], 1).should.eql(3);
    });

    it('returns 0 if the item is not in the array', () => {
      count([1,2,3], 'foo').should.eql(0);
    });

    it('returns 0 if the array is empty', () => {
      count([], 'foo').should.eql(0);
    });
  });

  describe('#includes', () => {

    it('returns true if an array includes an item', () => {
      includes(['foo', 'bar'], 'foo').should.be.true;
    });

    it('returns false if an array does not include an item', () => {
      includes(['foo', 'bar'], 'baz').should.be.false;
    });

    it('returns false if array is empty', () => {
      includes([], 'foo').should.be.false;
    });
  });

  describe('#last', () => {

    it('returns the last element of an array', () => {
      last([1,2,3]).should.eql(3);
    });

    it('returns undefinded for an empty array', () => {
      (last([]) === undefined).should.be.true;
    })
  });

  describe('#sum', () => {

    it('sums the elements of an array', () => {
      sum([1,2,3]).should.eql(6);
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
});

