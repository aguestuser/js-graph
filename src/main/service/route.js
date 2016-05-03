'use strict';

/**
 *
 * type ComparisonEnum = 'greaterThan' | 'equal' | 'lessThan'
 *
 * type RouteSpec = {
 *   start: String,
 *   end: String,
 *   hops: {
 *     mustBe: ComparisonEnum,
 *     num: Int
 *   },
 *   distance: {
 *     mustBe: ComparisonEnum,
 *     num: Int
 *   }
 * }
 *
 * */

import { distance as _distance } from '../graph/distance/distance';

import { fold } from '../graph/traverse/fold/fold';
import { hops, distance as dist, endIs } from '../graph/traverse/fold/ops/predicate';
import { combineRoutes } from '../graph/traverse/fold/ops/combine';
import { addRouteIf } from '../graph/traverse/fold/ops/visit';
import { incrementPath, incrementDistance } from '../graph/traverse/fold/ops/traverse';
import { compose2 } from '../collection/util/function';


// CONSTANTS
export const EQUAL_TO = 'equal';
export const GREATER_THAN = 'greaterThan';
export const LESS_THAN = 'lessThan';

// MAIN FUNCTIONS

// (Graph, [Node]) -> Either[String,Int]
export const computeDistance = (graph, route) => _distance(graph, route);

// (Int, Graph, String, String) -> Int
export const countWhere = graph => specs =>
  fold({
    done: donePreds(graph, specs),
    visit: addRouteIf(visitPreds(graph, specs)),
    increment: compose2(incrementOps(specs)),
    combine: combineRoutes
  })(graph, specs.start, { path: [specs.start], res: {} }).res.routes.length;

// (Graph, String, String) -> Int
export const shortestPath  = (graph, start, end) => -1;

// HELPER FUNCTIONS

// (Graph, RoutSpec) ->  [ TrAcc -> Bool ]
export const donePreds = (g, specs) =>
  [].concat(!specs.hops ? [] : hops.equal(specs.hops.num))
    .concat(!specs.distance ? [] : dist.greaterThan(g)(specs.distance.num));

// (Graph, RouteSpec) -> [ TrAcc -> TrAcc ]
export const visitPreds = (g, specs) =>
  [endIs(specs.end)]
    .concat(!specs.hops ? [] : hops[specs.hops.mustBe](specs.hops.num))
    .concat(!specs.distance ? [] : [
      dist.greaterThan(g)(0),
      dist[specs.distance.mustBe](g)(specs.distance.num)
    ]);

// RouteSpec -> [ TrAcc -> TrAcc ]
export const incrementOps = specs =>
  [incrementPath].concat(!specs.distance ? [] : incrementDistance);

