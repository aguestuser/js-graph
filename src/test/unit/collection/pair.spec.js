'use strict';
import chai from 'chai';

import { pairify, objectify, first, second, compare1, compare2 } from '../../../main/collection/pair';

describe('Pair module', () => {

  chai.should();

  describe('#pairify', () => {

    it('converts an object into an array of pairs', () => {
      pairify({foo: 1, bar: 2}).should.eql([['foo', 1], ['bar', 2]])
    });
  });

  describe('#objectify', () => {

    it('converts an array of pairs into an object', () => {
      objectify([['foo', 1], ['bar', 2]]).should.eql({foo: 1, bar: 2})
    });
  });

  describe('#first', () => {

    it('returns the first element of a pair', () => {
      first(['foo', 1]).should.eql('foo');
    });
  });

  describe('#second', () => {

    it('returns the second element of a pair', () => {
      second(['foo', 1]).should.eql(1);
    });
  });

  describe('#compare1', () => {

    it("compares two pairs based on their first element", () => {
      compare1([1, 'foo'], [2, 'bar']).should.eql(-1);
    });
  });


  describe('#compare2', () => {

    it("compares two pairs based on their second element", () => {
      compare2(['foo', 1], ['bar', 2]).should.eql(-1);
    });
  });

  describe('sorting', () => {

    it('sorts an array of pairs by their second element', () => {
      [['foo', 3], ['bar', 1], ['baz', 2]].sort(compare2)
        .should.eql([['bar', 1], ['baz', 2], ['foo', 3]])
    });
  })
});