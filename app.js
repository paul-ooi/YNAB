import Transaction from './src/Transaction.js';
import data from './data/transactions.json' assert {type: 'json'};

data.forEach((transaction)=> {
  const t = new Transaction(transaction)
  console.log(t._account.id)
})
// const transactions = JSON.parse(data);
// console.log(transactions);
