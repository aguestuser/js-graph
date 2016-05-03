'use strict';
import chai from 'chai';

import { incrementPath,incrementDistance } from '../../../../../../main/graph/traverse/fold/ops/traverse';
import { compose2 } from '../../../../../../main/collection/util/function';

describe('Fold Traversal Operations', () => {

  chai.should();

  describe('incrementPath', () => {

    describe("when an accumulators `paths` fields contains an array of paths", () => {

      it("concatenates a node to the array", () => {
        incrementPath({ path: ['A']}, { id: 'B', weight: 1}).should.eql({ path: ['A', 'B']})
      });
    });

    describe("when an accumulator's `path` field is undefined", () => {

      it('adds an array containing the node to the field', () => {
        incrementPath({}, { id: 'A', weight: 1}).should.eql({ path: ['A'] })
      });
    });
  });

  describe('incrementDistance', () => {

    describe("when an accumulators `dist` fields contains a number", () => {

      it("adds a node's distance to the field", () => {
        incrementDistance({ distance: 1 }, { id: 'A', weight: 2 }).should.eql({ distance: 3 })
      });
    });

    describe("when an accumulator's `path` field is undefined", () => {

      it('adds an array containing the node to the field', () => {
        incrementDistance({}, { id: 'A', weight: '1'}).should.eql({ distance: 1 })
      });
    });
  });

  describe('composition', () => {

    it('passes an accumulator and node into a pipeline of incrementers', () => {

      compose2([incrementPath, incrementDistance])(
        { path: ['A'], distance: 1 },
        { id: 'B', weight: 2 }
      ).should.eql({ path: ['A', 'B'], distance: 3});

      compose2([incrementPath, incrementDistance])(
        {},
        { id: 'B', weight: 2 }
      ).should.eql({ path: ['B'], distance: 2});

    });
  });
});



