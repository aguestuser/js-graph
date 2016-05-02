'use strict';
import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { addToPath, addToHops } from '../../../../main/graph/bfSearch/bfNodeOps';

describe('Breadth First Node Operations module', () => {
  chai.should();

  describe('#addToPath', () => {

    it('adds the id of the head to a path accumulator', () => {
      addToPath({path: []}, g.A, g.B).should.eql({ path: ['B'] });
    });
  });

  describe('#addToHopMap', () => {

    it('adds the head node id to a map from node ids to hops required to reach them', () => {
      addToHops({ hops: { A: [0] } }, g.A, g.B).should.eql({ hops: { A: [0], B: [1] } });
    });
  });
});