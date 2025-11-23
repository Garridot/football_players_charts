import { renderMessageError } from './RenderModule.js';

async function fetchData(url, options = {}, retries = 10, timeout = 5000) {
    try {
        const controller = new AbortController(); // Control para manejar el timeout
        const signal = controller.signal;

        // Crear un timeout para abortar la solicitud si se demora más de lo esperado
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        // Intentar la solicitud con fetch
        const response = await fetch(url, { ...options, signal });

        clearTimeout(timeoutId); // Limpiar el timeout si la solicitud es exitosa

        // Comprobar si la respuesta fue exitosa (status 2xx)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }        

        const data = await response.json(); // Parsear el JSON
 
        return data;
    } catch (error) {
                
        if (!error.message.includes('404')){

            if (retries > 0) { // Si la solicitud falla y hay reintentos disponibles
                console.warn(`Attempt failed, retrying... (${retries} left)`);
                return fetchData(url, options, retries - 1, timeout);
            } else if (error.name === 'AbortError') {
                console.error('Request timeout, aborting.');
                throw new Error('Request timeout');
            } else {
                console.error(`Request failed: ${error.message}`);
                throw error; // Lanza el error para que se maneje fuera de la función
            }
        } else { 
            throw error;
        }
    }
}

// Obtener la lista de jugadores
export async function getListPlayers() {
    const url = '/api/list_players';
    try {
        const players = await fetchData(url);
        return players;
    } catch (error) {
        console.error('Failed to fetch list of players:', error);
    }
}

// Obtener los detalles de un jugador
export async function getPlayerData(playerId) {
    const url = `/api/get_player_data/player/${playerId}`;
    try {
        const data = await fetchData(url); 
        return data;
    } catch (error) {
        console.error('Failed to fetch player data:', error);

        var message = renderMessageError('Failed to fetch player data. Please refresh page.');
        document.querySelector("main").appendChild(message);
    }
}

export async function getPlayerGeneralStats(playerId,filters=null) {
    const url = `/api/player_stats/player/${playerId}/general`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };
    try {
        const data = await fetchData(url, options);        
        return { status: 200, data: data };        
    } catch (error) {
        if (error instanceof Error && error.message.includes('404')) { 
            var message = `${error.message} STATS FOR : ${options["body"]}`;
            return { status: 404, data: message };

        }else {
            console.error('Failed to fetch player data:', error.message);
            return { status: 500, message: "Failed to fetch player data. Please refresh page." };
        } 
    }
}

export async function getPlayerStatsBySeason(playerId, filters) {
    const url = `/api/player_stats/player/${playerId}/by_season`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    try {
        const data = await fetchData(url, options);
        return { status: 200, data: data };
    } 
    catch (error) {
        if (error instanceof Error && error.message.includes('404')) { 
            var message = `${error.message} STATS FOR : ${options["body"]}`;
            return { status: 404, data: message };

        }else {
            console.error('Failed to fetch player data:', error.message);
            return { status: 500, data: "Failed to fetch player data. Please refresh page." };
        } 
    }
}

export async function getPlayerStatsByGoalsInvolvements(playerId, filters) {
    const url = `/api/player_stats/player/${playerId}/goals_involvements`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    try {
        const data = await fetchData(url, options);        
        return { status: 200, data: data };        
    } 
    catch (error) {
        if (error instanceof Error && error.message.includes('404')) { 
            var message = `${error.message} STATS FOR : ${options["body"]}`;
            return { status: 404, data: message };

        }else {
            console.error('Failed to fetch player data:', error.message);
            return { status: 500, data: "Failed to fetch player data. Please refresh page." };
        } 
    }
}

export async function getPlayerStatsByPosition(playerId, filters) {
    const url = `/api/player_stats/player/${playerId}/by_position`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    try {
        const data = await fetchData(url, options);        
        return { status: 200, data: data };
    } 
    catch (error) {
        if (error instanceof Error && error.message.includes('404')) { 
            var message = `${error.message} STATS FOR : ${options["body"]}`;
            return { status: 404, data: message };

        }else {
            console.error('Failed to fetch player data:', error.message);
            return { status: 500, data: "Failed to fetch player data. Please refresh page." };
        } 
    }
}

export async function getPlayerStatsByCompetition(playerId, filters) {
    const url = `/api/player_stats/player/${playerId}/by_competition`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    try {
        const data = await fetchData(url, options);        
        return { status: 200, data: data };        
    } 
    catch (error) {
        if (error instanceof Error && error.message.includes('404')) { 
            var message = `${error.message} STATS FOR : ${options["body"]}`;
            return { status: 404, data: message };

        }else {
            console.error('Failed to fetch player data:', error.message);
            return { status: 500, data: "Failed to fetch player data. Please refresh page." };
        } 
    }
}

