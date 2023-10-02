import { useParams, useOutletContext } from "react-router-dom";

export default function Confirm(props) {
    let { salads } = useOutletContext();
    let { saladId } = useParams();
    let ourSalad = salads.find(salad => salad.uuid === saladId)
    if (ourSalad) {
        return (
            <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <strong>Holy guacamole!</strong> Nice Salad you got there, { ourSalad.prettyPrint() } Confirmed!)
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    return (
        <div>Error?</div>
    )
}
