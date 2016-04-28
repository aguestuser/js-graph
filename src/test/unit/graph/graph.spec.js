'use strict';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { graph as g } from '../../support/sampleData';
import * as graph from '../../../main/graph/graph';
import * as distance from '../../../main/graph/distance';

describe('Graph interface', () => {

  chai.should();
  chai.use(sinonChai);

  let _distance;

  before(() => {
    _distance = sinon.stub(distance, 'distance');
  });

  after(() => {
    _distance.restore();
  });

  describe('#distance', () => {
    it('delegates to distance module', () => {
      graph.distance(g, ['A', 'B']);
      _distance.should.have.been.calledWith(g, ['A', 'B']);
    });
  })
});