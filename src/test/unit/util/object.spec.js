'use strict';
import chai from 'chai';

import {
  values,
  hasKey,
  hasValue,
  groupByValue
} from '../../../main/util/object';


describe('Object utility module', () => {
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
});

