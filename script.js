"use strict";

/* 
State 
We need to know which pokemon we are currently looking at, being displayed (by it's ID)
The current state the application is in 
*/

let pokemonID = 1;
// "1" is the url end point for the first pokemon etc

// Setup global variables for getting elements by ID

const output = document.querySelector("#output");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

// Get data fom pokemon API

async function getPokemon(url) {
  try {
    const res = await fetch(url);

    // week 6 day 3 assignment hint, status is expected to be 200 if no error
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    const pokemon = await res.json();
    return pokemon;
  } catch (error) {
    console.log(error);
  }
}

// render

function render(pokemon) {
  const name = document.createElement("p");
  const id = document.createElement("p");
  const img = document.createElement("img");

  id.textContent = "ID: " + pokemon.id;
  name.textContent = "NAme: " + pokemon.name;

    // instead of a broken img when this object end point doesn't work, put an OR statement with a placeholder img
    img.src = pokemon.sprites.front_default || "https://placehold.co/100";
  img.alt = pokemon.name;

  output.textContent = "";
  output.appendChild(id);
  output.appendChild(name);
  output.appendChild(img);
}

// Setup main function

async function main() {
  // Setup Event Listeners
  try {
    // get data on page load starting with first pokemon
    const pokemon = await getPokemon(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
    );
    console.log(pokemon);
    console.log("Ready to fetch");

    // *******Event listener for PREVIOUS *********
    prev.addEventListener("click", async () => {
      // get data when the previous button is clicked
      if (pokemonID < 2) {
        return;
      }

      pokemonID--;
      // because async, we can await

      const pokemon = await getPokemon(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
      );
      render(pokemon);
      console.log(pokemon);
    });

    // *******Event listener for NEXT *********
    next.addEventListener("click", async () => {
      // guard statement jumps the pokemon count to 10000 as there is a gap sequentially
      if (pokemonID === 1025) {
        pokemonID = 10000;
      }
      // guard statement, prevents errors when going beyond the list of pokemon in the API
      if (pokemonID >= 10325) {
        return;
      }
      // get data when the next button is clicked
      pokemonID++;

      const pokemon = await getPokemon(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonID,
      );
      render(pokemon);
      console.log(pokemon);
    });
  } catch (error) {
    console.log(error);
  }
}
main();



