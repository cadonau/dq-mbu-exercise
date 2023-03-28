import './styles/App.css';
// import './styles/custom.scss';
import Home from './pages/Home';
import About from './pages/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />

    },
    {
      path: "/about",
      element: <About />
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

