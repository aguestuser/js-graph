import fs from 'fs';

// MAIN FUNCTION

// String -> Graph (as defined in src/main/graph/graph.js)
export const parseGraph = path => format(tokenize(read(path)));

// HELPERS

// String -> String
export const read = path => fs.readFileSync(path).toString().split('\n')[0];

// String -> [String]
export const tokenize = (str) => str.replace('Graph: ', '').split(', ');

// [String] -> Graph (as defined in src/main/graph.js)
export const format = specs =>
  specs.reduce((acc, spec) => ({
    ...acc, // deep clone existing graph
    [spec[0]]: { // give the node an id corresponding to its label
      id: spec[0],
      edges: {
        ...(acc[spec[0]] && acc[spec[0]].edges), // clone any existing edges for this node
        [spec[1]]: { // give edges an id corresponding to the label of their head
          id: spec[1],
          weight: parseInt(spec.slice(2))
        }
      }
    }
  }), {});
