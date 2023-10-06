import { v4 as uuid } from "uuid";

class Salad {
    uuid = uuid();
    ingredients = {};

    constructor(salad) {
      if(salad) {
        this.ingredients = {...salad.ingredients};
        this.uuid = salad.uuid;
      }
    }

    add(name, properties) {
        this.ingredients[name] = properties;
        return this;
    }

    remove(name) {
        delete this.ingredients[name];
        return this;
    }

    static parse(json) {
        if(typeof json === 'string') {
            let salad = JSON.parse(json);
            if(Array.isArray(salad)) {
            return salad.map((s) => new Salad(s));
            } else {
            return new Salad(salad);
            }
        } else {    
            return json.map((s) => new Salad(s));
        }
    }

    toArr() {
        return Object.keys(this.ingredients);
    }
}

Salad.prototype.getPrice = function () {
    return Object.keys(this.ingredients)
        .map((ingredient) => this.ingredients[ingredient].price)
        .reduce((pre, cur) => pre + cur, 0);
};

Salad.prototype.count = function (prop) {
    return Object.keys(this.ingredients).filter(
        (ingredient) => this.ingredients[ingredient][prop]
    ).length;
};

Salad.prototype.prettyPrint = function () {
    return Object.keys(this.ingredients)
        .reduce((pre, cur) => pre + ", " + cur, "")
        .slice(2);
};

export default Salad;
