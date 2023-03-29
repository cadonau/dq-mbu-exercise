import './styles/App.css';
import './styles/custom.scss';
import Home from './pages/Home';
import About from './pages/About';
import AdressForm from './pages/AdressForm';
import Tagesmenu from './pages/Tagesmenu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />

    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/adressform",
      element: <AdressForm />
    },
    {
      path: "/tagesmenu",
      element: <Tagesmenu />
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

