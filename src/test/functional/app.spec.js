import chai from 'chai';
chai.should();

import { run }from '../../main/app';

import { graph } from '../support/sampleData';
import { numRoutes, distance, shortestPath } from '../../main/graph';
import { lessThanNStops, exactlyNStops, distanceLessThanN } from '../../main/route';

xdescribe('Application', () => {

  it('meets the acceptance criteria of the challenge', () => {

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
        distance(graph, ['A', 'B', 'C']).should.eql(9);
      });

      it('calculates the distance of the route A-D', () => {
        distance(graph, ['A', 'D']).should.eql(5);
      });

      it('calculates the distance of the route A-D-C', () => {
        distance(graph, ['A', 'D', 'C']).should.eql(13);
      });

      it('calculates the distance of the route A-E-B-C-D', () => {
        distance(graph, ['A', 'D', 'C']).should.eql(22);
      });

      it('calculates the distance of the route A-E-D', () => {
        distance(graph, ['A', 'D', 'C']).should.eql('NO SUCH ROUTE');
      });

    });

    describe('route discovery predicated on stops', () => {

      it('calculates the number of trips starting at C and ending at C with a maximum of 3 stops', () => {
        numRoutes(graph, 'C', 'C', lessThanNStops(4)).should.eql(2);
      });

      it('calculates the number of trips starting at A and ending at C with exactly 4 stops', () => {
        numRoutes(graph, 'A', 'C', exactlyNStops(4)).should.eql(3);
      });
    });


    describe('shortest path calculation', () => {

      it('calculates the length of the shortest route from A to C', () => {
        shortestPath(graph, 'A', 'C').should.eql(9);
      });

      it('calculates the length of the shortest route from B to B', () => {
        shortestPath(graph, 'B', 'B').should.eql(9);
      });
    });

    describe('route discovery predicated on distance', () => {

      it('calculates the number of different routes from C to C with a distance of less than 30', () => {
         numRoutes(graph, 'C', 'C', distanceLessThanN(30)).should.eql(7);
      });
    })
  });
});