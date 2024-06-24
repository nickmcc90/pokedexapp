import { useState } from 'react'
import './styles/App.css'
import APIcall from './components/APIcall';
import Header from './components/header';
import Teamspace from './components/teamspace';
import Cardspace from './components/cardspace';

function App() {

  const [pokemon, setPokemon] = useState([]); // default and shiny images
  console.log(pokemon)
  const [names, setNames] = useState([]); // names
  console.log(names);
  const [baseXP, setBaseXP] = useState([]); // base XP
  console.log(baseXP)
  const [move, setMove] = useState([]); // move name
  console.log(move)
  const [moveInfo, setMoveInfo] = useState([]); // move info
  console.log(moveInfo);
  const [team, setTeam] = useState([]) // pokemon added to team.

  const [pokeLoad, setPokeLoad] = useState(10);

  function handlePokeLoad() {
    let number = pokeLoad + 10;
    setPokeLoad(number)
  }

  return (
    <>
      <Header />
      <APIcall pokeLoad={pokeLoad} pokemon={pokemon} setPokemon={setPokemon} setNames={setNames} setBaseXP={setBaseXP} setMove={setMove} setMoveInfo={setMoveInfo}/>

      <Teamspace />
      <Cardspace pokeLoad={pokeLoad} pokemon={pokemon} names={names} baseXP={baseXP} move={move} moveInfo={moveInfo}/>

    </>
  );
}

export default App;


// We gotta add the poke API to our firebase... then grab it from the database. Next time 4/1/24

// figure out why we cant call from a second api link.... 4/2/24

// what i did is make another handleresponse function to call once we have a nested url

// YYOOOOOOO i solved it!!! Once you have your first urls in a html element from mapping the results,
// it'll be trapped within an object. You need to get the data from this object by console.log-ing the
// object, then figuring out what dot notation you need to take. Check APIcall.jsx for this knowledge!!!


// We can have multiple arguments in a .then call if a previous .then returns an object. We can use the keys
// within this previously returned object as arguments within curly brackets 
// Ex:
/* 

myPromise.then(a => {
    var b = 122;
    return {
        a,
        b,
        c: 'foo'
    };
}).then(({ a, b, c }) => {
    console.log(a);
    console.log(b);
    console.log(c);    
});

*/

// 1. Optimize API call to not use all the handleResponse code, have some test cases to handle things accordingly. We
// can do this in part by being able to pass multiple arguments into the .then when we call the handleResponse function.
// 2. Store images an array just like we can do the names.
// 3. Dont forget that we need to load more, so we need to reuse these handleResponse to add more to the array, or maybe
// make a new array.





// WE GOT THE SPRITE!!!!!

// Task for tomorrow.... figure out how to have an array of front sprites and shiny front sprites.
// Do the front sprites first.

//Task for tomorrow.... get base_XP and a random move's statistics in arrays.


// Next task.... make a card format.