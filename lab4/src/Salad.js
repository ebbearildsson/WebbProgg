import { v4 as uuid } from "uuid";

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

    //Return a salad object or a list of salad objects from a JSON string
    static parse(salads) {
        if (typeof salads === "string") {
            salads = JSON.parse(salads);
        }
        if (Array.isArray(salads)) {
            return salads.map((salad) => new Salad(salad));
        } else {
            return [new Salad(salads)];
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
