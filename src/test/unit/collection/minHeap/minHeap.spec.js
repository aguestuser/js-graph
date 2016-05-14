'use strict';

import chai from 'chai';

import { heapify, extractMin, insert, remove, update, valueAt } from '../../../../main/collection/minHeap/minHeap';
import { first, second, compare2 } from '../../../../main/collection/pair';
import { identity, toString, compareNums } from '../../../../main/collection/util/function';

describe('MinHeap', () => {

  chai.should();

  describe('of integers', () => {

    describe('#minHeapify', () => {

      it('sorts integers into a min-heap', () => {
        heapify(toString,compareNums)([3, 2, 1]).should.eql({
          queue: [1, 3, 2],
          positions: { 1: 0, 3: 1, 2: 2 }
        })
      });
    });

    describe('#extractMin', () => {

      it('returns the smallest element in the queue and the new queue', () => {
        extractMin(toString,compareNums)({
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
        insert(toString,compareNums)({
          queue: [1, 3],
          positions: { 1: 0, 3: 1 }
        }, 2).should.eql({
          queue: [1, 3, 2],
          positions: { 1: 0, 3: 1, 2:2 }
        })
      });
    });

    describe('#remove', () => {

      it('removes an item from a minHeap, preserving minHeap properties', () => {
        remove(toString,compareNums)({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        }, '2').should.eql({
          queue: [1, 3],
          positions: { 1: 0, 3: 1 }
        });
      });
    });

    describe('#update', () => {

      it('updates the value of an item in a minHeap, preserving minHeap properties', () => {
        update(toString,compareNums)({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        }, '2', 4).should.eql({
          queue: [1, 3, 4],
          positions: { 1: 0, 3: 1, 4: 2 }
        });
      });
    });


    describe('#valueAt', () => {

      it('retrieves a value from the heap with the specified key', () => {
        valueAt(identity)({
          queue: [1, 2, 3],
          positions: { 1: 0, 2: 1, 3: 2 }
        }, 2).should.eql(2);
      });
    });
  });

  describe('of pairs', () => {

    const MAX = Number.MAX_SAFE_INTEGER;

    describe('#minHeapify', () => {

      it('sorts an arry of records in increasing order according to a comparison function', () => {
        heapify(first, compare2)([ ['A', MAX], ['B', 3], ['C', 2] ]).should.eql({
          queue: [['C', 2], ['A', MAX], ['B', 3]],
          positions: { C: 0, A: 1, B: 2 }
        });
      });

      describe('#extractMin', () => {

        it('returns the smallest element in the queue and the new queue', () => {
          extractMin(first, compare2)({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }).should.eql([
            ['C', 2], {
              queue: [['B', 3], ['A', MAX]],
              positions: { B: 0, A: 1}
            }
          ]);
        });
      });

      describe('#insert', () => {

        it('inserts item into a minHeap, preserving min heap properties', () => {
          insert(first, compare2)({
            queue: [['B', 3], ['A', MAX]],
            positions: { B: 0, A: 1}
          }, ['C', 2]).should.eql({
            queue: [['C', 2], ['A', MAX], ['B', 3]],
            positions: { C: 0, A: 1, B: 2 }
          });
        });
      });

      describe('#remove', () => {

        it('removes an item from a minHeap, preserving minHeap properties', () => {
          remove(first, compare2)({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }, 'B').should.eql({
            queue: [['C', 2], ['A', MAX]],
            positions: { C: 0, A: 1}
          });
        });
      });

      describe('#update', () => {

        it('updates the value of an item in a minHeap, preserving minHeap properties', () => {
          update(first, compare2)({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }, 'C', ['C', 100]).should.eql({
            queue: [['B', 3], ['A', MAX], ['C', 100]],
            positions: { B: 0, A: 1, C: 2}
          });
        });
      });

      describe('#valueAt', () => {

        it('retrieves a value from the heap with a specified key', () => {
          valueAt(second)({
            queue: [['C', 2], ['B', 3], ['A', MAX]],
            positions: { C: 0, B: 1, A: 2}
          }, 'B').should.eql(3);
        });
      });
    });
  });
});