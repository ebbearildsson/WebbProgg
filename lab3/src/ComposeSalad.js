import { useState } from 'react';
import Salad from './Salad';
import SelectOption from './SelectOption';

function ComposeSalad({inventory, salads, setSalad}) {
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation).map(name => [name, inventory[name].price]);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein).map(name => [name, inventory[name].price]);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra).map(name => [name, inventory[name].price]);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing).map(name => [name, inventory[name].price]);
  
  const [foundation, setFoundation] = useState('');
  const [extras, setExtra] = useState({});
  const [dressing, setDressing] = useState('');
  const [protein, setProtein] = useState('');

  const handleCheck = (event) => {
    let updatedList = extras;
    updatedList[event.target.value] = !updatedList[event.target.value];
    setExtra(updatedList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let salad = new Salad();
    salad.add(foundation, inventory[foundation]);
    salad.add(dressing, inventory[dressing]);
    salad.add(protein, inventory[protein]);
    Object.keys(extras).forEach(name => salad.add(name, inventory[name]));

    setSalad([...salads, salad]);
    setFoundation('');
    setExtra({});
    setDressing('');
    setProtein('');
  };

  return (
    <div className="row h-200 p-5 bg-light border rounded-3 salad-maker">
      <form onSubmit={handleSubmit}>
        <span className="fs-4">Ingredienser</span>
        <SelectOption name="bas" hook={setFoundation} list={foundationList} />
        <SelectOption name="protein" hook={setProtein} list={proteinList} />
        <h5>Välj extra</h5>
        <div className="group">
          {extraList.map(([name, price]) => 
            <span key={name}>
              <input type="checkbox" checked={extras[name]} className="btn-check" id={name} autoComplete="off" onChange={handleCheck} value={name}></input>
              <label className="btn btn-outline-primary" htmlFor={name}>{name} ({price} kr)</label>
            </span>
          )}
        </div>
        <SelectOption name="dressing" hook={setDressing} list={dressingList} />
        <button type="submit" value="submit" className="btn btn-primary m-3">Lägg till sallad</button>
      </form>
    </div>
  );
}

export default ComposeSalad;
