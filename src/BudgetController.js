function BudgetController(settings){
  var self = this;
  var budgetMetaFile = "Budget.ymeta";
  var client = settings.client;
  var app = settings.app;

  self.budgets = ko.observableArray();
  self.budget = ko.observable();
  self.budgetDataFolder = ko.observable()
  self.device = ko.observable();
  self.loadingProgress = ko.observable(0);
  self.loadingMessages = ko.observableArray();
  self.errorMessage = app.errorMessage;

  self.budgetName = ko.computed(function(){
    return ((self.budget() || "").split("/")[1] || "").split("~")[0];
  })

  self.budgetMetaPath = ko.computed(function(){
    return [self.budget(), budgetMetaFile].join("/")
  })
  self.budgetDataPath = ko.computed(function(){
    return [self.budget(), self.budgetDataFolder()].join("/")
  })
  self.budgetDevicesPath = ko.computed(function(){
    return [self.budgetDataPath(), "devices"].join("/")
  })
  self.deviceFilePath = function(deviceFileName){
    return [self.budgetDevicesPath(), deviceFileName].join("/")
  }
  self.fullBudgetPath = ko.computed(function(){
    if(self.device()){
      return [self.budgetDataPath(), self.device().deviceGUID].join("/");
    }
  })
  self.fullBudgetSettings = ko.computed(function(){
    return [self.fullBudgetPath(), "budgetSettings.ybsettings"].join("/");
  })
  self.fullBudgetFile = ko.computed(function(){
    return [self.fullBudgetPath(), "Budget.yfull"].join("/");
  })

  self.loading = function(percent, message) {
    self.loadingProgress(percent);
    self.loadingMessages.unshift(message);
  }

  self.select = function(budget){
    self.budget(budget);
    self.device(null);

    self.loading(10, "Looking up where the YNAB data folder is ...");
    client.loadJson(self.budgetMetaPath()).then(function(data){
      self.loading(20, "Reading the YNAB data folder ...");
      self.budgetDataFolder(data.relativeDataFolderName);
      client.readDir(self.budgetDataPath()).then(function(){
        self.loading(40, "");
        client.readDir(self.budgetDevicesPath()).then(function(deviceFiles){
          self.loading(60, "Figuring out which device has the latest version ...");
          async.eachLimit(deviceFiles, 1, function(deviceFile, callback){
            if(self.device()) {
              callback()
            }else{
              var deviceFilePath = self.deviceFilePath(deviceFile);
              client.loadJson(deviceFilePath).then(function(device){
                if(device.hasFullKnowledge){
                  self.device(device);
                }
                callback();
              }).fail(function(){
                callback(true);
              })
            }
          }, function(err){
            if(!err) {
              self.loading(90, "Downloading the latest version of the data ...");
              client.loadJson(self.fullBudgetFile()).then(function(budget){
                self.loading(100);
                var categories = _.chain(budget.masterCategories).map(function(masterCategory){
                  return masterCategory.subCategories;
                }).flatten().filter(function(c) { return c; }).value();

                app.payee.payees(budget.payees)
                app.category.categories(categories);
                
                app.account.accounts(budget.accounts.sort(function(a, b) {
                  return a.sortableIndex - b.sortableIndex;
                }))

                app.transaction.transactions(budget.transactions.filter(function(transaction){
                  return !transaction.isTombstone;
                }).sort(function(a, b) {
                  return a.date.localeCompare(b.date);
                }))
              }).fail(function(){
                self.errorMessage("Error reading the budget file.")
              })
            } else {
              self.errorMessage("Error figuring out which devices has the latest version")
            }
          })
        }).fail(function(){
          self.errorMessage("Error reading " + self.budgetDevicesPath())
        })
      }).fail(function(){
        self.errorMessage("Error reading " + self.budgetDataPath())
      })
    }).fail(function(){
      self.errorMessage("Error loading " + self.budgetMetaPath())
    })
  }
}
