import chai from 'chai';
chai.should();

import { parseGraph, tokenize, format, read } from '../../main/parse';

describe('Parse module', () => {

  const path = './src/test/support/input.txt';
  const graphString = 'Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7';
  const graphTokens = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];
  const graph = {
    A: { B: 5, D: 5, E: 7},
    B: { C: 4 },
    C: { D: 8, E: 2 },
    D: { C: 8, E: 6 },
    E: { B: 3 }
  };

  describe('main function', () => {

    describe('#parseGraph', () => {
      it('parses a Graph from a well-formatted text file', () => {
        parseGraph(path).should.eql(graph);
      });
    });
  });
  
  describe('helpers', () => {

    describe('#read', () => {
      it('reads text input from a specified filepath', () => {
        read(path).should.eql(graphString);
      });
    });
    
    describe('#tokenize', () => {
      it('drops Graph prefix and tokenizes Graph specs', () => {
        tokenize(graphString).should.eql(graphTokens);
      });
    });

    describe('#format', () => {
      it('formats an array of graph specs into a graph', () => {
        format(graphTokens).should.eql(graph);
      });
    });    
  });
});
