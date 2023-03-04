import { mostrarAnimacionCarga, mostrarPokemones } from './ui.js';
import { obtenerListaPokemones, pedirPokemones } from './servicios.js';
import { mostrarTiposPokemones } from './ui.botones-navbar.js';

function ocultarMensajeError() {
  document.querySelector('#mensaje-error').classList.add('oculto');
}

export function mostrarBotonCargarMasPokemones() {
  document.querySelector('#cargar-mas-pokemones').classList.remove('oculto');
}

export function activarBotonCargarMasPokemones() {
  const $botonCargarMasPokemones = document.querySelector('#cargar-mas-pokemones');
  $botonCargarMasPokemones.onclick = () => {
    ocultarMensajeError();
    mostrarAnimacionCarga();
    mostrarPokemones();
  };
  mostrarBotonCargarMasPokemones();
}

async function manejarCargarTiposPokemones() {
  mostrarAnimacionCarga();
  const tipoPokemon = document.querySelector('#pokemones').dataset.tipo;
  const nombresPokemones = await obtenerListaPokemones(tipoPokemon);
  const pokemones = await pedirPokemones(nombresPokemones);
  mostrarTiposPokemones(pokemones);
}

export function activarBotonCargarMasTiposPokemones() {
  const $botonCargarMasPokemonesPorTipo = document.querySelector('#cargar-mas-pokemones-por-tipo');
  $botonCargarMasPokemonesPorTipo.onclick = manejarCargarTiposPokemones;
}
