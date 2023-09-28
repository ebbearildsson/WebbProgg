export default function SelectOption({attr, hook, list, name}) {
    return <div>
    <h5>Välj {name}</h5>
    <select className="form-select" aria-label="Default select example" value={attr} onChange={(event) => hook(event.target.value)}>
    {list.map(([name, price]) => <option key={name} className="col-4" value={name}>{name} ({price} kr)</option>)}
    </select>
    </div>;
}