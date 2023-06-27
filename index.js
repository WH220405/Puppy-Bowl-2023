
import {fetchAllPlayers} from './app';
import {renderAllPlayers, renderNewPlayerForm} from './script'


const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  
    renderNewPlayerForm();
  }
  
  init();