import React from 'react';
import Card from '../components/pokecard';
import '../styles/cardspace.css'

export default function Cardspace(props) {

  const { pokemon, names, baseXP, move, moveInfo, handlePokeLoad } = props;

  return (
    <div className="card-grid">
      {names.map((name, index) => {
        return (
          <div>
            <Card handlePokeLoad={handlePokeLoad} pokemon={pokemon[index]} name={name} baseXP={baseXP[index]} move={move[index]} moveInfo={moveInfo[index]}/>
          </div>
        )
      })}
    </div>
  )
}
