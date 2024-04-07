import React, { useState, useEffect } from 'react';
import { database } from '../database.js';
import { get, ref, child, set, update, remove } from 'firebase/database';

export default function APIcall() {

    const [pokemon, setPokemon] = useState();

    const handleFetch = (response) => {
      // console.log(response.status)
      return response.json();
    }


    const frontDefaultArray = [];
    const frontShinyArray = [];
    const moveText = [];
    const handleResponse3 = (response) => {
      if(response.sprites) {
              // image code
              let frontImgPath = response.sprites.front_default;
              let shinyImgPath = response.sprites.front_shiny;
              frontDefaultArray.push(frontImgPath);
              frontShinyArray.push(shinyImgPath);


              if(frontShinyArray.length === 10) {
                // const everything = frontDefaultArray.map((item) => <img src={item} />)
                // const everythingTwo = frontShinyArray.map((item) => <img src={item} />)

                const combinedArray = [];
                for(let i = 0; i < frontShinyArray.length; i++) {
                  combinedArray.push(frontDefaultArray[i]);
                  combinedArray.push(frontShinyArray[i]);
                }

                const everything = combinedArray.map((item) => <img src={item}/>);


                setPokemon(<div>{everything}</div>)

                // setPokemon(<div>{everything}{everythingTwo}</div>)
              }
      } else if (response.effect_entries) {
              // move code
              if(response.flavor_text_entries[0].language.name === "ja") {
                moveText.push(response.flavor_text_entries[1].flavor_text);
              } else {
                moveText.push(response.flavor_text_entries[0].flavor_text);
              }
              console.log(moveText);
      }
    }

    const baseXPList = [];
    const randomMoveInfo = {};
    const moveNames = [];
    const handleResponse2 = (response) => {
      // base xp code
      baseXPList.push(response.base_experience);
      // console.log(baseXPList);

      // random move info code
      moveNames.push(response.abilities[0].ability.name);
      console.log(moveNames);
      const moveUrl = response.abilities[0].ability.url;
      fetch(moveUrl)
      .then(handleFetch)
      .then(handleResponse3)
      .catch(handleError)

      // image code
      const evenDeeperUrl = response.forms[0].url;

      fetch(evenDeeperUrl)
      .then(handleFetch)
      .then(handleResponse3)
      .catch(handleError)

    }


    const handleResponse = (response) => {
      //names. we save the names into an array too.
      const respPoke = response.results.map((item) => <li>{item.name}</li>);
      const namesArray = [];
      respPoke.forEach((pokepoke) => {
        namesArray.push(pokepoke.props.children);
      })
      // console.log(namesArray);

      //pictures
      const pokeUrl = response.results.map((item) => <li>{item.url}</li>);

      /*
        Here, pokeUrl is an html element with all the urls inside. But they aren't just urls, they are objects
        with different keys, and the urls lie within the key 'children'. We need to access this 'children' key
        and put them into an array. With this, we can now put each link into another handleResponse function to
        get its data.
      */

      const deeperUrls = []

      pokeUrl.forEach((urlThing) => {
        deeperUrls.push(urlThing.props.children);
      })
      // console.log(deeperUrls[0]);

      deeperUrls.forEach((thing) => {
        fetch(thing)
        .then(handleFetch)
        .then(handleResponse2)
        .catch(handleError)
      })

      // console.log(frontDefaultArray);
      
      // const sprites = frontDefaultArray.map((item) => <img src={item} />)

      // setPokemon(sprites);

      // console.log(sprites);

      // fetch(deeperUrls[0])
      // .then(handleFetch)
      // .then(handleResponse2)
      // .catch(handleError)


      // const frontImgPaths = pokeUrl.map((item) => <li>{item.base_experience}</li>)

      // frontImgPaths = <li>{url.forms.sprites.front_default}</li>;

      //this allows other components to call what they need from the API
      //we should add things to the database here
    }

    const handleError = (error) => {
      console.log(error);
      setPokemon(<li>Network Error! Help!</li>)
    }

    useEffect(() => {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
      fetch(url)
      .then(handleFetch)
      .then(handleResponse)
      .catch(handleError)
    }, [])


    return (
      <div>
      {pokemon}
      </div>
    );
}