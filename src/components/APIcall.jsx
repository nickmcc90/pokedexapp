import React, { useState, useEffect } from 'react';
import { database } from '../database.js';
import { get, ref, child, set, update, remove } from 'firebase/database';

export default function APIcall() {

    const [pokemon, setPokemon] = useState();

    const handleFetch = (response) => {
      console.log(response.status)
      return response.json();
    }

    const handleResponse3 = (response) => {
      const frontImgPath = response.sprites.front_default;
      const image = <img src={frontImgPath} />;

      setPokemon(image)
    }

    const handleResponse2 = (response) => {
      const evenDeeperUrl = response.forms[0].url;
      console.log(evenDeeperUrl);

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
      console.log(namesArray);

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
      console.log(deeperUrls[0]);


      fetch(deeperUrls[0])
      .then(handleFetch)
      .then(handleResponse2)
      .catch(handleError)


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
      <ul>
      {pokemon}
      </ul>
    );
}