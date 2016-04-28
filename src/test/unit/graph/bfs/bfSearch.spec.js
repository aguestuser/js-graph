'use strict';

import chai from 'chai';
import {graph as g} from '../../../support/sampleData';
import { values, count } from '../../../../main/collection/object';
import { searchWhile, search, visit, record } from '../../../../main/graph/bfs/bfSearch';
import { identity, addToPath } from '../../../../main/graph/bfs/bfNodeOps';

describe('Breadth First Search module', () => {

  chai.should();

  describe('helpers', () => {

    describe('#visit', () => {

      it("marks a node as visited", () => {
        visit(g, 'E').E.visited.should.be.true;
      });

      it('does note mutate its input', () => {
        const visited = visit(g, 'E');

        g.should.not.equal(visited); // different object
        g.should.not.eql(visited); // different values
        (g.E.visited === undefined).should.be.true; // <-- for example this
      });

      it("is idempotent", () => {
        const visited = visit(g, 'E');
        visit(visited, 'E').should.eql(visited);
      });
    });

    describe('#searchWhile', () => {

      it('traverses a graph recursively until a predicate is satisfied', () => {
        const acc = { graph: g, visitors: ['A'], res: { path: ['A'] }, ops: [addToPath] };
        const pred = res => count(res.path, 'C') > 3;
        searchWhile(acc, pred).res.path.should.eql(
          ['A', 'B', 'D', 'E', 'C', 'D', 'E', 'C', 'B', 'C', 'D', 'E', 'B', 'C', 'D', 'E', 'B']
        );
      });
    });

    describe('#search', () => {

      let searched;
      before(() =>
        searched = search({
          graph: visit(g, 'A'),
          visitors: ['A'],
          res: { path: ['A'] },
          ops: [addToPath]
        })
      );

      it('traverses a graph *once* in breadth-first order (no cycles)', () => {
        searched.res.should.eql({ path: ['A', 'B', 'D', 'E', 'C'] });
      });

      it('marks every reachable node as visited', () => {
        values(searched.graph).forEach(v => v.visited.should.be.true)
      });

      it('drains the visitors queue', () => {
        searched.visitors.should.eql([]);
      });
    });

    describe('#record', () => {

      describe('when head has already been visited', () => {

        const gg = visit(g, 'B');
        const tail = gg.E;
        const head = gg.B;
        const acc = { graph: gg, visitors: [], res: {}, op: identity };

        it('returns the accumulator without changing it', () => {
          record(acc, tail, head).should.eql(acc);
        });
      });

      describe('when head has not been visited', () => {

        const acc = { graph: g, visitors: [], res: { path: [] }, ops: [addToPath] };
        const tail = g.E;
        const head = g.B;

        it('marks the head as visited', () => {
          record(acc, tail, head).graph[head.id].visited.should.be.true;
        });

        it('adds the head to the visitors quque', () => {
          record(acc, tail, head).visitors.should.eql([head.id])
        });

        it('transforms the accumulated result', () => {
          record(acc, tail, head).res.path.should.eql([head.id])
        });
      });
    });
  })
});

