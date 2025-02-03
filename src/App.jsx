import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path="/" index element={<Products />} />
          <Route path="/:id" index element={<Product />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
