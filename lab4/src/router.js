import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirm from "./Confirm";

async function categoryLoader(category) {
    const categoryData = await fetch(`http://localhost:8080/${category}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
    return categoryData;
}

async function fetchIngredient(category, ingredient) {
    const ingredientData = await fetch(
        `http://localhost:8080/${category}/${ingredient}`
    )
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.error(error));
    return ingredientData;
}

async function fetchAllIngredients(category) {
    const categoryData = await categoryLoader(category);
    const ingredients = await Promise.all(
        categoryData.map(async (ingredient) => {
            const ingredientData = await fetchIngredient(category, ingredient);
            return { [ingredient]: ingredientData };
        })
    );
    return ingredients;
}

async function loadInventory() {
    const categories = ["foundations", "proteins", "extras", "dressings"];
    let inventory = {};

    await Promise.all(
        categories.map(async (category) => {
            const ingredients = await fetchAllIngredients(category);
            ingredients.forEach((ingredient) => {
                const name = Object.keys(ingredient)[0];
                inventory[name] = ingredient[name];
            });
        })
    );
    //console.log(inventory);
    return inventory;
}

async function inventoryLoader() {
    const inventory = await loadInventory();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return inventory;
}

//How do I show a Spinner if any of the routes are loading?



const router = createBrowserRouter([
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
                loader: inventoryLoader,
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
