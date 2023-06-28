
import { fetchAllPlayers, fetchSinglePlayer, addNewPlayer, removePlayer } from './app.js';

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
 export const renderAllPlayers = (playerList) => {
    try{
     playerContainer.innerHTML ='';
     playerList.forEach((puppies)=> {
        const puppyElement = document.createElement('div');
         puppyElement.classList.add('puppies');
         puppyElement.innerHTML = `
         <h1>Name: ${puppies.name}</h1>
         <h1>Breed: ${puppies.breed}</h1>
         <h1>Status: ${puppies.status}</h1>
         <img src="${puppies.imageUrl}" alt="${puppies.name}"></img>
         
         <button class="detail-button" id="${puppies.id}">View Roster</button>
         <button class="delete-button" id="${puppies.id}">Remove Player</button>
         `;
         playerContainer.appendChild(puppyElement);
         // view detail
         const detailButton = puppyElement.querySelector('.detail-button');
         detailButton.addEventListener('click', async (event)=> {
            const playerById = event.target.id;
            console.log(playerById)
            const detailBtn = await fetchSinglePlayer(playerById);
            await renderSinglePlayerById(playerById,puppyElement) 
         });
         // remove roster
         const deleteBtn = puppyElement.querySelector('.delete-button');
         deleteBtn.addEventListener('click', async(event)=>{
            const deleteRoster = event.target.id;
            const response = await removePlayer(deleteRoster)
            // if(response.status === 200) {
                puppyElement.remove()
            // }
         });
     });
    
    }catch(error){
        console.log(error)
    }
}

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
 export const renderNewPlayerForm = () => {
    const newPlayerForm = `
        <h2>Add New Player</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" name="name"/><br>
        <label for="breed">Breed:</label>
        <input type="text" name="breed" /><br>
        <label for="status">Status:</label>
        <select type="text" name="status" /><br>
            <option value="bench">bench</option>
            <option value="field">field</field>
            </select><br>
        <label for="imageUrl">ImageURL:</label>
        <input type="text" name="imageUrl" /><br>
        <button type="submit">Add Player</button>
      </form>
    `;
    newPlayerFormContainer.innerHTML = newPlayerForm;
  
    const newForm = document.querySelector('#new-player-form > form');
      newForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      let playerData = {
        name: newForm.elements.name.value,
        breed: newForm.elements.breed.value,
        status: newForm.elements.status.value,
        imageUrl: newForm.elements.imageUrl.value,
      }
      await addNewPlayer(playerData);
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
      newForm.elements.name.value = '';
      newForm.elements.breed.value = '';
      newForm.elements.status.value = '';
      newForm.elements.imageUrl.value ='';
    });
  }


  //render a single player by id
export const renderSinglePlayerById = async (id, puppyElement) => {
      try {
          // fetch player details from server
          const player = await fetchSinglePlayer(id);
          console.log(player)
  
          // create new HTML element to display player details
          const playerDetailsElement = document.createElement('div');
          playerDetailsElement.classList.add('player-details');
          playerDetailsElement.innerHTML = `
              <h3>PLAYER:    ${player.name}</h3>
              <h4>ID:        ${player.id}</h4>
              <h4>STATUS:    ${player.status}</h4>
              <h4>BREED:     ${player.breed}</h4>
              <h4>CREATED AT:${player.createdAt}</h4>
              <h4>UPDATED AT:${player.updatedAt}</h4>
              <h4>TEAM_ID:   ${player.teamId}</h4>           
              <h4>COHORT_ID: ${player.cohortId}</h4>
                        
              <button class="close-button">Close</button>
          `;
  
          puppyElement.appendChild(playerDetailsElement);
  
          // add event listener to close button
          const closeButton = playerDetailsElement.querySelector('.close-button');
          closeButton.addEventListener('click', () => {
              playerDetailsElement.remove();
          });
      } catch (error) {
          console.error(error);
      }
  };
  

