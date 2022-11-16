function AccountController(settings){
  var self = this;

  self.accounts = ko.observableArray();
  self.selectedAccount = ko.observable()

  var lookup = ko.computed(function(){
    return _.indexBy(self.accounts(), 'entityId')
  })

  var budgetAccounts = ko.computed(function(){
    return _.filter(self.accounts(), function(account){
      return account.onBudget;
    });
  })

  var offBudgetAccounts = ko.computed(function(){
    return _.difference(self.accounts(), budgetAccounts());
  })

  self.budgetAccounts = new AccountList({
    accounts: budgetAccounts,
    show: true,
    title: 'Budget Accounts'
  })

  self.offBudgetAccounts = new AccountList({
    accounts: offBudgetAccounts,
    show: false,
    title: 'Off Budget Accounts'
  })

  self.lookup = function(id) {
    return lookup()[id] || {};
  }

  self.select = function(account){
    self.selectedAccount(account)
    settings.app.transaction.removeFilters();
  }

  self.selectAllAccount = function(){
    self.selectedAccount(null);
  }
}