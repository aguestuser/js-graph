'use strict';

import chai from 'chai';
import { enqueue, dequeue, isEmpty } from '../../../main/collection/queue';

describe('Queue module', () => {
  chai.should();

  describe('#enquque', () => {

    it('adds an item to a queue', () => {
      enqueue([1,2,3], 4).should.eql([1,2,3,4])
    });
  });

  describe('#dequeue', () => {

    it('it returns a tuple of the first item of a queue and the remainder of the queue', () => {
      dequeue([1,2,3]).should.eql([1,[2,3]]);
    });
  });

  describe('#isEmpty', () => {

    it('returns true for an empty queue', () => {
      isEmpty([]).should.be.true;
    });

    it('returns false for a non-empty queue', () => {
      isEmpty([1,2,3]).should.be.false;
    });
  });

  describe('ordering', () => {

    it('enques and dequeus in FIFO order', () => {
      dequeue(enqueue(enqueue(enqueue([], 1), 2), 3)).should.eql([1, [2,3]]);
    });
  });
});