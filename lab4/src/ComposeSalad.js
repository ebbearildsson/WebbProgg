import { useState } from "react";
import Salad from "./Salad";
import SelectOption from "./SelectOption";

import {
    useOutletContext,
    useNavigate,
    useLoaderData,
} from "react-router-dom";

export default function ComposeSalad({ onOrder: handleOrder }) {
    const inventory = useLoaderData();
    let salads = useOutletContext().salads;
    let setSalad = useOutletContext().setSalad;

    const foundationList = Object.keys(inventory)
        .filter((name) => inventory[name].foundation)
        .map((name) => [name, inventory[name].price]);
    const proteinList = Object.keys(inventory)
        .filter((name) => inventory[name].protein)
        .map((name) => [name, inventory[name].price]);
    const extraList = Object.keys(inventory)
        .filter((name) => inventory[name].extra)
        .map((name) => [name, inventory[name].price]);
    const dressingList = Object.keys(inventory)
        .filter((name) => inventory[name].dressing)
        .map((name) => [name, inventory[name].price]);

    const [foundation, setFoundation] = useState("");
    const [extras, setExtra] = useState({});
    const [dressing, setDressing] = useState("");
    const [protein, setProtein] = useState("");
    const navigate = useNavigate();

    const handleCheck = (event) => {
        let updatedList = { ...extras };
        updatedList[event.target.value] = !updatedList[event.target.value];
        setExtra(updatedList);
    };

    const handleSubmit = (event) => {
        // Validate form
        event.preventDefault();
        event.target.classList.add("was-validated");
        if (!event.target.checkValidity() || Object.keys(extras).length < 2)
            return;

        // Create salad
        let salad = new Salad();
        salad.add(foundation, inventory[foundation]);
        salad.add(dressing, inventory[dressing]);
        salad.add(protein, inventory[protein]);
        Object.keys(extras).forEach((name) => salad.add(name, inventory[name]));

        // Export salad
        setSalad([...salads, salad]);
        window.localStorage.setItem("salads", JSON.stringify(salads));

        // Navigate to view-order
        navigate(`/view-order/confirm/${salad.uuid}`);

        // Reset form
        setFoundation("");
        setExtra({});
        setDressing("");
        setProtein("");
    };

    return (
        <div className="row h-200 p-5 bg-light border rounded-3 salad-maker">
            <form onSubmit={handleSubmit} noValidate>
                <span className="fs-4">Ingredienser</span>
                <SelectOption
                    name="bas"
                    hook={setFoundation}
                    value={foundation}
                    list={foundationList}
                />
                <SelectOption
                    name="protein"
                    hook={setProtein}
                    value={protein}
                    list={proteinList}
                />
                <h5>Välj extra</h5>
                <div className="group">
                    {extraList.map(([name, price]) => (
                        <span key={name}>
                            <input
                                type="checkbox"
                                checked={extras[name] ?? false}
                                className="btn-check"
                                id={name}
                                autoComplete="off"
                                onChange={handleCheck}
                                value={name}
                            ></input>
                            <label
                                className="btn btn-outline-primary"
                                htmlFor={name}
                            >
                                {name} ({price} kr)
                            </label>
                        </span>
                    ))}
                </div>
                <SelectOption
                    name="dressing"
                    hook={setDressing}
                    value={dressing}
                    list={dressingList}
                />
                <button
                    type="submit"
                    value="submit"
                    className="btn btn-primary m-3"
                >
                    Lägg till sallad
                </button>
            </form>
        </div>
    );
}
