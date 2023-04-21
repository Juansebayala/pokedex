import { pedirPokemones } from '../servicios/servicios.js';
import Pokemon from './pokemon.js';

export function mostrarAnimacionCarga() {
  document.querySelector('#animacion-cargando').classList.remove('invisible');
}

export function ocultarAnimacionCarga() {
  document.querySelector('#animacion-cargando').classList.add('invisible');
}

function agregarColorFondo(tarjeta, pokemon) {
  const tipoPrincipalPokemon = pokemon.tipos[0].type.name;
  tarjeta.classList.add(`type-${tipoPrincipalPokemon}`);
}

function agregarImagenPokemon(tarjeta, pokemon) {
  const $imagenPokemon = document.createElement('img');
  $imagenPokemon.src = pokemon.imagen;
  $imagenPokemon.classList.add('imagen-pokemon');
  tarjeta.appendChild($imagenPokemon);
}

function agregarNombrePokemon(tarjeta, pokemon) {
  const nombrePokemon = document.createElement('p');
  nombrePokemon.textContent = pokemon.nombre;
  nombrePokemon.classList.add('nombre-pokemon');
  tarjeta.appendChild(nombrePokemon);
}

function agregarBotonMasInformacion(tarjeta) {
  const $botonInformacion = document.createElement('button');
  $botonInformacion.classList.add('btn', 'btn-light', 'mas-informacion');
  $botonInformacion.textContent = 'Más información';
  tarjeta.appendChild($botonInformacion);
}

export function crearTarjetaPokemon(pokemon) {
  const $nodoPokemones = document.querySelector('#pokemones');
  ocultarAnimacionCarga();
  const $tarjetaPokemon = document.createElement('div');
  $tarjetaPokemon.classList.add('tarjeta');
  agregarColorFondo($tarjetaPokemon, pokemon);
  agregarImagenPokemon($tarjetaPokemon, pokemon);
  agregarNombrePokemon($tarjetaPokemon, pokemon);
  agregarBotonMasInformacion($tarjetaPokemon);
  $nodoPokemones.appendChild($tarjetaPokemon);
}

export async function mostrarPokemones() {
  const pokemones = await pedirPokemones();
  pokemones.forEach((pokemon) => {
    const datosPokemon = new Pokemon(pokemon);
    crearTarjetaPokemon(datosPokemon);
  });
}

export function mostrarPrimerosPokemones() {
  const $pagina = document.querySelector('body');
  $pagina.onload = () => {
    mostrarAnimacionCarga();
    mostrarPokemones();
  };
}
