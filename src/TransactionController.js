function TransactionController(settings){
  var self = this;
  self.transactions = ko.observableArray();

  self.sortBy = ko.observable();
  self.desc = ko.observable(true);

  self.sort = function(column) {
    return function() {
      self.desc(!self.desc());
      self.sortBy(column);
    }
  }

  var filters = {
    "account": new Filter("Account", "account", function(transaction) { 
      return transaction.accountName;
    }, function(transaction, on) {
      return transaction.accountId === on.accountId;
    }),
    "date": new Filter("Date", "date", function(transaction) { 
      return transaction.date;
    }, function(transaction, on) {
      return transaction.date === on.date;
    }),
    "payee": new Filter("Payee", "payee", function(t) {
      return t.payeeName;
    }, function(t, on) {
      return t.payeeId === on.payeeId;
    }),
    "category": new Filter("Category", "category", function(t) {
      return t.categoryName;
    }, function(t, on) {
      var onCategoryId = on.categoryId;
      return t.categoryId === onCategoryId || t.subTransactions.some(function(subTransaction) {
        return subTransaction.categoryId === onCategoryId;
      });
    })
  }

  var filtersObject = ko.observable({});

  self.addFilter = function(name, transaction){
    return function() {
      var filtersObjectTemp = filtersObject();
      var filter = filtersObjectTemp[name] = filters[name];
      filter.on = transaction;
      filtersObject(filtersObjectTemp);
    }
  }

  self.removeFilter = function(name) {
    return function() {
      var filtersObjectTemp = filtersObject();
      delete filtersObjectTemp[name];
      filtersObject(filtersObjectTemp);
    }
  }

  self.removeFilters = function(){
    filtersObject({});
  }

  self.filters = ko.computed(function(){
    return _.values(filtersObject());
  })

  self.filteredTransactions = ko.computed(function(){
    var sort = self.sortBy();
    var desc = self.desc();
    var filters = self.filters();
    var account = settings.app.account.selectedAccount();
    var transactions = _.chain(self.transactions()).map(function(transaction){
      return new Transaction(settings.app, transaction);
    });

    if(account){
      transactions = transactions.filter(function(transaction){
        return transaction.accountId === account.entityId;
      })
    }

    filters.forEach(function(filter){
      transactions = transactions.filter(function(transaction){
        return filter.predicate(transaction, filter.on);
      })
    })

    if(sort) {
      transactions = transactions.sortBy(function(transaction){
        return transaction[sort];
      })

      if(desc) {
        transactions = transactions.reverse();
      }
    }

    return transactions.value();
  })
}