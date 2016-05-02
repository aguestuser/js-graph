'use strict';

import { groupBy, includes } from './array';

// { [key: A]: B } -> [B]
export const values = o => Object.keys(o).map(k => o[k]);

// { [key: A]: B } -> { [key: B]: A }
export const groupByValue = o => groupBy(Object.keys(o), k => o[k]);

// (Object, Either[String,Int]) -> Boolean
export const hasKey = (o, k) => includes(Object.keys(o), k);

// (Object, Any) -> Boolean
export const hasValue = (o,v) => includes(values(o), v);