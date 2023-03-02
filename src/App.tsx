import { Layout } from "@/components/ui";
import Recipes from "@/pages/recipes/all-recipe";
import NewRecipe from "@/pages/recipes/new-recipe";
import EditRecipe from "@/pages/recipes/edit-recipe";
import Categories from "@/pages/categories/all-categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            {
                element: <Categories />,
                path: "/categories",
            },
        ],
    },
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />;
        </QueryClientProvider>
    );
}

export default App;
