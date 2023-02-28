let tipoPokemon;

const $tiposPokemones = document.querySelector(".tipos-pokemones");
$tiposPokemones.onclick = (e) => {
  const $elementoSeleccionado = e.target;
  if (
    $elementoSeleccionado.classList.contains("nav-item") &&
    !$elementoSeleccionado.classList.contains("todos-los-pokemones")
  ) {
    pokemonAMostrar = 1;
    limitePokemonesAMostrar = 20;
    tipoPokemon = $elementoSeleccionado.textContent.toLowerCase();
    ocultarMensajeError();
    eliminarTarjetasAnteriores();
    mostrarAnimacionCarga();
    obtenerListaPokemones(tipoPokemon);
    mostrarBotonCargarMasPokemonesPorTipo();
    ocultarBotonCargarMasPokemones();
  }
};

const $botonCargarMasPokemonesPorTipo = document.querySelector(
  "#cargar-mas-pokemones-por-tipo"
);
$botonCargarMasPokemonesPorTipo.onclick = () => {
  ocultarMensajeError();
  obtenerListaPokemones(tipoPokemon);
};

function obtenerListaPokemones(tipoPokemon) {
  fetch(`https://pokeapi.co/api/v2/type/${tipoPokemon}`)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error();
    })
    .then((pokemones) => {
      const listaPokemones = pokemones.pokemon;
      mostrarPokemonesPorTipo(listaPokemones);
    })
    .catch(() => {
      mostrarMensajeError();
      ocultarAnimacionCarga();
      eliminarTarjetasAnteriores();
    });
}

function mostrarPokemonesPorTipo(listaPokemones) {
  for (
    pokemonAMostrar;
    pokemonAMostrar <= limitePokemonesAMostrar;
    pokemonAMostrar++
  ) {
    const pokemonActual = listaPokemones[pokemonAMostrar - 1];
    if (pokemonActual === undefined) {
      break;
    }
    const nombrePokemon = listaPokemones[pokemonAMostrar - 1].pokemon.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        }
        throw new Error();
      })
      .then((pokemon) => {
        crearTarjetaPokemon(pokemon);
      })
      .catch(() => {
        mostrarMensajeError();
        ocultarAnimacionCarga();
        eliminarTarjetasAnteriores();
        pokemonAMostrar = 1;
        limitePokemonesAMostrar = 20;
      });
  }
  limitePokemonesAMostrar += 20;
}

function mostrarBotonCargarMasPokemonesPorTipo() {
  document.querySelector("#cargar-mas-pokemones-por-tipo").classList.remove("oculto");
}

function ocultarBotonCargarMasPokemones() {
  document
    .querySelector("#cargar-mas-pokemones")
    .classList.add("oculto");
}
