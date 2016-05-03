'use strict';
import chai from 'chai';

import { graph as g } from '../../../../../support/sampleData';

import { addRoute, addRouteIf } from '../../../../../../main/graph/traverse/fold/ops/visit';
import { hopsLessThan, distanceLessThan } from '../../../../../../main/graph/traverse/fold/ops/predicate';

describe('Fold Visit Operations', () => {

  chai.should();
  const p = ['A', 'D', 'E', 'B', 'C'];

  describe('#addRoute', () => {

    it("adds a path to an accumulator's routes field", () => {
      addRoute({ path: p, res: { routes: [] } })
        .should.eql({path: p, res: { routes: [p] }});
    });
  });

  describe('#addRouteIf', () => {

    it('adds a route to a routes collection if it satisfies a list of predicates', () => {
      addRouteIf([hopsLessThan(6), distanceLessThan(g)(20)])({ path: p, res: { routes: [] } })
        .should.eql({ path: p, res: { routes: [p] }});
    });

    it("doesn't add the route if it doesn't satisfy one of the predicates", () => {
      addRouteIf([distanceLessThan(g)(5)])({ path: p, res: { routes: [] } })
        .should.eql({ path: p, res: { routes: [] } });
    });
  });
});
