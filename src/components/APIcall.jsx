import React, { useState, useEffect } from 'react';

export default function APIcall() {

    const [pokemon, setPokemon] = useState();

    const handleFetch = (response) => {
      console.log(response.status)
      return response.json();
    }

    const handleResponse = (response) => {
      const respPoke = response.results;

      setPokemon(respPoke);
      //this allows other components to call what they need from the API
    }

    const handleError = (response) => {
      console.log(error);
      setPokemon(<li>Network Error!</li>)
    }

    useEffect(() => {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
      fetch(url)
      .then(handleFetch)
      .then(handleResponse)
      .catch(handleError)
    }, [])


    return pokemon;
}