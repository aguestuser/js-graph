'use strict';
import chai from 'chai';

import { graph as g } from '../../../../../support/sampleData';
import { addToPath, addToHopMap, addToDistanceMap } from '../../../../../../main/graph/traverse/bfs/ops/visit';

describe('BFS Visit Operations', () => {

  chai.should();

  describe('#addToPath', () => {

    it('adds the id of the head to a path accumulator', () => {
      addToPath({ res: { path: []}}, g.A, g.B)
        .should.eql({ res: { path: ['B']}});
    });
  });

  describe('#addToHopMap', () => {

    it('adds the head node id to a map from node ids to hops required to reach them', () => {
      addToHopMap({ res: { hops: { A: 0 } } }, g.A, g.B)
        .should.eql({ res: { hops: { A: 0, B: 1 } } });
    });
  });

  describe('#addToDistanceMap', () => {

    it('adds the head node id to a map from node ids to distance required to reach them', () => {
      addToDistanceMap({ res: { distances: { A: 0 } } }, g.A, g.A.edges.B)
        .should.eql({ res: { distances: { A: 0, B: 5 } } });
    });
  });

});