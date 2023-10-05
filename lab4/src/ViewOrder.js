import { useOutletContext, Outlet } from "react-router-dom";

export default function ViewOrder(props) {
    let salads = useOutletContext().salads;

    const placeOrder = () => {
        fetch("http://localhost:8080/orders/", {
            method: "POST",
            body: JSON.stringify(salads.map(salad => salad.toArr())),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
            <Outlet context={{salads}} />
            <span className="fs-4">Varukorg</span>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Salad(s)</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {salads.map(salad => (
                        <tr key={salad.uuid}>
                            <td>{salad.prettyPrint()}</td>
                            <td>{salad.getPrice()} kr</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={placeOrder}>Order</button>
        </div>
    );
}
