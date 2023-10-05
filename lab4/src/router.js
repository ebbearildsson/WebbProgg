import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "./Confirm";

const router = createBrowserRouter(
    [
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <div>
                        <h1>Henlo!</h1>
                        <p>🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷🤷</p>
                    </div>
                ),
            },
            {
                path: "/compose-salad",
                element: <ComposeSalad />,
            },
            {
                path: "/view-order",
                element: <ViewOrder />,
                children: [
                    {
                        path: "confirm/:saladId",
                        element: <Confirm />,
                    },
                ],
            },
            {
                path: "*",
                element: (
                    <div>
                        <h1>Oopsie Woopsie We could not find the file xD</h1>
                        <p>🏋️‍♂️🛒🍅</p>
                    </div>
                ),
            },
        ],
    },
]);
export default router;
