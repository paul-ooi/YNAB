import TransactionModel from './models/TransactionModel.js';
import TransactionView from './views/TransactionView.js';
// import budgets from './data/budgets.js';
// import categories from './data/categories.json' assert {type: 'json'};
import data from './data/transactions.json' assert {type: 'json'};
console.log('test');
data.forEach((transaction)=> {
  const t = new TransactionModel(transaction)
  const row = TransactionView.createTransactionRow(t)
  TransactionView.addRowToTable(row, 'tbody')
})
TransactionView.addListenerOnCheckboxes()