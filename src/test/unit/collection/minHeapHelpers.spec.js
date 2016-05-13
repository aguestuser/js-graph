'use strict';

import chai from 'chai';

import {
  bubbleUp,
  siftDown,
  parent,
  children,
  swap,
  swapQueue,
  swapMap
} from '../../../main/collection/minHeapHelpers';

import { identity } from '../../../main/collection/util/function';

describe('MinHeap', () => {

  chai.should();

  describe('helpers', () => {

    const compare = (a,b) => a - b;

    describe('#siftDown', () => {

      describe('an element at the top of the heap', () => {

        describe('smaller than all elements below it', () => {

          it("sifts to the bottom of the heap", () => {
            siftDown(identity,compare)({
              queue: [12, 4,5, 8,9,10,11],
              positions: { 12:0, 4:1, 5:2, 8:3, 9:4, 10:5, 11:6 }
            }, 0).should.eql({
              queue: [4, 8,5, 12,9,10,11],
              positions: { 4:0, 8:1, 5:2, 12:3, 9:4, 10:5, 11:6 }
            });
          });
        });

        describe('smaller than some elements below it', () => {

          it("sifts to the middle of the heap", () => {
            siftDown(identity,compare)({
              queue: [6, 4,5, 8,9,10,11],
              positions: { 6:0, 4:1, 5:2, 8:3, 9:4, 10:5, 11:6 }
            }, 0).should.eql({
              queue: [4, 6,5, 8,9,10,11],
              positions: { 4:0, 6:1, 5:2, 8:3, 9:4, 10:5, 11:6 }
            });
          });
        });

        describe('smaller than no elements below it', () => {

          it("doesn't move", () => {
            siftDown(identity,compare)({
              queue: [1, 4,5, 8,9,10,11],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 11:6 }
            }, 0).should.eql({
              queue: [1, 4,5, 8,9,10,11],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 11:6 }
            });
          });
        });
      });
    });

    describe('#bubbleUp', () => {

      describe('an element at the bottom of the heap', () => {

        describe('smaller than all elements above it', () => {

          it('bubbles to the top of the heap', () => {
            bubbleUp(identity,compare)({
              queue: [1, 4,5, 8,9,10,0],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 0:6 }
            }, 6).should.eql({
              queue: [0, 4,1, 8,9,10,5],
              positions: { 0:0, 4:1, 1:2, 8:3, 9:4, 10:5, 5:6 }
            });
          });
        });

        describe('smaller than some elements above it', () => {

          it('bubbles to the middle of the heap', () => {
            bubbleUp(identity,compare)({
              queue: [1, 4,5, 8,9,10,3],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 3:6 }
            }, 6).should.eql({
              queue: [1, 4,3, 8,9,10,5],
              positions: { 1:0, 4:1, 3:2, 8:3, 9:4, 10:5, 5:6 }
            });
          });
        });


        describe('smaller than no elements above it', () => {

          it("doesn't move", () => {
            bubbleUp(identity,compare)({
              queue: [1, 4,5, 8,9,10,100],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 100:6 }
            }, 6).should.eql({
              queue: [1, 4,5, 8,9,10,100],
              positions: { 1:0, 4:1, 5:2, 8:3, 9:4, 10:5, 100:6 }
            });
          });
        });
      });
    });

    describe('#helpers', () => {
      describe('#swap', () => {

        it('swaps two elements in a heap', () => {
          swap({
            queue: [1, 2, 3],
            positions: { 1: 0, 2: 1, 3: 2 }
          },0,1).should.eql({
            queue: [2,1,3],
            positions: { 2: 0, 1: 1, 3: 2 }
          });
        });
      });

      describe('#swapQueue', () => {

        it('swaps two elements in an array', () => {
          swapQueue([1,2,3,4,5], 2,3).should.eql([1,2,4,3,5]);
        });
      });

      describe('#swapMap', () => {

        it('swaps two elements in a map', () => {
          swapMap(
            {'foo': 1, 'bar': 2},
            ['foo', 1],
            ['bar', 2]
          ).should.eql({'foo': 2, 'bar': 1});
        });
      });

      describe('#parent', () => {

        describe('when child index is even', () => {

          it('returns the index of the parent', () => {
            parent(2).should.eql(0);
            parent(4).should.eql(1);
          });
        });
        describe('when child index is odd', () => {

          it('returns the index of the parent', () => {
            parent(1).should.eql(0);
            parent(3).should.eql(1);
          });
        });
      });

      describe('#children', () => {

        describe('when parent index is 0', () => {

          it('returns the pair of indexes of the children', () => {
            children(0).should.eql([1,2]);
          });
        });
        describe('when parent index is > 0', () => {

          it('returns the pair of indexes of the children', () => {
            children(1).should.eql([3,4]);
          });
        });
      });
    });
  });
});