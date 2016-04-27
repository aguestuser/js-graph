export const graph = {
  A: {
    node: 'A',
    edges: {
      B: { nodeId: 'B', weight: 5 },
      D: { nodeId: 'D', weight: 5 },
      E: { nodeId: 'E', weight: 7 }
    }
  },
  B: {
    node: 'B',
    edges: {
      C: { nodeId: 'C', weight: 4 }
    }
  },
  C: {
    node: 'C',
    edges: {
      D: { nodeId: 'D', weight: 8 },
      E: { nodeId: 'E', weight: 2 }
    }
  },
  D: {
    node: 'D',
    edges: {
      C: { nodeId: 'C', weight: 8 },
      E: { nodeId: 'E', weight: 6 }
    }
  },
  E: {
    node: 'E',
    edges: {
      B: { nodeId: 'B', weight: 3 }
    }
  }
};
