const budgets = new Map();
budgets.set('2022-01', {
  1: 12345.68,
  3: 9876.54,
  5: 888.33
})
budgets.set('2022-03', {})
budgets.set('2022-02', {
  1: 5678.12,
  3: 4562.99,
  4: 22,
})
console.log(budgets);

export default budgets;