import React, { useEffect } from 'react';
import { database } from '../database.js';
import { get, ref, child, set, update, remove } from 'firebase/database';

export default function APIcall(props) {

    const { setPokemon, setNames, setBaseXP, setMove, setMoveInfo, pokeLoad } = props;

    const handleFetch = (response) => {
      // console.log(response.status)
      return response.json();
    }

    let pokeImgs = [];
    let infoDrop = [];
    const handleResponse3 = (response) => {   // we can store the pokeImgs in an array, then set that array equal to the state variable. 
      if(response.sprites) {
              // image code
              let frontImgPath = response.sprites.front_default;
              let shinyImgPath = response.sprites.front_shiny;

              pokeImgs.push({default: frontImgPath, shiny: shinyImgPath})
              console.log(pokeImgs)

              setPokemon(pokeImgs)

      } else if (response.effect_entries) {
              // move code
              if(response.flavor_text_entries[0].language.name === "ja") {
                infoDrop.push(response.flavor_text_entries[1].flavor_text);
                setMoveInfo(infoDrop);
              } else {
                infoDrop.push(response.flavor_text_entries[0].flavor_text);
                setMoveInfo(infoDrop);
              }
      }

    }

    let XP = [];
    let moveName = [];
    const handleResponse2 = (response) => {
      // base xp code. We grab each XP found
      XP.push(response.base_experience);
      setBaseXP(XP);

      // move name code
      moveName.push(response.abilities[0].ability.name);
      setMove(moveName);

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


    const handleResponse = (response) => {      // handleResponse grabs the names and a deeper api url.
      const respPoke = response.results.map((item) => (item.name));
      setNames(respPoke);

      //deeper URL
      const pokeUrl = response.results.map((item) => (item.url));

      console.log(pokeUrl);

      pokeUrl.forEach((thing) => {
        fetch(thing)
        .then(handleFetch)
        .then(handleResponse2)
        .catch(handleError)
      })
    }

    const handleError = (error) => {
      console.log(error);
      setPokemon(<li>Network Error! Help!</li>)
    }

    useEffect(() => {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokeLoad}&offset=0`;
      fetch(url)
      .then(handleFetch)
      .then(handleResponse)
      .catch(handleError)
    }, [])


    return (
      <div>
      </div>
    );
}