import {
  mostrarBotonCargarMasPokemones,
  activarBotonCargarMasPokemones,
  activarBotonCargarMasTiposPokemones,
} from '../cargar-mas-pokemones';

import fixture from './cargar-mas-pokemones.fixture';

document.body.innerHTML = fixture;

test('Muestra el boton para cargar más pokemones', () => {
  mostrarBotonCargarMasPokemones();
  const $botonCargarMasPokemones = document.querySelector(
    '#cargar-mas-pokemones'
  );
  expect($botonCargarMasPokemones.classList).not.toContain('oculto');
});

test('Activa el boton para cargar más pokemones', () => {
  activarBotonCargarMasPokemones();
  const $botonCargarMasPokemones = document.querySelector(
    '#cargar-mas-pokemones'
  );
  expect($botonCargarMasPokemones.onclick).not.toBeNull();
});

test('Activa el boton para cargar más pokemones según su tipo', () => {
  activarBotonCargarMasTiposPokemones();
  const $botonCargarMasPokemones = document.querySelector(
    '#cargar-mas-pokemones-por-tipo'
  );
  expect($botonCargarMasPokemones.onclick).not.toBeNull();
});
