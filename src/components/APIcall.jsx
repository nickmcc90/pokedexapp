import React, { useState, useEffect } from 'react';
import { database } from '../database.js';
import { get, ref, child, set, update, remove } from 'firebase/database';

export default function APIcall() {

    const [pokemon, setPokemon] = useState();

    const handleFetch = (response) => {
      console.log(response.status)
      return response.json();
    }

    const handleResponse = (response) => {
      //names
      const respPoke = response.results.map((item) => <li>{item.name}</li>);

      //pictures
      const pokeUrl = response.results.map((item) => <li>{item.url}</li>);

      let frontImgPaths;

      fetch(pokeUrl)
      .then((response) => {frontImgPaths = response.json().map((item) => <li>{item.base_experience}</li>)})
      .catch(setPokemon(<li>Help!</li>))

      // const frontImgPaths = pokeUrl.map((item) => <li>{item.base_experience}</li>)

      // frontImgPaths = <li>{url.forms.sprites.front_default}</li>;

      setPokemon(frontImgPaths);
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
      <ul>
      {pokemon}
      </ul>
    );
}