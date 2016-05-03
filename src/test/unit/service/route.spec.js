'use strict';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


import * as route from '../../../main/service/route';
import * as distance from '../../../main/graph/distance/distance';
import * as fold from '../../../main/graph/traverse/fold/foldManager';
import * as dijkstra from '../../../main/graph/traverse/dijkstra/dijkstraManager';

import { graph as g } from '../../support/sampleData';

describe('Route Service', () => {
  
  chai.should();
  chai.use(sinonChai);

  const { LESS_THAN } = route;
  let distanceSpy, countWhereSpy, shortestPathSpy;

  before(() => {
    distanceSpy = sinon.stub(distance, 'distance');
    countWhereSpy = sinon.stub(fold, 'countWhere');
    shortestPathSpy = sinon.stub(dijkstra, 'shortestPath');
  });

  after(() => {
    distanceSpy.restore();
    countWhereSpy.restore();
    shortestPathSpy.restore();
  });

  describe('#computeDistance', () => {

    it('delegates to distance module', () => {
      route.computeDistance(g, 'A');
      distanceSpy.should.have.been.calledWith(g, 'A');
    });
  });

  describe('#countWhere', () => {

    it('delegates to fold module', () => {
      const specs = {
        start: 'C',
        end:'C',
        hops: {mustBe: LESS_THAN, num: 3}
      };
      route.countWhere(g, specs);
      countWhereSpy.should.have.been.calledWith(g, specs);
    });
  });

  describe('#shortestPath', () => {

    it('delegates to dijkstra module', () => {
      route.shortestPath(g, 'A', 'B');
      shortestPathSpy.should.have.been.calledWith(g, 'A', 'B');
    });
  });
});


