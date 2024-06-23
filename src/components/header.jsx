import '../styles/header.css'
import masterball from '../icons/game.png'

export default function Header() {
  return (
    <>
      <h1 className="header">Pokedex Pokemon Viewer</h1>
      <div className="img-container">
        <img className="masterball" src={masterball} />
      </div>
    </>
  )
}