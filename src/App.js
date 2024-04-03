import './styles/App.css'
import masterball from './icons/game.png'
import APIcall from './components/APIcall';

function App() {
  return (
    <body>
      <h1 className="header">Pokedex Pokemon Viewer</h1>
      <div className="img-container">
        <img className="masterball" src={masterball} />
      </div>

      <APIcall />

      <button>Load more....</button>

    </body>
  );
}

export default App;


// We gotta add the poke API to our firebase... then grab it from the database. Next time 4/1/24

// figure out why we cant call from a second api link.... 4/2/24