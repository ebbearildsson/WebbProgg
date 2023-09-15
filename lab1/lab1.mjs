'use strict';
import { v4 as uuidv4 } from 'uuid';

/**
 * Reflection question 1
 * Since we can provide any number arguments without error in JS
 */

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * Differences will show when we iterate over ex. methods, since in iterates 
 * over all enumerable object whike of iterates over the elements.
 * Since for each is in the prototype and not the object.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv).filter(name => inv[name][prop]).map(name =>
    `<option value="${name}" key="${name}"> ${name}, ${inv[name].price} kr</option>`)
    .reduce((a, b) => a + b + "\n", ''); // added newline to make it easier to read
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  uuid = uuidv4(); // use this in the constructor
  static instanceCounter = 0;
  constructor(salad) {
    this.id = 'salad_' + Salad.instanceCounter++;
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

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
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
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
/**
 * Reflection question 3
 * 
 * Constructor functions, prototypes and classes are all ways to create objects in JS.
 * 
 * typeof Salad: function
 * typeof Salad.prototype: object
 * typeof Salad.prototype.prototype: undefined
 * typeof myCaesarSalad: object
 * typeof myCaesarSalad.prototype: undefined
 * check 1: false
 * check 2: true
 * check 3: true
 * 
 */


console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
class GourmetSalad extends Salad {
  constructor() {
    super();
  }
}

GourmetSalad.prototype.add = function(name, properties, amount = 1) {
  let newProperties = Object.assign({}, properties);
  newProperties['amount'] = amount;
  if (this[name]) newProperties['amount'] += this[name]['amount'];
  Salad.prototype.add(name, newProperties);
  return this;
}

GourmetSalad.prototype.getPrice = function() {
  let price = 0;
  for (let ingredient in this) {
    if(typeof this[ingredient] !== typeof function(){} && ingredient !== 'id' && ingredient !== 'uuid') {
      price += this[ingredient].price * this[ingredient].amount;
    }
  }
  return price;
}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 * They should be in the prototype so that they are not copied for every object.
 */
/**
 * Reflection question 5
 * Yes, by using Object.defineProperty() and setting writable to false.
 */
/**
 * Reflection question 6
 * Yes its possible through adding a # in front of the variable name.
 */
