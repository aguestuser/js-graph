'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { identity, addToPath, addToHops } from '../../../../main/graph/bfs/bfNodeOps';

describe('Breadth First Graph Operations module', () => {
  chai.should();

  describe('#identity', () => {

    it('returns the result from the input accumulator', () => {
      identity({res: 'foo'}, g.A, g.B).should.eql({res: 'foo'});
    });
  });

  describe('#addToPath', () => {

    it('adds the id of the head to a path accumulator', () => {
      addToPath({path: []}, g.A, g.B).should.eql({ path: ['B'] });
    });
  });

  describe('#addToHopMap', () => {

    it('adds the head node id to a map from node ids to hops required to reach them', () => {
      addToHops({ hops: { A: 0 } }, g.A, g.B).should.eql({ hops: { A: 0, B: 1 } });
    });
  });
});