export default function Toast(props) {
    return (
        <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-header">
                <p className="rounded mr-2">🍞</p>
                <strong className="mr-auto">Bootstrap</strong>
                <small className="text-muted">11 mins ago</small>
                <button
                    type="button"
                    className="ml-2 mb-1 close"
                    data-dismiss="toast"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">{props.confirmation}</div>
        </div>
    );
}
