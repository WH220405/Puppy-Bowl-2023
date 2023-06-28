

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-E';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
 export const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        //console.log(response)
        const result = await response.json();
        //console.log(result) // return an array of object
        if (result.error) throw result.error;
        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

 export const fetchSinglePlayer = async (playerId) => {
    console.log(playerId)
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        //console.log(response)
        const playerResult = await response.json();
       
        console.log(playerResult)
        return playerResult.data.player;
        
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};
/*
// single player output //
breed: "ben"
cohortId: 520
createdAt: "2023-06-26T05:14:26.832Z"
id: 11736
imageUrl: 
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFRIREhUREREREQ8RDw8PEhEPEg8PGBQZGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQhISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3NDE0MTQ0NDQ0MTQxNDQ0NDQ0NDQ0NDQ0MTQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EADcQAAIBAwIEAwcCBQQDAAAAAAECAAMEERIhBTFBURMiYQYycYGRobEVUhRCwdHhI2Ki8DNT8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACQRAAMBAAICAQUAAwAAAAAAAAABEQISIQMxQQQUIlFhE3GR/9oADAMBAAIRAxEAPwDj0EcGT0yBWcS0RCwFGJVcyRY8oNhChB1eEV5BEzDilM9DhOm0sq8qAYhA0zaE0WTUg2qQZaCd41kUD+JIGrvK7NIaocSkjToVJp21Wc+jy7b3Ez1kuG+tWMXmalxCpViyhQK65jigMRK2YfO01pWcmZc0Jk16M3rgzNuRKWjTjTFYERjmWXTJMdqYmnIweezOqPBo8PcU5W0GXmMqGrZVsYnQ21YETkrckTUtrgiY7xQSOhavtzmXfVMwf8TAVXzM1jsHkqtvK7pLWJF1mqcMydrTEO6CDoviTeoJYGZf0xM4JNC+qZla3GTL+CiPhGKauiKTyAvNRkPBm61rIi0nKtkmIbcwLUsToWtZUr2sOYGdSSG0wgoERMphyHStUEGDDuIPTKTHCDGDadjwrg9FaaVKi+JUfdUfIpoPUDmfjtLz2NBvft6GOuhPCIHcFMS1lw0z420efMJCdxd+yNOope2cq+/+hVIIY9lfp8/rOQubV6bFHVkdThkcFSD8IOr2DxCuDCK2JHTFoksUDivJpcHvKwSSCxRBDVo3Q"
name: "jeje"
status: "bench"
teamId: null
updatedAt: "2023-06-26T05:14:26.832
*/

 export const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}/players`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // converts a JavaScript value to a JSON string 
            body: JSON.stringify(playerObj),
        });
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        
        const players = await fetchAllPlayers();
        renderAllPlayers(players, playerContainer);
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

 export const removePlayer = async (playerId) => {
    try {
     const response = await fetch(`${APIURL}/players/${playerId}`,
     {
        method: 'DELETE',
     });
     const removePup = await response.json();
     if (result.error) throw result.error;
     console.log(removePup)
     return;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};




