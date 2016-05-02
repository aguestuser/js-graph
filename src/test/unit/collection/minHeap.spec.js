'use strict';

import chai from 'chai';

import { heapify, extractMin, insert, remove } from '../../../main/collection/minHeap';
import { first, compare2 } from '../../../main/collection/pair';

describe('MinHeap', () => {

  chai.should();

  describe('of integers', () => {

    describe('#minHeapify', () => {

      it('sorts integers in increasing order', () => {
        heapify([3, 2, 1]).should.eql({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        })
      });
    });

    describe('#extractMin', () => {

      it('returns the smallest element in the queue and the new queue', () => {
        extractMin({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        }).should.eql([
          1,{
            queue: [2, 3],
            positions: { 2: 0, 3: 1 }
          }
        ])
      })
    });

    describe('#insert', () => {

      it('inserts item into a minHeap, preserving min heap properties', () => {
        insert(2,{
          queue: [1, 3],
          positions: { 1: 0, 3: 1 }
        }).should.eql({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        })
      });
    });

    describe('#delete', () => {

      it('deletes an item from a minHeap, preserving minHeap properties', () => {
        remove(2, {
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        }).should.eql({
          queue: [1, 3],
          positions: { 1: 0, 3: 1 }
        });
      });
    });
  });

  describe('of pairs', () => {

    const MAX = Number.MAX_SAFE_INTEGER;

    describe('#minHeapify', () => {

      it('sorts an arry of records in increasing order according to a comparison function', () => {
        heapify([ ['A', MAX], ['B', 3], ['C', 2] ], first, compare2).should.eql({
          queue: [['C', 2], ['B', 3], ['A', MAX]],
          positions: { C: 0, B: 1, A: 2}
        });
      });

      describe('#extractMin', () => {

        it('returns the smallest element in the queue and the new queue', () => {
          extractMin({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }, first, compare2).should.eql([
            ['C', 2], {
              queue: [['B', 3], ['A', MAX]],
              positions: { B: 0, A: 1}
            }
          ]);
        })
      });

      describe('#insert', () => {

        it('inserts item into a minHeap, preserving min heap properties', () => {
          insert(['C', 2], {
            queue: [['B', 3], ['A', MAX]],
            positions: { B: 0, A: 1}
          }, first, compare2).should.eql({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          });
        });
      });

      describe('#delete', () => {

        it('deletes an item from a minHeap, preserving minHeap properties', () => {
          remove(['B', 2], {
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }, first, compare2).should.eql({
            queue: [['C', 2], ['A', MAX]],
            positions: { C: 0, A: 1}
          });
        });
      });
    });
  });
});