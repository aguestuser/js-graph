'use strict';

import chai from 'chai';

import { graph as g } from '../support/sampleData';
import * as route from '../../main/service/route';

describe('Route service', () => {

  chai.should();
  const { LESS_THAN, EQUAL_TO } = route;

  describe('acceptance criteria', () => {

    describe('distance calculation', () => {

      it('calculates the distance of the route A-B-C', () => {
        route.computeDistance(g, ['A', 'B', 'C']).should.eql(9);
      });

      it('calculates the distance of the route A-D', () => {
        route.computeDistance(g, ['A', 'D']).should.eql(5);
      });

      it('calculates the distance of the route A-D-C', () => {
        route.computeDistance(g, ['A', 'D', 'C']).should.eql(13);
      });

      it('calculates the distance of the route A-E-B-C-D', () => {
        route.computeDistance(g, ['A', 'E', 'B', 'C', 'D']).should.eql(22);
      });

      it('calculates the distance of the route A-E-D', () => {
        route.computeDistance(g, ['A', 'E', 'D']).should.eql('NO SUCH ROUTE');
      });

    });

    describe('route discovery predicated on stops', () => {

      it('calculates the number of trips starting at C and ending at C with a maximum of 3 stops', () => {
        route.countWhere(g, {
          start: 'C',
          end: 'C',
          hops: { mustBe: LESS_THAN, num: 3 }
        }).should.eql(2);
      });

      it('calculates the number of trips starting at A and ending at C with exactly 4 stops', () => {
        route.countWhere(g, {
          start: 'A',
          end: 'C',
          hops: { mustBe: EQUAL_TO, num: 4 }
        }).should.eql(3);
      });
    });

    describe('shortest path calculation', () => {

      it('calculates the length of the shortest route from A to C', () => {
        route.shortestPath(g, 'A', 'C').should.eql(9);
      });

      it('calculates the length of the shortest route from B to B', () => {
        route.shortestPath(g, 'B', 'B').should.eql(9);
      });
    });

    describe('route discovery predicated on distance', () => {

      it('calculates the number of different routes from C to C with a distance of less than 30', () => {
         route.countWhere(g, {
           start: 'C',
           end: 'C',
           distance: { mustBe: LESS_THAN, num: 30 }
         }).should.eql(7);
      });
    });
  });
});
