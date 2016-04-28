'use strict';

export const enqueue = (q, item) => q.concat([item]);
export const dequeue = q => [q[0], q.slice(1)];
export const isEmpty = q => q.length === 0;