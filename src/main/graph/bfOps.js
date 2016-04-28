'use strict';

import { search, visit } from './bfSearch';
import { groupByValue } from '../collection/object';

// GRAPH OPS

// (Graph, number, BfAcc -> any) -> { graph: Graph, visitors: Array<string>, res: Array<string>, op: function }
export const init = (g, id, res0, op) =>({ graph: visit(g, id), visitors: [id], res: res0, op: op });

// (Graph, string) => Array<string>
export const traverse = (g, id) => search(init(g, id, [id], addToPath)).res;

// (Graph, string) => { [key: number]: Array<string> }
export const mapHops = (g, id) =>
  groupByValue(search(init(g, id, {[id]: 0}, addToHopMap)).res);

// NODE OPS

// (BfAcc, Node, Node) -> Any
export const identity = (acc, tail, head) => acc.res;

// (BfAcc, Node, Node) -> [String]
export const addToPath = (acc, tail, head) =>  acc.res.concat([head.id]);


// (BfAcc, Node, Node) -> { [key: String]: number }
export const addToHopMap = (acc, tail, head) => ({
  ...acc.res,
  [head.id]: acc.res[tail.id] + 1
});