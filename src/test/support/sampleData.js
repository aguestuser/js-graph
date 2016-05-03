'use strict';

export const p = ['A', 'D', 'E', 'B', 'C'];

export const graph = {
  A: {
    id: 'A',
    edges: {
      B: { id: 'B', weight: 5 },
      D: { id: 'D', weight: 5 },
      E: { id: 'E', weight: 7 }
    }
  },
  B: {
    id: 'B',
    edges: {
      C: { id: 'C', weight: 4 }
    }
  },
  C: {
    id: 'C',
    edges: {
      D: { id: 'D', weight: 8 },
      E: { id: 'E', weight: 2 }
    }
  },
  D: {
    id: 'D',
    edges: {
      C: { id: 'C', weight: 8 },
      E: { id: 'E', weight: 6 }
    }
  },
  E: {
    id: 'E',
    edges: {
      B: { id: 'B', weight: 3 }
    }
  }
};
