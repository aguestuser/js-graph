'use strict';

/**
 *
 * type BfAcc = {
 *   visitors: Array<string>,
 *   visited: { [key: String]: Boolean }
 *   res: BfRes,
 * }
 *
 * type BfRes = {
 *   path: Array<string>,
 *   hops: { [key: String]: number,
 *   distances: { [key: String]: number,
 * }
 *
 * */

import { node, edges } from '../../graph';
import { enqueue, dequeue, isEmpty } from '../../../collection/queue';

// (BfAcc) -> BfAcc
export const bfSearch = (graph, op) => acc => {
  if (isEmpty(acc.visitors)) return acc;
  else {
    const [ id, visitors_ ] = dequeue(acc.visitors);
    return bfSearch(graph, op)(
      edges(graph, id)
        .reduce((edgeAcc, head) =>
          edgeAcc.visited[head.id] ?
            edgeAcc :
            visit(edgeAcc, node(graph, id), head, op),
          { ...acc, visitors: visitors_ }
        )
    );
  }
};

export const visit = (acc, tail, head, op) =>
  addVisitor(op(acc, tail, head), head);

export const addVisitor = (acc, node) => ({
  ...acc,
  visited: { ...acc.visited, [node.id]: true },
  visitors: enqueue(acc.visitors, node.id)
});


/**
 *
 * gloss:
 *
 * initialize:
 *
 * 23: curry the graph and visit operation, which will remain constant
 *
 * on every iteration:
 *
 * 24: if the visitors queue is empty, return the accumulator
 * 25/26: otherwise, dequeue the first-seen visitor node and
 * 28/30: inspect the head of all of its edges to see if any of them have not yet been visited
 *
 * if any edges have not yet been visited:
 *
 * 39: perform the visit operation on its tail (to record its distance or number of hops from the origin) and
 * 42: mark it as visited and put it in the back of the visitors queue
 *
 * then:
 *
 * 27: recurse
 *     with an appropriately updated visitors queue
 *     and modified results fields
 *     until all visitors have been exausted
 *
 * */