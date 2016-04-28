'use strict';

/**
 * BfRes is defined as follows (in flow notation):
 *
 * type BfRes = {
 *   path: Array<string>,
 *   hops: { [key: number]: Array<string>
 * }
 */

import { groupByValue } from '../../collection/object';
import { search, visit } from './bfSearch';
import { addToPath, addToHops } from './bfNodeOps';

// GRAPH OPS

// (Graph, number, BfAcc -> BfRes) ->
//   { graph: Graph, visitors: Array<string>, res: BfRes, op: BfAcc -> BfRes }
export const init = (g, id, res0, op) =>
  ({ graph: visit(g, id), visitors: [id], res: res0, op: op });

// (Graph, string) => Array<string>
export const traverse = (g, id) =>
  search(
    init(g, id, { path: [id] }, addToPath)
  ).res.path;

// (Graph, string) => { [key: number]: Array<string> }
export const mapHops = (g, id) =>
  groupByValue(
    search(
      init(g, id, { hops: { [id]: 0} }, addToHops)
    ).res.hops
  );

