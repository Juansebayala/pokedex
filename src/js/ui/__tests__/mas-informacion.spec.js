import { activarBotonMasInformacion } from '../mas-informacion';

test('Activa el botón más información', () => {
  document.body.innerHTML = `<div id="pokemones"></div>`;
  activarBotonMasInformacion();
  const $pokemones = document.querySelector('#pokemones');
  expect($pokemones.onclick).not.toBeNull();
});
