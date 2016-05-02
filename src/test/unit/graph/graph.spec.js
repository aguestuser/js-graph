'use strict';
import chai from 'chai';

import { graph as g } from '../../support/sampleData';

import { node, edges } from '../../../main/graph/graph';


describe('Graph module', () => {

  chai.should();

  describe('#node', () => {

    it('looks up a node in a graph', () => {
      node(g, 'A').should.eql({
        id: 'A',
        edges: {
          B: {id: 'B', weight: 5},
          D: {id: 'D', weight: 5},
          E: {id: 'E', weight: 7}
        }
      });
    });
  });

  describe('#edges', () => {

    it('returns an array of all the edges from a node in a graph', () => {
      edges(g, 'A').should.eql([
        { id: 'B', weight: 5 },
        { id: 'D', weight: 5 },
        { id: 'E', weight: 7 }
      ])
    });
  })
});