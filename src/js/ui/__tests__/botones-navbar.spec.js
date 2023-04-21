import {
  activarBotonTodosLosPokemones,
  mostrarTiposPokemones,
  activarBotonesTiposPokemones,
} from '../botones-navbar';

import { crearTarjetaPokemon } from '../principal';

test('Activa el boton para cargar todos los pokemones', () => {
  document.body.innerHTML =
    '<ul><li class="nav-item todos-los-pokemones">Todos</li></ul>';
  activarBotonTodosLosPokemones();
  const $botonTodosLosPokemones = document.querySelector(
    '.todos-los-pokemones'
  );
  expect($botonTodosLosPokemones.onclick).not.toBeNull();
});

jest.mock('../principal');
test('MuestraLosPokemones', () => {
  mostrarTiposPokemones(['bulbasaur', 'charmander', 'squirtle']);
  expect(crearTarjetaPokemon).toHaveBeenCalledTimes(3);
});

test('Activa el boton para cargar pokemones según su tipo', () => {
  document.body.innerHTML = '<ul class="tipos-pokemones"><li">Grass</li></ul>';
  activarBotonesTiposPokemones();
  const $botonTipoPokemon = document.querySelector('.tipos-pokemones');
  expect($botonTipoPokemon.onclick).not.toBeNull();
});
