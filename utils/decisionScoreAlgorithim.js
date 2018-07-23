import React from 'react';

const CalculateDecisionScore = (sliderValues, priorities) => {
  const priorityKeys = Object.keys(priorities);
  const POWER = priorityKeys.length;
  const DENOMINATOR = 2 ** POWER;
  let totalScore = 0;

  const completeValues = {};
  priorityKeys.map(priority => {
    if (sliderValues[priority.rank]) {
      completeValues[priority.rank] = sliderValues[priority.rank].value;
    } else {
      completeValues[priority.rank] = 0.5;
    }
  });

  Object.keys(completeValues).map(valueKey => {
    const sliderScore = completeValues[valueKey];
    const weightedScore = sliderScore * 2 ** (POWER - valueKey); //if POWER is 7, this is 2**6, 2**5, etc...
    totalScore += weightedScore; // 0 + 55, 23
  });
  const finalWeightedScore = totalScore / DENOMINATOR;
  return finalWeightedScore;
};

export default CalculateDecisionScore;
