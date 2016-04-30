'use strict';

import chai from 'chai';

import { graph as g } from '../../../support/sampleData';
import { traverse } from '../../../../main/graph/treeReduce/treeReduce';
import { countNode, addRouteIf, endIs } from '../../../../main/graph/treeReduce/trNodeOps';

describe('Tree Reduction module', () => {

  chai.should();
  const hopsEqual = n => acc => acc.path.length > n;
  //const hopsEqual = n =>

  describe('#traverse', () => {

    it('traverses a graph until a predicate is satisfied, performing an operation at each node', () => {

      const preds = [hopsEqual(4)];
      const op = addRouteIf([endIs('C')]);
      const acc0 = { path: ['A'], res: { routes: [] } };

      traverse(g, preds, op)('A', acc0).should.eql({
        res: {
          routes:  [
            [ 'A', 'B', 'C' ],
            [ 'A', 'B', 'C', 'D', 'C' ],
            [ 'A', 'D', 'C' ],
            [ 'A', 'D', 'C', 'D', 'C' ],
            [ 'A', 'D', 'E', 'B', 'C' ],
            [ 'A', 'E', 'B', 'C' ]
          ]
        }
      })
    });
  });
});
