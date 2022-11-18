import BaseClass from './BaseClass.js';
export default class Account extends BaseClass {

  constructor(account){
    super();
    this.id = account.id
    this.name = account.name
  }

}
