export default class Pokemon {
  constructor(pokemon) {
    this.tipos = pokemon.types;
    this.imagen = pokemon.sprites.other['official-artwork'].front_default;
    this.nombre = pokemon.name;
    this.altura = pokemon.height;
    this.peso = pokemon.weight;
    this.habilidades = pokemon.abilities;
  }
}
