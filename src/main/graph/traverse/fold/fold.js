/***
 *
 * type FoldOps = {
 *   done: (FoldAcc, [FoldAcc -> Boolean]) -> Boolean,
 *   visit: FoldAcc -> FoldAcc,
 *   increment: FoldAcc -> FoldAcc,
 *   combine: FoldAcc -> FoldAcc
 * }
 *
 * type Path = Array<string>
 *
 * type FoldAcc = {
 *   path: Path,
 *   distance: number
 *   res: FoldRes
 * }
 *
 * type FoldRes = { routes: Array<Path> }
 *
 */

'use strict';

import { satisfies } from '../../../collection/util/function';
import { edges } from '../../../graph/graph';

/// (FoldOps) -> (Graph, String, FoldAcc) -> FoldAcc

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
