'use strict';

import { first, second } from './../pair';

// MAIN FUNCTIONS

// (A -> String|Int, (A,A) -> Int)) -> (Heap<A>, Int) -> Heap<A>
export const bubbleUp = (getKey, compare) => (heap, idx) => {
  const parIdx = parent(idx);
  const [par,ch] = [parIdx,idx].map(i => heap.queue[i]);
  return compare(par,ch) <= 0 ?
    heap :
    bubbleUp(getKey,compare)(swap(getKey)(heap,idx,parIdx), parIdx);
};

// (A -> String|Int, (A,A) -> Int)) -> (Heap<A>, Int) -> Heap<A>
export const siftDown = (getKey, compare) => (heap, idx) => {
  const par = heap.queue[idx];
  const [chL,chR] = children(idx).map(i => heap.queue[i]);
  const min = [par,chL,chR].sort(compare)[0];
  if (par === min) return heap;
  else {
    const minIdx = heap.positions[getKey(min)];
    return siftDown(getKey,compare)(swap(getKey)(heap,idx,minIdx), minIdx);
  }
};

// HELPERS

// (A -> string) -> Heap<A> -> Heap<A>
export const swap = getKey => (heap, i, j) => ({
  queue: swapQueue(heap.queue,i,j),
  positions: swapMap(
    heap.positions,
    [getKey(heap.queue[i]), i],
    [getKey(heap.queue[j]), j]
  )
});

// (Array<A>, Int, Int) -> Array<A>
export const swapQueue = (arr, i, j) => {
  const [l,r] = [Math.min(i,j), Math.max(i,j)];
  return arr.slice(0,l)
    .concat([arr[r]])
    .concat(arr.slice(l+1,r))
    .concat([arr[l]])
    .concat(arr.slice(r+1));
};

// (PositionMap, Pair<Int|String, Int>, Pair<Int|String, Int>) -> PositionMap
export const swapMap = (map, iPair, jPair) => ({
  ...map,
  [first(iPair)]: second(jPair),
  [first(jPair)]: second(iPair)
});

// Int -> Int
export const parent = idx => {
  if (idx === 0) return 0;
  else {
    const idx_ = idx + 1;
    return isEven(idx_) ? (idx_/2) - 1  : Math.floor(idx_/2) - 1;
  }
};

// Int -> (Int,Int)
export const children = idx => [2*(idx + 1) - 1, 2*(idx + 1)];

// (Int) -> Boolean
const isEven = n => n % 2 == 0;
