function AccountList(settings) {
  var self = this;
  self.accounts = settings.accounts;
  self.title = settings.title;
  self.show = ko.observable(settings.show);
  self.toggle = function(){
    self.show(!self.show());
  }
}