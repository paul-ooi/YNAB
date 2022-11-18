import BaseClass from './BaseClass.js';
export default class Budget extends BaseClass {

  constructor(budget){
    super();
    this.id = budget.id
    this.name = budget.name
  }

}
