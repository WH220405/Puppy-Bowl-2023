
import {fetchAllPlayers} from './app.js';
import {renderAllPlayers, renderNewPlayerForm} from './script.js'


const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  
    renderNewPlayerForm();
  }
  
  init();