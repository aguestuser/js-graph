'use strict';
import chai from 'chai';

import {
  groupBy,
  count,
  includes,
  last,
  sum
} from '../../../../main/collection/util/array';

describe('Array utility module', () => {
  chai.should();

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
});