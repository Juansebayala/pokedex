import { pedirPokemonPorNombre } from '../servicios/servicios.js';
import { mostrarAnimacionCarga, ocultarAnimacionCarga } from './principal.js';

function cambiarColorFondoModal(pokemon) {
  const $contenidoModal = document.querySelector('.cuerpo-modal');
  const clasificacionesPokemon = Object.values(pokemon.types);
  const tipoPrincipalPokemon = clasificacionesPokemon[0].type.name;
  $contenidoModal.className = 'cuerpo-modal';
  $contenidoModal.classList.add(`type-${tipoPrincipalPokemon}`);
}

function agregarImagenPokemonModal(pokemon) {
  const $imagenPokemon = document.querySelector('.cuerpo-modal img');
  $imagenPokemon.src = pokemon.sprites.other['official-artwork'].front_default;
}

function agregarNombrePokemonModal(pokemon) {
  const $nombrePokemon = document.querySelector('#nombre-pokemon');
  $nombrePokemon.textContent = pokemon.name;
}

function eliminarTiposAnteriores($nodoTipos) {
  const $tiposAnteriores = $nodoTipos.querySelectorAll('p');
  $tiposAnteriores.forEach(($tipo) => {
    $tipo.remove();
  });
}

function agregarTiposPokemon(pokemon) {
  const $nodoTipos = document.querySelector('#nombres-pokemon-tipo');
  eliminarTiposAnteriores($nodoTipos);
  const tiposPokemon = pokemon.types;
  tiposPokemon.forEach((tipo) => {
    const $nombreTipo = document.createElement('p');
    const nombreTipo = tipo.type.name;
    $nombreTipo.textContent = nombreTipo;
    $nombreTipo.classList.add(`type-${nombreTipo}`);
    $nodoTipos.appendChild($nombreTipo);
  });
}

function agregarAlturaPokemon(pokemon) {
  const $alturaPokemon = document.querySelector('#medida-altura');
  const alturaPokemonEnDecimetros = pokemon.height;
  const alturaPokemonEnMetros = alturaPokemonEnDecimetros / 10;
  $alturaPokemon.textContent = `${alturaPokemonEnMetros.toFixed(2)}m`;
}

function agregarPesoPokemon(pokemon) {
  const $pesoPokemon = document.querySelector('#medida-peso');
  const pesoPokemonEnHectogramos = pokemon.weight;
  const pesoPokemonEnKilogramos = pesoPokemonEnHectogramos * 0.1;
  $pesoPokemon.textContent = `${pesoPokemonEnKilogramos.toFixed(2)}kg`;
}

function eliminarHabilidadesAnteriores($nodoHabilidades) {
  const $habilidades = $nodoHabilidades.querySelectorAll('p');
  $habilidades.forEach(($habilidad) => {
    $habilidad.remove();
  });
}

function agregarHabilidadesPokemon(pokemon) {
  const $nodoHabilidades = document.querySelector('#nombres-habilidades');
  eliminarHabilidadesAnteriores($nodoHabilidades);
  const habilidadesPokemon = pokemon.abilities;
  habilidadesPokemon.forEach((habilidad) => {
    const $nombreHabilidad = document.createElement('p');
    const nombreHabilidad = habilidad.ability.name;
    $nombreHabilidad.textContent = nombreHabilidad;
    $nodoHabilidades.appendChild($nombreHabilidad);
  });
}

const modalMasInformacion = document.querySelector('.mas-informacion-modal');

function mostrarModalMasInformacion() {
  ocultarAnimacionCarga();
  modalMasInformacion.classList.remove('oculto');
}

async function manejarModalMasInformacion(pokemon) {
  cambiarColorFondoModal(pokemon);
  agregarImagenPokemonModal(pokemon);
  agregarNombrePokemonModal(pokemon);
  agregarTiposPokemon(pokemon);
  agregarAlturaPokemon(pokemon);
  agregarPesoPokemon(pokemon);
  agregarHabilidadesPokemon(pokemon);
  mostrarModalMasInformacion();
}

function cerrarModalMasInformacion(e) {
  const $elementoSeleccionado = e.target;
  if ($elementoSeleccionado.classList.contains('contenedor')) {
    modalMasInformacion.classList.add('oculto');
  }
}
modalMasInformacion.onclick = cerrarModalMasInformacion;

async function manejarMasInformacion(e) {
  const $elemento = e.target;
  if ($elemento.classList.contains('mas-informacion')) {
    mostrarAnimacionCarga();
    const $elementoPadre = $elemento.parentNode;
    const nombrePokemon = $elementoPadre.querySelector('p').textContent;
    manejarModalMasInformacion(await pedirPokemonPorNombre(nombrePokemon));
  }
}

export function activarBotonMasInformacion() {
  const $pokemones = document.querySelector('#pokemones');
  $pokemones.onclick = manejarMasInformacion;
}
