import {
  mostrarAnimacionCarga,
  mostrarPokemones,
  crearTarjetaPokemon,
} from './principal.js';
import {
  obtenerListaPokemones,
  pedirPokemones,
} from '../servicios/servicios.js';

export function mostrarBotonCargarMasPokemones() {
  document.querySelector('#cargar-mas-pokemones').classList.remove('oculto');
}

export function activarBotonCargarMasPokemones() {
  const $botonCargarMasPokemones = document.querySelector(
    '#cargar-mas-pokemones'
  );
  $botonCargarMasPokemones.onclick = () => {
    mostrarAnimacionCarga();
    mostrarPokemones();
  };
  mostrarBotonCargarMasPokemones();
}

function mostrarTiposPokemones(pokemones) {
  pokemones.forEach((pokemon) => {
    crearTarjetaPokemon(pokemon);
  });
}

async function manejarCargarTiposPokemones() {
  mostrarAnimacionCarga();
  const tipoPokemon = document.querySelector('#pokemones').dataset.tipo;
  const nombresPokemones = await obtenerListaPokemones(tipoPokemon);
  const pokemones = await pedirPokemones(nombresPokemones);
  mostrarTiposPokemones(pokemones);
}

export function activarBotonCargarMasTiposPokemones() {
  const $botonCargarMasPokemonesPorTipo = document.querySelector(
    '#cargar-mas-pokemones-por-tipo'
  );
  $botonCargarMasPokemonesPorTipo.onclick = manejarCargarTiposPokemones;
}
