import chai from 'chai';

import { graph as g } from '../support/sampleData';

import { run }from '../../main/app';
import * as graph from '../../main/graph/index';

describe('Application', () => {

  chai.should();
  const { metrics: { hops, distance } } = graph;

  xit('meets the acceptance criteria of the challenge', () => {

    run('src/resources/input.txt').should.eql(
      'Output #1: 9\n' +
      'Output #2: 5\n' +
      'Output #3: 13\n' +
      'Output #4: 22\n' +
      'Output #5: NO SUCH ROUTE\n' +
      'Output #6: 2\n' +
      'Output #7: 3\n' +
      'Output #8: 9\n' +
      'Output #9: 9\n' +
      'Output #10: 7')
  });

  describe('acceptance criteria', () => {

    describe('distance calculation', () => {

      it('calculates the distance of the route A-B-C', () => {
        graph.distance(g, ['A', 'B', 'C']).should.eql(9);
      });

      it('calculates the distance of the route A-D', () => {
        graph.distance(g, ['A', 'D']).should.eql(5);
      });

      it('calculates the distance of the route A-D-C', () => {
        graph.distance(g, ['A', 'D', 'C']).should.eql(13);
      });

      it('calculates the distance of the route A-E-B-C-D', () => {
        graph.distance(g, ['A', 'E', 'B', 'C', 'D']).should.eql(22);
      });

      it('calculates the distance of the route A-E-D', () => {
        graph.distance(g, ['A', 'E', 'D']).should.eql('NO SUCH ROUTE');
      });

    });

    xdescribe('route discovery predicated on stops', () => {

      it('calculates the number of trips starting at C and ending at C with a maximum of 3 stops', () => {
        graph.routesShorterThan(hops)(g, 4, 'C', 'C').should.eql(2);
      });

      it('calculates the number of trips starting at A and ending at C with exactly 4 stops', () => {
        graph.routesEqualTo(hops)(g, 4, 'A', 'C').should.eql(3);
      });
    });

    xdescribe('shortest path calculation', () => {

      it('calculates the length of the shortest route from A to C', () => {
        graph.shortestPath(g, 'A', 'C').should.eql(9);
      });

      it('calculates the length of the shortest route from B to B', () => {
        graph.shortestPath(g, 'B', 'B').should.eql(9);
      });
    });

    xdescribe('route discovery predicated on distance', () => {

      it('calculates the number of different routes from C to C with a distance of less than 30', () => {
         graph.routesShorterThan(distance)(g, 30, 'C', 'C').should.eql(7);
      });
    })
  });
});