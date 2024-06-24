import '../styles/Card.css';
import React from 'react';

export default function Card(props) {

  const { pokemon, name, baseXP, move, moveInfo, handlePokeLoad } = props;

  console.log(pokemon)

  return (
    <div>
      <div className="card-color">
        <div className="name-and-image-container">
          <div className="name">{name}</div>
          <div className="img-container">
            <img src={pokemon.default} />
            <img src={pokemon.shiny} />
          </div>
        </div>
        <div className="move-and-baseXP-container">
          <div className="move">Ability: {move}</div>
          <div className="base-XP">Base XP: {baseXP}</div>
        </div>
        <div className="move-info">{moveInfo}</div>
        <button className="add-to-team">Add to Team</button>
      </div>
    </div>
  )
}