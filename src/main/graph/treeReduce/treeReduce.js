'use strict';

/***
 *
 * type TrAcc = {
 *   path: Route
 *   res: TrRes
 * }
 *
 * type TrRes = { routes: Array<Route> }
 * type Path = Array<string>
 *
 */

import { satisfies } from '../../collection/object';
import { edges } from '../../graph/graph';

export const traverse = (graph, preds, op) => (root, acc) =>
  satisfies(acc, preds) ? op(acc) :
    combine(
      op(acc),
      edges(graph, root).map(node =>
        traverse(graph, preds, op)(node.id, increment(acc, node)))
    );

const increment = (acc, node) => ({
  ...acc,
  path: acc.path.concat(node.id)
});

const combine = (root, nodes) =>
  nodes.reduce((acc, node) => ({
    res: {
      ...acc.res,
      routes: (acc.res.routes || []).concat(node.res.routes || [])
    }
  }), root);