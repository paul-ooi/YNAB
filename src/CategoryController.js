function CategoryController(settings) {
  var self = this;
  self.categories = ko.observableArray();

  var lookup = ko.computed(function(){
    return _.indexBy(self.categories(), 'entityId')
  })

  var specialLookup = {
    "Category/__ImmediateIncome__": { name: "Income" }
  }

  self.lookup = function(id) {
    return lookup()[id] || specialLookup[id] || {};
  }
}