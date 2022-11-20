import BaseClass from './BaseClass.js';
import payees from '../data/payees.json' assert {type: 'json'};

export default class Payee extends BaseClass {

  constructor(payeeId){
    super();
    this.id = payeeId
  }

  static getById(id) {
    for (const payee of payees) {
      if (payee.id == id) return payee
    }
  }
}
