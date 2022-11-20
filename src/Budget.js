import BaseClass from './BaseClass.js';
import budgetTerms from '../data/budgetTerms.json' assert {type: 'json'};

// import budgets from '../data/accounts.json' assert {type: 'json'};

export default class Budget extends BaseClass {

  constructor(budgetId){
    super();
    this.id = budgetId
  }

  static getById(id) {
    for (const budget of budgetTerms) {
      if (budget.id == id) return budget
    }
  }

}
