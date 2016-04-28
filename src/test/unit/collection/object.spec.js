'use strict';
import chai from 'chai';

import { values, groupBy, groupByValue } from '../../../main/collection/object';

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

  describe('#groupBy', () => {

    it('groups an array of items by an operation', () => {
      groupBy(['hi','yo','there'], n => n.length).should.eql({
        2: ['hi', 'yo'],
        5: ['there']
      });
    });
  });
});

