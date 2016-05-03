'use strict';

import chai from 'chai';

import { graph as g } from '../../../../support/sampleData';
import { hops, distance, endIs } from '../../../../../main/graph/traverse/fold/ops/predicate';
import { incrementPath, incrementDistance } from '../../../../../main/graph/traverse/fold/ops/traverse';
import {
  LESS_THAN,
  GREATER_THAN,
  EQUAL_TO,
  countWhere,
  donePreds,
  visitPreds,
  incrementOps
} from '../../../../../main/graph/traverse/fold/foldInterface';

describe('Fold Interface', () => {

  chai.should();

  describe('#countWhere', () => {

    describe('route discovery predicated on stops', () => {

      it('calculates the number of trips starting at C and ending at C with a maximum of 3 stops', () => {
        countWhere(g, {
          start: 'C',
          end: 'C',
          hops: { mustBe: LESS_THAN, num: 3 }
        }).should.eql(2);
      });

      it('calculates the number of trips starting at A and ending at C with exactly 4 stops', () => {
        countWhere(g, {
          start: 'A',
          end: 'C',
          hops: { mustBe: EQUAL_TO, num: 4 }
        }).should.eql(3);
      });
    });

    describe('route discovery predicated on distance', () => {

      it('calculates the number of different routes from C to C with a distance of less than 30', () => {
        countWhere(g, {
          start: 'C',
          end: 'C',
          distance: { mustBe: LESS_THAN, num: 30 }
        }).should.eql(7);
      });
    });
  });

  describe('helpers', () => {

    describe('#done', () => {

      describe('when `hops` but not `distance is specified`', () => {

        it('will terminate fold when hop threshold exceeded', () => {
          const specs = { hops: { mustBe: EQUAL_TO, num: 1 } };
          donePreds(g, specs).toString().should.eql([hops.equal(1)].toString());
        });

        describe('when `distance` but not `hops` is specified', () => {

          it('will terminate fold when distance threshold exceeded', () => {
            const specs = { distance: { mustBe: LESS_THAN, num: 2 } };
            donePreds(g, specs).toString()
              .should.eql([distance.greaterThan(g)(2)].toString());
          });

        });

        describe('when both `hops` and distance are specified', () => {

          it('will terminate fold when hops *and* distance thresholds exceeded', () => {
            const specs ={
              hops: { mustBe: EQUAL_TO, num: 1 },
              distance: {mustBe: LESS_THAN, num: 2}
            };
            donePreds(g, specs).toString().should.eql(
              [hops.equal(1), distance.greaterThan(g)(2)].toString()
            );
          });
        });

      });
    });

    describe('#visit', () => {

      describe('when `hops` but not `distance is specified`', () => {

        describe('when hops must equal a value', () => {

          it('will store any route ending at specified node with hops equal to specified value', () => {
            const specs = { end: 'B', hops: { mustBe: EQUAL_TO, num: 1 } };
            visitPreds(g, specs).toString().should.eql([endIs('B'), hops.equal(1)].toString()
            );
          });
        });

        describe('when hops must be less than a value', () => {

          it('will store any route ending at specified node with hops less than specified value', () => {
            const specs = { end: 'B', hops: { mustBe: LESS_THAN, num: 2 } };
            visitPreds(g, specs).toString().should.eql([endIs('B'), hops.lessThan(2)].toString());
          });
        });
      });

      describe('when `distance` but not `hops` is specified', () => {

        describe('when distance must be less than a value', () => {

          it('will store any route ending at specified node with non-zero distance less than specified value', () => {
            const specs = { end: 'B', distance: { mustBe: LESS_THAN, num: 2 } };
            visitPreds(g, specs).toString().should.eql(
              [endIs('B'), distance.greaterThan(g)(0), distance.lessThan(g)(2)].toString()
            );
          });

        });

        describe('when distance must be greater than a value', () => {

          it('will store any route ending at specified node with non-zero distance less than specified value', () => {
            // note: this would not terminate unless a hops threshold was also specified
            const specs = { end: 'B', distance: { mustBe: GREATER_THAN, num: 2 } };
            visitPreds(g, specs).toString().should.eql(
              [endIs('B'), distance.greaterThan(g)(0), distance.greaterThan(g)(2)].toString()
            );
          });
        });
      });

      describe('when both `hops` and distance are specified', () => {

        describe('when hops must equal a value', () => {

          describe('when distance must be less than a value', () => {

            it('will store route ending at spec node with hops = spec value & distance < spec value', () => {
              const specs = {
                end: 'B',
                hops: { mustBe: EQUAL_TO, num: 1 } ,
                distance: { mustBe: LESS_THAN, num: 2 }
              };
              visitPreds(g, specs).toString().should.eql([
                  endIs('B'),
                  hops.equal(1),
                  distance.greaterThan(g)(0),
                  distance.lessThan(g)(2)
                ].toString()
              );
            });
          });

          describe('when distance must be greater than a value', () => {

            it('will store route ending at spec node with hops = spec value & distance > spec value', () => {
              const specs = {
                end: 'B',
                hops: { mustBe: EQUAL_TO, num: 1 } ,
                distance: { mustBe: GREATER_THAN, num: 2 }
              };
              visitPreds(g, specs).toString().should.eql([
                  endIs('B'),
                  hops.equal(4),
                  distance.greaterThan(g)(0),
                  distance.greaterThan(g)(2)
                ].toString()
              );
            });
          });
        });

        describe('when hops must be less than a value', () => {

          describe('when distance must be less than a value', () => {

            it('will store route ending at spec node with hops < spec value & distance < spec value', () => {
              const specs = {
                end: 'B',
                hops: { mustBe: LESS_THAN, num: 2 } ,
                distance: { mustBe: LESS_THAN, num: 2 }
              };
              visitPreds(g, specs).toString().should.eql([
                  endIs('B'),
                  hops.lessThan(2),
                  distance.greaterThan(g)(0),
                  distance.lessThan(g)(2)
                ].toString()
              );
            });
          });

          describe('when distance must be greater than a value', () => {

            it('will store route ending at spec node with hops = spec value & distance > spec value', () => {
              const specs = {
                end: 'B',
                hops: { mustBe: LESS_THAN, num: 2 } ,
                distance: { mustBe: GREATER_THAN, num: 2 }
              };
              visitPreds(g, specs).toString().should.eql([
                  endIs('B'),
                  hops.lessThan(4),
                  distance.greaterThan(g)(0),
                  distance.greaterThan(g)(2)
                ].toString()
              );
            });
          });
        });
      });
    });

    describe('#increment', () => {

      describe('when `hops` is specified but `distance` is not', () => {

        it('will increment path at each new fold level', () => {
          incrementOps(({ hops: {}})).toString().should.eql(
            [incrementPath].toString()
          )
        });
      });

      describe('when `distance` is specified but `hops` is not', () => {

        it('will increment path and distance at each new fold level', () => {
          incrementOps(({ distance: {}})).toString().should.eql(
            [incrementPath, incrementDistance].toString()
          )
        });
      });

      describe('when `hops` and `distance` are both specified', () => {

        it('will increment path and distanace at each new fold level', () => {
          incrementOps(({ hops: {}, distance: {}})).toString().should.eql(
            [incrementPath, incrementDistance].toString()
          )
        });
      });
    });
  });
});