function Transaction(app, transaction) {
  var self = this;
  self.accountId = transaction.accountId;
  self.accountName = app.account.lookup(transaction.accountId).accountName;
  self.categoryName = app.category.lookup(transaction.categoryId).name;
  self.categoryId = transaction.categoryId;
  self.payeeId = transaction.payeeId;
  self.payeeName = app.payee.lookup(transaction.payeeId).name;
  self.date = transaction.date;
  self.memo = transaction.memo;
  self.amount = transaction.amount;
  self.subTransactions = (transaction.subTransactions || []).map(function(subTransaction){
    return {
      categoryName: app.category.lookup(subTransaction.categoryId).name,
      categoryId: subTransaction.categoryId
    };
  })

  self.baseObject = transaction;
}