import { Layout } from "@/components/ui";
import Recipes from "@/pages/recipes/all-recipe";
import NewRecipe from "@/pages/recipes/new-recipe";
import EditRecipe from "./pages/recipes/edit-recipe";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <Recipes />,
                index: true,
            },
            {
                path: "/recipes/new",
                element: <NewRecipe />,
            },
            {
                path: "/recipes/:id/edit",
                element: <EditRecipe />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
