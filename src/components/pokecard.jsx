import '../styles/Card.css';
import React from 'react';

export default function Card(props) {

  const { pokemon, name, baseXP, move, moveInfo } = props;

  // console.log(pokemon)

  return (
    <div>
      <div className="card-color">
        <div className="name">{name}</div>
        <div>
          <img src={pokemon.default} />
          <img src={pokemon.shiny} />
        </div>
        <div className="move"></div>
        <div className="move-info"></div>
        <div className="base-XP"></div>
      </div>
    </div>
  )
}