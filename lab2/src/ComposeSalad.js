import { useState } from 'react';

function ComposeSalad({inventory}) {
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra).map(name => [name, inventory[name].price]);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing);
  const [foundation, setFoundation] = useState('Pasta');
  const [extras, setExtra] = useState([]);
  const [dressing, setDressing] = useState('Rhodeisland');
  const [protein, setProtein] = useState('Kycklingfilé');

  const handleCheck = (event) => {
    var updatedList = [...extras];
    if (event.target.checked) {
      updatedList = [...extras, event.target.value];
    } else {
      updatedList.splice(extras.indexOf(event.target.value), 1);
    }
    setExtra(updatedList);
  };

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
      <h5>Välj bas</h5>
      <select className="form-select" aria-label="Default select example" value={foundation} onChange={(event) => setFoundation(event.target.value)}>
        {foundationList.map(name => <option key={name} className="col-4" value={name}>{name}</option>)}
      </select>
      <h5>Välj protein</h5>
      <select className="form-select" aria-label="Default select example" value={protein} onChange={(event) => setProtein(event.target.value)}>
        {proteinList.map(name => <option key={name} className="col-4" value={name}>{name}</option>)}
      </select>
      <h5>Välj extra</h5>
        {extraList.map(name => <span key={name}>
            <input type="checkbox" className="btn-check" id={name[0]} autoComplete="off" onChange={handleCheck} value={name[0]}></input>
            <label className="btn" htmlFor={name[0]}>{name[0]} ({name[1]} kr)</label>
          </span>)}
      <h5>Välj dressing</h5>
      <select className="form-select" aria-label="Default select example" value={dressing} onChange={(event) => setDressing(event.target.value)}>
        {dressingList.map(name => <option key={name} className="col-4" value={name}>{name}</option>)}
      </select>
      <button type="button" className="btn btn-primary">Lägg till sallad</button>
      </div>
    </div>
  );
}

export default ComposeSalad;