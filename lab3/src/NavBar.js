import { NavLink } from "react-router-dom";


export default function Navbar(props) {
    return (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <NavLink className="nav-link" to="/">
                Hem
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/compose-salad">
                Komponera en sallad
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/view-order">
                Se din order
            </NavLink>
        </li>
    </ul>
    );
}