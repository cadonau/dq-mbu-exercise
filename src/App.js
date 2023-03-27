import './styles/App.css';
import Navigation from './pages/Navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Test Index Site
        </p>
        <a
          className="App-link"
          href="https://www.20min.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit 20Min
        </a>
      </header>
      <body className="App-body">

        <Navigation />

      </body>

    </div>

  );
}

export default App;
