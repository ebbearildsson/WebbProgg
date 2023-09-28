import { useState } from 'react';
import Salad from './Salad';

function ComposeSalad({inventory, salads, setSalad}) {
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation).map(name => [name, inventory[name].price]);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein).map(name => [name, inventory[name].price]);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra).map(name => [name, inventory[name].price]);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing).map(name => [name, inventory[name].price]);
  
  const [foundation, setFoundation] = useState('Pasta');
  const [extras, setExtra] = useState(['Avocado', 'Bacon']);
  const [dressing, setDressing] = useState('Rhodeisland');
  const [protein, setProtein] = useState('Kycklingfilé');

  const handleCheck = (event) => {
    let updatedList = [...extras];
    if (event.target.checked) {
      updatedList = [...extras, event.target.value];
    } else {
      updatedList.splice(extras.indexOf(event.target.value), 1);
    }
    setExtra(updatedList);
  };

  const handleClick = (event) => {
    event.preventDefault();
    let ingredients = [foundation, protein, ...extras, dressing]
    let salad = new Salad();
    ingredients.forEach(ingredient => salad.add(ingredient, inventory[ingredient]));
    setSalad([...salads, salad]);
    setFoundation('Pasta');
    setExtra([]);
    setDressing('Rhodeisland');
    setProtein('Kycklingfilé');
  };

  return (
    <div className="row h-200 p-5 bg-light border rounded-3 salad-maker">
      <form onSubmit={handleClick}>
        <span className="fs-4">Ingredienser</span>
        {selectOptions(foundation, setFoundation, foundationList, 'bas')}
        {selectOptions(protein, setProtein, proteinList, 'protein')}
        <h5>Välj extra</h5>
        <div className="group">
          {extraList.map(([name, price]) => 
            <span key={name}>
              <input type="checkbox" checked={extras.includes(name)} className="btn-check" id={name} autoComplete="off" onChange={handleCheck} value={name}></input>
              <label className="btn btn-outline-primary" htmlFor={name}>{name} ({price} kr)</label>
            </span>
          )}
        </div>
        {selectOptions(dressing, setDressing, dressingList, 'dressing')}
        <button type="submit" value="submit" className="btn btn-primary">Lägg till sallad</button>
      </form>
    </div>
  );
}

export default ComposeSalad;

function selectOptions(attr, hook, list, name) {
  return <div>
    <h5>Välj {name}</h5>
    <select className="form-select" aria-label="Default select example" value={attr} onChange={(event) => hook(event.target.value)}>
    {list.map(([name, price]) => <option key={name} className="col-4" value={name}>{name} ({price} kr)</option>)}
    </select>
  </div>;
}
