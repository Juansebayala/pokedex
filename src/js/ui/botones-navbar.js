import {
  mostrarAnimacionCarga,
  mostrarPokemones,
  crearTarjetaPokemon,
} from './principal.js';
import { mostrarBotonCargarMasPokemones } from './cargar-mas-pokemones.js';
import {
  obtenerListaPokemones,
  pedirPokemones,
} from '../servicios/servicios.js';
import Pokemon from './pokemon.js';

function eliminarTarjetasAnteriores() {
  const $pokemones = document.querySelectorAll('.tarjeta');
  $pokemones.forEach(($pokemon) => {
    $pokemon.remove();
  });
}

function ocultarBotonCargarMasPokemonesPorTipo() {
  document
    .querySelector('#cargar-mas-pokemones-por-tipo')
    .classList.add('oculto');
}

function manejarEventoTodosLosPokemones() {
  eliminarTarjetasAnteriores();
  mostrarAnimacionCarga();
  mostrarPokemones();
  ocultarBotonCargarMasPokemonesPorTipo();
  mostrarBotonCargarMasPokemones();
}

export function activarBotonTodosLosPokemones() {
  const $botonTodosLosPokemones = document.querySelector(
    '.todos-los-pokemones'
  );
  $botonTodosLosPokemones.onclick = manejarEventoTodosLosPokemones;
}

function mostrarBotonCargarMasPokemonesPorTipo() {
  document
    .querySelector('#cargar-mas-pokemones-por-tipo')
    .classList.remove('oculto');
}

function ocultarBotonCargarMasPokemones() {
  document.querySelector('#cargar-mas-pokemones').classList.add('oculto');
}

export function mostrarTiposPokemones(pokemones) {
  pokemones.forEach((pokemon) => {
    const datosPokemon = new Pokemon(pokemon);
    crearTarjetaPokemon(datosPokemon);
  });
}

async function manejarEventoTiposPokemones(e) {
  const $elementoSeleccionado = e.target;
  if (
    $elementoSeleccionado.classList.contains('nav-item') &&
    !$elementoSeleccionado.classList.contains('todos-los-pokemones')
  ) {
    eliminarTarjetasAnteriores();
    mostrarAnimacionCarga();
    const tipoPokemon = $elementoSeleccionado.textContent.toLowerCase();
    const $nodoPokemones = document.querySelector('#pokemones');
    $nodoPokemones.setAttribute('data-tipo', tipoPokemon);
    const nombresPokemones = await obtenerListaPokemones(tipoPokemon);
    const pokemones = await pedirPokemones(nombresPokemones);
    mostrarTiposPokemones(pokemones);
    mostrarBotonCargarMasPokemonesPorTipo();
    ocultarBotonCargarMasPokemones();
  }
}

export function activarBotonesTiposPokemones() {
  const $tiposPokemones = document.querySelector('.tipos-pokemones');
  $tiposPokemones.onclick = manejarEventoTiposPokemones;
}
