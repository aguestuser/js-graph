'use strict';

/**
 * BfAcc is defined as follows:
 *
 * type BfAcc = { graph: Graph, visitors: Array<Node>, res: any, op: BfAcc -> any }
 *
 * */

import { values } from '../collection/object';
import { enqueue, dequeue, isEmpty } from '../collection/queue';

// (BfAcc) -> BfAcc
export const search = (acc) => {
  debugger;
  if (isEmpty(acc.visitors)) return acc;
  else {
    const [ tailId, visitors_ ] = dequeue(acc.visitors);
    const tail = acc.graph[tailId];
    const heads = values(tail.edges);
    debugger;
    return search(
      heads.reduce(
        (acc_, head) => record(acc_, tail, head),
        { ...acc, visitors: visitors_ }
      ));
  }
};

//(BfAcc, Node, Node) => BfAcc
export const record = (acc, tail, head) => {
  if (acc.graph[head.id].visited) return acc;
  else {
    const graph_ = visit(acc.graph, head.id);
    return {
      ...acc,
      graph: graph_,
      visitors: enqueue(acc.visitors, head.id),
      res: acc.op(acc, tail, graph_[head.id])
    }
  }
};

// (Graph, String) => Graph
export const visit = (graph, nodeId) => ({
  ...graph,
  [nodeId]: {
    ...graph[nodeId],
    visited: true
  }
});
