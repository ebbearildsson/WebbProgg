export default function SelectOption({hook, list, name}) {
    return <div>
    <h5>Välj {name}</h5>
    <select 
        required 
        className="form-select" 
        aria-label="Default select example" 
        defaultValue={'Välj' + name}
        onChange={(event) => hook(event.target.value)}>
    {list.map(([ingredient, price]) => <option key={ingredient} className="col-4" value={ingredient}>{ingredient} ({price} kr)</option>)}
    </select>
    </div>;
}