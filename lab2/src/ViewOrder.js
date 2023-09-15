export default function ViewOrder({salads}) {
    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
            <span className="fs-4">Varukorg</span>
            <table className="table table-striped table-light">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Salad(s)</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {salads.map((salad, index) => 
                <tr key={index}>
                    <td>{salad.prettyPrint()}</td>
                    <td>{salad.getPrice()} kr</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
    );
}