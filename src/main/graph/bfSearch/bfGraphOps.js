'use strict';

/**
 * BfRes is defined as follows (in flow notation):
 *
 * type BfRes = {
 *   path: Array<string>,
 *   hops: { [key: number]: Array<string>
 * }
 */

import { groupByValue } from '../../util/object';
import { last } from '../../util/array';
import { searchWhile, search, visit } from './bfSearch';
import { addToPath, addToHops } from './bfNodeOps';

// GRAPH OPS

// (Graph, number, BfAcc -> BfRes) ->
//   { graph: Graph, visitors: Array<string>, res: BfRes, op: BfAcc -> BfRes }
export const init = (g, id, res0, ops) =>
  ({ graph: visit(g, id), visitors: [id], res: res0, ops: ops });

// (Graph, string) => Array<string>
export const traverse = (g, id) =>
  search(init(g, id, { path: [id] }, [addToPath])).res.path;

// (Graph, string) => { [key: number]: Array<string> }
export const mapHops = (g, id) => {
  const res0 = { path: [id], hops: { [id]: [0]}};
  const acc0 = init(g, id, res0, [addToPath, addToHops]);
  return groupByValue(search(acc0).res.hops);
};

// (Graph, String, Int) -> { [key: number]: Array<string>
export const mapNHops = (g, startId, endId, n) => {
  const pred = res => last(res.hops[endId]) > n;
  const res0 = { path: [startId], hops: { [startId]: [0] } };
  const acc0 = init(g, startId, res0, [addToPath, addToHops]);
  return searchWhile(acc0, pred).res.hops;
};
