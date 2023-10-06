import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "./NavBar";
import Salad from "./Salad";
import React from "react";
//import inventory from "./inventory.mjs";
import { Outlet, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export default function App() {
    const [salads, setSalad] = useState(window.localStorage.getItem("salads") ? Salad.parse(window.localStorage.getItem("salads")) : []);
    
    useEffect(() => {
            localStorage.setItem("salads", JSON.stringify(salads));
    }, [salads]);
    
    useEffect(() => {
        const salads = JSON.parse(localStorage.getItem("salads"));
        if (salads) {
            setSalad(Salad.parse(salads))
        }
    }, []);

    const navigation = useNavigation();
    return (
        <div className="container py-4">
            <header className="pb-3 mb-4 border-bottom">
                <span className="fs-4">Min egen salladsbar</span>
            </header>

            <NavBar />

            {navigation.state === "loading" ? (
                <Spinner />
            ) : (
                <Outlet context={{ salads, setSalad }} />
            )}

            <footer className="pt-3 mt-4 text-muted border-top">
                EDAF90 - webbprogrammering
            </footer>
        </div>
    );
}

/*
 * Reflection questions:
 *
 * Reflection question 1:
 * The render function must be a pure function of props and the
 * component state, the values returned by useState(). What happens if the output of the
 * render function is depending on other data that changes over time?
 *
 * Answer:
 * The render function will be called again and again, and the component will be re-rendered.
 *
 * Reflection question 2:
 * In the code above, the foundations array is computed every time
 * the component is rendered. The inventory changes very infrequent so you might think this
 * is inefficient. Can you cache foundations so it is only computed when props.inventory
 * changes?
 *
 * Answer:
 * Yes, we can use useMemo() to cache the foundations array.
 *
 * Reflection question 3:
 * Should you move the foundation state to the MySaladSelect component above?
 *
 * Answer:
 * No, because the foundation state is used in the ComposeSalad component.
 * Thus it would require lots of props to be passed down.
 *
 * Reflection question 4:
 * What triggers react to call the render function and update the DOM?
 *
 * Answer:
 * When the state of the component changes.
 *
 * Reflection question 5:
 * When the user change the html form state (DOM), does this change the state of your component?
 *
 * Answer:
 * Yes, beacuse the state is hooked into the onChange event of the form.
 *
 * Reflection question 6:
 * What is the value of this in the event handling call-back functions?
 *
 * Answer:
 * The value of this is the object that the event was triggered on.
 *
 * Reflection question 7:
 * How is the prototype chain affected when copying an object with copy = {...sourceObject}?
 *
 * Answer:
 * It is not affected. Instead the new copy simply inherits the prototype of the sourceObject.
 */
