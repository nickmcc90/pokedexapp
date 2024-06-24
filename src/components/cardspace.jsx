import React from 'react';
import Card from '../components/pokecard';

export default function Cardspace(props) {

  const { pokemon, names, baseXP, move, moveInfo } = props;

  return (
    <div>
      {names.map((name, index) => {
        return (
          <div>
            <Card pokemon={pokemon[index]} name={name} baseXP={baseXP[index]} move={move[index]} moveInfo={moveInfo[index]}/>
          </div>
        )
      })}
    </div>
  )
}
