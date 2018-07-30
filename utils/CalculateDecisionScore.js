import React from 'react';

const CalculateDecisionScore = (sliderValues, priorities) => {
  const priorityKeys = Object.keys(priorities);
  const POWER = priorityKeys.length;
  const DENOMINATOR = 2 ** POWER;
  let totalScore = 0;

  const completeValues = {};
  priorityKeys.map(priorityKey => {
    const priority = priorities[priorityKey];
    if (sliderValues[priority.rank]) {
      completeValues[priority.rank] = sliderValues[priority.rank].value;
    } else {
      completeValues[priority.rank] = 0.5;
    }
  });

  Object.keys(completeValues).map(rankKey => {
    const sliderScore = completeValues[rankKey];
    const weightedScore = sliderScore * Math.pow(2, POWER - rankKey); //if POWER is 7, this is 2**6, 2**5, etc...
    totalScore += weightedScore;
  });
  const finalWeightedScore = totalScore / (DENOMINATOR - 1);
  return finalWeightedScore;
};

export default CalculateDecisionScore;
