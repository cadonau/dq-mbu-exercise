import './styles/App.css';
import './styles/custom.scss';
import Home from './pages/Home';
import Tagesmenu from './pages/Tagesmenu';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LunchMenu from "./pages/LunchMenu";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import LunchRegistration from "./pages/LunchRegistration";

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
      element: <RequireAuth />,
      children: [
        {
          path: "/lunch-menu",
          element: <LunchMenu />
        },
        {
          path: "/lunch-registration",
          element: <LunchRegistration />
        }
      ]
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

