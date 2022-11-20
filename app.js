import Transaction from './src/Transaction.js';
// import budgets from './data/budgets.js';
// import categories from './data/categories.json' assert {type: 'json'};
import data from './data/transactions.json' assert {type: 'json'};
console.log('test');
data.forEach((transaction)=> {
  const template = document.getElementById('rowTemplate');
  const tbody = document.querySelector('tbody');
  const clone = template.content.cloneNode(true);
  const t = new Transaction(transaction)
  clone.querySelector('time').textContent = Intl.DateTimeFormat('en-CA').format(t.date);
  clone.querySelector('.cell__from').textContent = t.account.name;
  clone.querySelector('.cell__to').textContent = t.payee.name;
  clone.querySelector('.cell__budget').textContent = t.budget.name;
  clone.querySelector('.cell__outflow').textContent = Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(t.amount);
  tbody.appendChild(clone);
  console.log(t)
})