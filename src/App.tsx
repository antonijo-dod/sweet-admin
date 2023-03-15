import { Layout } from "@/components/ui";
import { ProtectedRoute } from "@/containers";
import Recipes from "@/pages/recipes/all-recipe";
import NewRecipe from "@/pages/recipes/new-recipe";
import EditRecipe from "@/pages/recipes/edit-recipe";
import Categories from "@/pages/categories/all-categories";
import Login from "@/pages/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "@/context/authContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/new" element={<NewRecipe />} />
              <Route path="/recipes/:slug/edit" element={<EditRecipe />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
