import { mostrarPrimerosPokemones } from './ui.js';
import { activarBotonTodosLosPokemones, activarBotonesTiposPokemones } from './ui.botones-navbar.js';
import { activarBotonMasInformacion } from './ui.mas-informacion.js';
import { activarBotonCargarMasPokemones, activarBotonCargarMasTiposPokemones } from './ui.cargar-mas-pokemones.js';

function activarTodosLosBotones() {
  activarBotonTodosLosPokemones();
  activarBotonesTiposPokemones();
  activarBotonMasInformacion();
  activarBotonCargarMasPokemones();
  activarBotonCargarMasTiposPokemones();
}

function iniciar() {
  mostrarPrimerosPokemones();
  activarTodosLosBotones();
}

iniciar();
