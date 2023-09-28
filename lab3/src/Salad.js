import { v4 as uuid } from 'uuid';

class Salad {
  uuid = uuid(); // use this in the constructor

  constructor(salad) {
    if(salad instanceof Salad){
      Object.keys(salad).forEach(ingredient => this.add(ingredient, salad[ingredient]));
    }
  }

  add(name, properties) {
    this[name] = properties;
    return this;
  }

  remove(name) {
    delete this[name];
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
  return Object.keys(this)
    .filter(ingredient => ingredient !== 'id' && ingredient !== 'uuid')
    .map(ingredient => this[ingredient].price)
    .reduce((pre, cur) => pre + cur, 0);
}

Salad.prototype.count = function (prop) {
  return Object.keys(this)
    .filter(ingredient => this[ingredient][prop])
    .length;
}

Salad.prototype.prettyPrint = function () {
    return Object.keys(this)
    .filter(ingredient => ingredient !== 'id' && ingredient !== 'uuid')
    .reduce((pre, cur) => pre + ', ' + cur, '')
    .slice(2);
}

export default Salad;