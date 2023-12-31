export default function SelectOption({hook, value, list, name}) {
    return <div>
    <h5>Välj {name}</h5>
    <select 
        required 
        className="form-select" 
        aria-label="Default select example" 
        value={value}
        onChange={(event) => hook(event.target.value)}>
        <option disabled key="donotchoose" className="col-4" value="">Välj {name}</option>
        {list.map(([ingredient, price]) => 
            <option key={ingredient} className="col-4" value={ingredient}>{ingredient} ({price} kr)</option>
        )}
        </select>
        <div className="invalid-feedback"> Dålig!!</div>
    </div>;
}