import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home";
import Balance from "./pages/balance";
import Layout from "./components/layout";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="balance" element={<Balance />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default Router;
