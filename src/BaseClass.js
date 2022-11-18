export default class BaseClass {
  #id;
  #name;

  get id () {
    return this.#id;
  }

  set id (id) {
    this.#id = id;
  }

  get name () {
    return this.#name;
  }

  set name (name) {
    this.#name = name;
  }
}