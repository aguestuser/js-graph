'use strict';

import chai from 'chai';
chai.should();

import { graph } from '../../support/sampleData';
import { distance } from '../../../main/graph/distance';

describe('Distance module', () => {

  describe('#distance', () => {

    it('calculates the distance of the route A-B-C', () => {
      distance(graph, ['A', 'B', 'C']).should.eql(9);
    });

    it('calculates the distance of the route A-D', () => {
      distance(graph, ['A', 'D']).should.eql(5);
    });

    it('calculates the distance of the route A-D-C', () => {
      distance(graph, ['A', 'D', 'C']).should.eql(13);
    });

    it('calculates the distance of the route A-E-B-C-D', () => {
      distance(graph, ['A', 'E', 'B', 'C', 'D']).should.eql(22);
    });

    it('calculates the distance of the route A-E-D', () => {
      distance(graph, ['A', 'E', 'D']).should.eql('NO SUCH ROUTE');
    });
  });
});