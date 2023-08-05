import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Home } from "./pages";
import ErrorPage from "./pages/error-page";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} /> <Toaster />
    </>
  );
};

export default App;
