import './styles/App.css'
import masterball from './icons/game.png'

function App() {
  return (
    <body>
      <h1 className="header">Pokedex Pokemon Viewer</h1>
      <div className="img-container">
        <img className="masterball" src={masterball} />
      </div>


      <button>Load more...</button>

    </body>
  );
}

export default App;
