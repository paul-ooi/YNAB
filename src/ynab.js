function App(settings){
  var self = this;
  var client = self.client = new Client(settings);
  var rootFile = ".ynabSettings.yroot";
  var appSettings = { client: client, app: self };
  self.numberFormat = '0,0.00';
  self.errorMessage = ko.observable();
  self.budget = new BudgetController(appSettings);
  self.account = new AccountController(appSettings);
  self.payee = new PayeeController(appSettings)
  self.category = new CategoryController(appSettings);
  self.transaction = new TransactionController(appSettings)

  var accountBalance = ko.computed(function(){
    var transactionsByAccountId = _.chain(self.transaction.transactions()).groupBy("accountId");

    return transactionsByAccountId.reduce(function(memo, transactions, accountId){
      memo[accountId] = _.reduce(transactions, function(sum, transaction){
        return sum + transaction.amount;
      }, 0);
      return memo;
    }, {}).value()
  })

  // totals of everything
  self.netWorth = ko.computed(function() {
    return _.reduce(self.transaction.transactions(), function(sum, transaction){
      return sum + transaction.amount;
    }, 0);
  })

  // get account balances
  self.accountBalance = function(accountId){
    return accountBalance()[accountId] || 0;
  }

  // Loads budget details
  client.authenticate().then(function(){
    client.loadJson(rootFile).then(function(root){
      self.budget.budgets(root.relativeKnownBudgets);
      if(self.budget.budgets().length === 1){
        self.budget.select(self.budget.budgets()[0])
      }
    }).fail(function(){
      self.errorMessage("Unable to load YNAB settings file (" + rootFile + "). Make sure you connect to a Dropbox account with that YNAB syncs with.");
    });
  });
}