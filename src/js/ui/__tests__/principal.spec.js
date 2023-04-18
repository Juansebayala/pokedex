/**
 * @jest-environment jsdom
 */

import {
  mostrarAnimacionCarga,
  ocultarAnimacionCarga,
  crearTarjetaPokemon,
} from '../principal';
import fixture from './principal.fixture';

test('Comprueba que se muestre la animación de carga', () => {
  document.body.innerHTML =
    '<div id="animacion-cargando" class="invisible"></div>';
  mostrarAnimacionCarga();
  const $animacionCarga = document.querySelector('#animacion-cargando');
  expect($animacionCarga.classList).not.toContain('invisible');
});

test('Comprueba que se oculte la animación de carga', () => {
  document.body.innerHTML = '<div id="animacion-cargando" class=""></div>';
  ocultarAnimacionCarga();
  const $animacionCarga = document.querySelector('#animacion-cargando');
  expect($animacionCarga.classList).toContain('invisible');
});

test('Crea una tarjeta pokemon', () => {
  document.body.innerHTML = fixture;
  const pokemon = {
    name: 'bulbasaur',
    types: [
      {
        type: {
          name: 'grass',
        },
      },
    ],
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'asd.jpg',
        },
      },
    },
  };
  crearTarjetaPokemon(pokemon);
  const $tarjetaPokemon = document.querySelector('.tarjeta');
  const $imagenPokemon = document.querySelector('.tarjeta img');
  const $nombrePokemon = document.querySelector('.nombre-pokemon');
  const $botonMasInformacion = document.querySelector('.mas-informacion');
  expect($tarjetaPokemon.classList).toContain('type-grass');
  expect($imagenPokemon.src).toContain('asd.jpg');
  expect($nombrePokemon.textContent).toBe('bulbasaur');
  expect($botonMasInformacion.textContent).toBe('Más información');
});
