function calcularPokemonesMostrados() {
  let cantidadPokemones = document.querySelectorAll('.tarjeta').length;
  if (cantidadPokemones === 0) {
    cantidadPokemones = 1;
  } else {
    cantidadPokemones += 1;
  }
  return cantidadPokemones;
}

async function pedirPokemon(URL, pokemon) {
  const respuesta = await fetch(URL + pokemon);
  return respuesta.json();
}

async function pedirPokemonesPorID(pokemonAMostrar) {
  const LIMITE_POKEMONES_POR_DEFAULT = 1009;
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  if (pokemonAMostrar === LIMITE_POKEMONES_POR_DEFAULT) {
    return false;
  }
  const IDPokemon = pokemonAMostrar;
  const pokemon = await (pedirPokemon(URL, IDPokemon));
  return pokemon;
}

export async function pedirPokemonPorNombre(nombrePokemon) {
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  const pokemon = await pedirPokemon(URL, nombrePokemon);
  return pokemon;
}

export async function pedirPokemones(listaPokemones = false) {
  let pokemonAMostrar = calcularPokemonesMostrados();
  let ultimoPokemonAMostrar;
  if (pokemonAMostrar === 1) {
    ultimoPokemonAMostrar = 20;
  } else {
    ultimoPokemonAMostrar = pokemonAMostrar + 19;
  }
  const respuestasPokemones = [];
  for (
    pokemonAMostrar;
    pokemonAMostrar <= ultimoPokemonAMostrar;
    pokemonAMostrar += 1
  ) {
    if (listaPokemones) {
      const pokemonActual = listaPokemones[pokemonAMostrar - 1];
      if (pokemonActual === undefined) {
        return false;
      }
      const nombrePokemon = listaPokemones[pokemonAMostrar - 1].pokemon.name;
      respuestasPokemones.push(pedirPokemonPorNombre(nombrePokemon));
    } else {
      respuestasPokemones.push(pedirPokemonesPorID(pokemonAMostrar));
    }
  }
  ultimoPokemonAMostrar += 20;
  const pokemones = await Promise.all(respuestasPokemones);
  return pokemones;
}

export async function obtenerListaPokemones(tipoPokemon) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${tipoPokemon}`);
  const pokemones = await respuesta.json();
  const listaPokemones = pokemones.pokemon;
  return listaPokemones;
}
