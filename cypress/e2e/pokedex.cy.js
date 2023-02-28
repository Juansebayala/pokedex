/// <reference types="Cypress" />

const URL = "127.0.0.1:8080";

describe("Pokedex", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("Comprueba que al cargar la página aparezcan los primeros 20 pokemones", () => {
    esperar();
    comprobarCantidadPokemones(20);
  });

  it("Comprueba mensaje error al no poder cargar los primeros pokemones", () => {
    cy.intercept("GET", "**/pokemon/*", { statusCode: 500 });
    cy.get("#mensaje-error").should("be.visible");
  });

  it("Comprueba que al dar click en Más información aparezca una ventana modal con la información del pokemon seleccionado", () => {
    esperar();
    cy.get(".tarjeta").then((tarjeta) => {
      const $primerPokemon = tarjeta[0];
      const $nombrePrimerPokemon = $primerPokemon.childNodes[1].textContent;
      const $botonMasInformacion = tarjeta[0].childNodes[2];
      darClick($botonMasInformacion);
      cy.get(".mas-informacion-modal").should("be.visible");
      cy.get("#nombre-pokemon").should("have.text", $nombrePrimerPokemon);
    });
  });

  it("Comprueba que al dar click en el boton Cargar más Pokemones haya en total 40 pokemones", () => {
    esperar();
    darClick("#cargar-mas-pokemones");
    esperar();
    comprobarCantidadPokemones(40);
  });

  it("Comprueba que al dar click en un tipo pokemon haya en total 20 pokemones de ese tipo", () => {
    esperar();
    darClick(".tipos-pokemones .type-normal");
    esperar();
    comprobarCantidadPokemones(20);
    cy.get("#pokemones")
      .find(".tarjeta")
      .each((pokemon) => {
        cy.get(pokemon).should("have.class", "type-normal");
      });
  });

  it("Comprueba que al dar click en un tipo de pokemon y luego en Cargar mas Pokemones haya 40 pokemones de ese tipo", () => {
    esperar();
    darClick(".tipos-pokemones .type-normal");
    esperar();
    darClick("#cargar-mas-pokemones-por-tipo");
    esperar();
    comprobarCantidadPokemones(40);
    cy.get("#pokemones")
      .find(".tarjeta")
      .each((pokemon) => {
        cy.get(pokemon).should("have.class", "type-normal");
      });
  });

  it("Comprueba que no aparezca el bug que al cargar la página y tocar rapidamente un tipo Pokemon se acoplen las tarjetas", () => {
    darClick(".tipos-pokemones .type-normal");
    esperar();
    cy.get(".tarjeta").then((tarjeta) => {
      const $primerPokemon = tarjeta[0];
      cy.get($primerPokemon).should("not.have.class", "type-normal");
    });
  });
});

function esperar() {
  cy.wait(3000);
}

function darClick(referenciaElemento) {
  cy.get(referenciaElemento).click();
}

function comprobarCantidadPokemones(cantidadEsperados) {
  cy.get("#pokemones")
    .find(".tarjeta")
    .should("have.length", cantidadEsperados);
}
