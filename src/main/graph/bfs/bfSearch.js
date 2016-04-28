'use strict';

/**
 * BfAcc and BfRes are defined as follows (in flow notation):
 *
 * type BfAcc = {
 *   graph: Graph,
 *   visitors: Array<Node>,
 *   res: BfRes,
 *   op: BfAcc -> BfRes
 * }
 *
 * type BfRes = {
 *   path: Array<string>,
 *   hops: { [key: number]: Array<string>
 * }
 *
 * */

import { node, edges } from '../graph';
import { enqueue, dequeue, isEmpty } from '../../collection/queue';
import { last } from '../../collection/object';

// (BfAcc, BfRes -> Bool) -> BfAcc
export const searchWhile = (acc, pred) => {
  const acc_ = search(acc);
  return pred(acc_.res) ? acc : // return if predicate satisfied
    searchWhile({ // otherwise keep searching
      ...acc_,
      graph: visit(unvisit(acc_.graph), last(acc_.res.path)), // search a fresh, unmarked graph
      visitors: [last(acc_.res.path)] // begin search at last node visited in prior search
    }, pred);
};

// (BfAcc) -> BfAcc
export const search = (acc) => {
  if (isEmpty(acc.visitors)) return acc;
  else {
    const [ id, visitors_ ] = dequeue(acc.visitors);
    const [ tail, heads ] = [ node(acc.graph, id), edges(acc.graph, id) ];
    return search(
      heads.reduce(
        (acc_, head) => record(acc_, tail, head),
        { ...acc, visitors: visitors_ }
      ));
  }
};

//(BfAcc, Node, Node) => BfAcc
export const record = (acc, tail, head) =>
  acc.graph[head.id].visited ?
    acc : {
    ...acc,
    graph: visit(acc.graph, head.id),
    visitors: enqueue(acc.visitors, head.id),
    res: performOps(acc, tail, acc.graph[head.id])
  };

// (Graph, String) => Graph
export const visit = (graph, id) => ({
  ...graph,
  [id]: {
    ...graph[id],
    visited: true
  }
});

export const unvisit = g =>
  Object.keys(g).reduce((acc,id) => ({
    ...acc,
    [id]: {
      ...acc[id],
      visited: false
    }
  }), g);

// (BfAcc) ->
export const performOps = (acc, tail, head) =>
  acc.ops.reduce((res, op) => op(res, tail, head), acc.res);
