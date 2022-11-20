import BaseClass from './BaseClass.js';
import accounts from '../data/accounts.json' assert {type: 'json'};

export default class Account extends BaseClass {

  constructor(accountId){
    super();
    this.id = accountId
  }

  static getById(id) {
    for (const account of accounts) {
      if (account.id == id) return account
    }
  }

}
