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

export const orderDecisions = decisions =>
  _.sortBy(_.values(decisions), decision => decision.score).reverse();
