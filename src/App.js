import './styles/App.css';
import './styles/custom.scss';
import Home from './pages/Home';
import Tagesmenu from './pages/Tagesmenu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LunchMenu from "./pages/LunchMenu";
import Login from "./pages/Login";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />

    },
    {
      path: "/tagesmenu",
      element: <Tagesmenu />
    },
    {
      path: "/lunch-menu",
      element: <LunchMenu />
    },
    {
      path: "/login",
      element: <Login />
    }

  ]);

  return (

    <>
      {/* <MainNavigation /> */}
      <RouterProvider router={router} />
    </>

  );
}



export default App;

