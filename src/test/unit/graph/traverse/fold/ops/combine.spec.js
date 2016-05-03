'use strict';
import chai from 'chai';

import { combineRoutes, combineCount } from '../../../../../../main/graph/traverse/fold/ops/combine';

import { compose2 } from '../../../../../../main/collection/util/function';

describe('Fold Combine Operations', () => {

  chai.should();

  describe('combiners', () => {

    describe('combineRoutes', () => {

      it('concatenates routes fields in two accumulators', () => {
        combineRoutes({ res: { routes: [['A', 'B']] } }, { res: { routes: [['C', 'D', 'E']] } })
          .should.eql({ res: { routes: [ [ 'A', 'B'], ['C', 'D', 'E'] ] } });
      });

      it("handles empty fields", () => {
        combineRoutes({ res: {} }, { res: { routes: [['C', 'D', 'E']] } })
          .should.eql({ res: { routes: [ ['C', 'D', 'E'] ] } });
      });
    });

    describe('combineCount', () => {

      it('adds the count fields in two accumulators', () => {
        combineCount({ res: { count: 2 } },  { res: { count: 3} }).should.eql({ res: { count: 5 }});
      });


      it('handles empty fields', () => {
        combineCount({ res: { } },  { res: {} }).should.eql({ res: { count: 2 }});
        combineCount({ res: { count: 1 } },  { res: {} }).should.eql({ res: { count: 2 }});
        combineCount({ res: {} },  { res: { count: 1 } }).should.eql({ res: { count: 2 }});
      });
    });

    describe('composition', () => {

      it('passes an accumulator and node into a pipeline of incrementers', () => {

        compose2([combineCount, combineRoutes])(
          { res: {  routes: [ ['A', 'B'] ] } },
          { res: {  routes: [ ['C', 'D'] ] } }
        ).should.eql({ res: { count: 2, routes: [ ['A', 'B'], ['C', 'D'] ] } });

      });
    });
  });
});