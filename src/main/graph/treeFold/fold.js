'use strict';

/***
 *
 * type TrOps = {
 *   done: (TrAcc, [TrAcc -> Boolean]) -> Boolean,
 *   visit: TrAcc -> TrAcc,
 *   increment: TrAcc -> TrAcc,
 *   combine: TrAcc -> TrAcc
 * }
 *
 * type TrAcc = {
 *   path: Path
 *   res: TrRes
 * }
 *
 * type TrRes = { routes: Array<Path> }
 * type Path = Array<string>
 *
 */

import { satisfies } from '../../util/function';
import { edges } from '../../graph/graph';

/// (TrOps) -> (Graph, String, TrAcc) -> TrAcc

export const fold = (ops) => (graph, root, acc) =>
  satisfies(acc, ops.done) ? ops.visit(acc) :
    edges(graph, root)
      .map(child =>
        fold(ops)(graph, child.id, ops.increment(acc, child)))
      .reduce((childAcc, child) =>
        ops.combine(childAcc, child), ops.visit(acc));

/**
 *
 * #traverse gloss:
 *
 * 28: if termination predicates are satisfied
 *     the recursion bottoms out and returns result of visiting a leaf node
 * 29: otherwise traverse each child node reachable by an edge
 *     incrementing the accumulator's route and distance fields as appropriate
 * 32: when the recursion returns, combine the accumulator from each child node
 *     with the result of performing `visit` on the current root node's accumulator
 *
 * in sum: perform a fold over the graph as if it were a tree!
 *
 * */
