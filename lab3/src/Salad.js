import { v4 as uuid } from 'uuid';

class Salad {
  uuid = uuid();
  ingredients = {};

  constructor(salad) {
    salad = salad || {};
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  static parse(...salads) {
    return salads.map(salad => {
      let saladObj = JSON.parse(salad);
      Object.setPrototypeOf(saladObj, Salad.prototype);
      return saladObj;
    })[0];
  }
}

Salad.prototype.getPrice = function () {
  return Object.keys(this.ingredients)
    .reduce((pre, cur) => pre.price + cur.price, 0);
}

Salad.prototype.count = function (prop) {
  return Object.keys(this.ingredients)
    .filter(ingredient => this.ingredients[ingredient][prop])
    .length;
}

Salad.prototype.prettyPrint = function () {
    return Object.keys(this.ingredients)
    .reduce((pre, cur) => pre + ', ' + cur, '')
    .slice(2);
}

export default Salad;