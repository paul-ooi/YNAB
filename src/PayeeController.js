function PayeeController(settings){
  var self = this;
  self.payees = ko.observableArray();

  var lookup = ko.computed(function(){
    return _.indexBy(self.payees(), 'entityId')
  })

  self.lookup = function(id) {
    return lookup()[id] || {};
  }
}