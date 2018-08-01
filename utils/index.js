import React from 'react';
import _ from 'lodash';

export const orderPriorities = priorities => {
  const orderedObjects = [];
  for (let i = 1; i <= Object.keys(priorities).length; i++) {
    Object.keys(priorities).map(key => {
      if (priorities[key].rank === i) {
        orderedObjects.push(priorities[key]);
      }
    });
  }
  return orderedObjects;
};

export const orderDecisions = decisions => {
  const mappedDecisions = Object.keys(decisions).map(key => ({ key, decision: decisions[key] }));
  const list = _.sortBy(mappedDecisions, decision => decision.score);
  return list.reverse();
};
