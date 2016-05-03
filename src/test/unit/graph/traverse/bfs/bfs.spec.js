'use strict';

import chai from 'chai';
import {graph as g} from '../../../../support/sampleData';
import { identity } from '../../../../../main/collection/util/function';
import { bfSearch } from '../../../../../main/graph/traverse/bfs/bfs';
import { addToPath, addToHopMap, addToDistanceMap } from '../../../../../main/graph/traverse/bfs/ops/visit';

describe('Breadth First Search', () => {

  chai.should();

  describe('#bfSearch', () => {

    it('traverses all nodes in a graph', () => {
      bfSearch(g, identity)({
        visitors: ['A'],
        visited: { A: true },
        res: {}
      }).should.eql({
        visitors: [],
        visited: { A: true, B: true, C: true, D: true, E: true},
        res: {}
      });
    });

    it('records a traversal path in BFS order', () => {
      bfSearch(g, addToPath)({
        visitors: ['A'],
        visited: { A: true },
        res: { path: ['A'] }
      }).should.eql({
        visitors: [],
        visited: { A: true, B: true, C: true, D: true, E: true},
        res: {
          path: ['A', 'B', 'D', 'E', 'C']
        }
      });
    });

    it('maps how many hops each node is from an origin', () => {
      bfSearch(g, addToHopMap)({
        visitors: ['A'],
        visited: { A: true },
        res: { hops: { A: 0 } }
      }).should.eql({
        visitors: [],
        visited: { A: true, B: true, C: true, D: true, E: true},
        res: {
          hops: { A: 0, B: 1, C: 2, D: 1, E: 1}
        }
      })
    });

    it('maps the distance from the origin to each node', () => {
      bfSearch(g, addToDistanceMap)({
        visitors: ['A'],
        visited: { A: true },
        res: { distances: { A: 0 } }
      }).should.eql({
        visitors: [],
        visited: { A: true, B: true, C: true, D: true, E: true},
        res: {
          distances: { A: 0, B: 5, C: 9, D: 5, E: 7 }
        }
      })
    });
  });
});

