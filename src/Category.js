import BaseClass from './BaseClass.js';
export default class Category extends BaseClass {

  constructor(category){
    super();
    this.id = category.id
    this.name = category.name
  }

}
