import './styles/App.css';
import './styles/custom.scss';
import Home from './pages/Home';
import Tagesmenu from './pages/Tagesmenu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LunchMenu from "./pages/LunchMenu";

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

