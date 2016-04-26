import fs from 'fs';

// MAIN FUNCTION

// String -> Graph (as defined in src/main/graph.js)
export const parseGraph = path => format(tokenize(read(path)));

// HELPERS

// String -> String
export const read = path => fs.readFileSync(path).toString().split('\n')[0];

// String -> [String]
export const tokenize = (str) => str.replace('Graph: ', '').split(', ');

// [String] -> Graph (as defined in src/main/graph.js)
export const format = specs => 
  specs.reduce((acc, spec) => ({
    ...acc,
    [spec[0]]: {
      ...acc[spec[0]],
      [spec[1]]: parseInt(spec[2])
    }
  }), {});
