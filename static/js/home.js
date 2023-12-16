// Async function to fetch player stats from the server
async function getPlayerStats(){
    const url = '/api/get_player_data';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fetch request failed');
    }
    // Parse the response as JSON and return it
    return await response.json();   
}

// Function to render player statistics on the webpage
const renderStats = (stats) => {    
    // Extract relevant data from the stats object
    const generalStats = stats["general stats"];
    const listPlayers  = stats["list players"];
    const player       = stats.player;  

    // Get DOM elements to manipulate
    const backgroundText = document.querySelector(".background-text");
    const playerBanner   = document.querySelector(".player-banner");
    const statsContainer = document.querySelector(".player-data");   
    const PlayersSection = document.querySelector(".players-list-section"); 

    // Create and append elements to backgroundText
    for (let i = 0; i < 10; i++) {
        var newElement = document.createElement("span");
        newElement.innerHTML = `<h1>${player.name}${player.name}${player.name}</h1>`;
        backgroundText.appendChild(newElement);
    }

    // Set background image and styles for the player
    var image = document.querySelector(".player-img .image")
    image.style.background = `url("${playerMedia[player.id]}")`;
    image.style.backgroundSize = "cover";

    // Render player details in the playerBanner
    playerBanner.innerHTML = 
    `
    <span>
        <div class="main-title">
            <h1>${player.name}</h1>
        </div>
        <div class="main-stats">
            <ul>
                <li>Name: ${player.name}</li>
                <li>Age: ${player.age}</li>
                <li>Date of birth: ${player.date_of_birth}</li>
                <li>Nationality: ${player.nationality}</li>
                <li>Position: ${player.position}</li>
                <li>Current club: ${player.current_club}</li>                
            </ul>
        </div>
    </span>
    `
    // Render general statistics in statsContainer  
    statsContainer.innerHTML = `    
    <div class="container">
        <div class="section-title">
                <h1>General Stats</h1>
        </div> 
        <div class="row">
            <div class="stat">
                <span><p>${generalStats.games}</p>
                <p>Games</p></span>
            </div>
            <div class="stat">
                <span><p>${generalStats.goals}</p>
                <p>goals</p></span>
            </div>
            <div class="stat">
                <span><p>${generalStats.assists}</p>
                <p>assists</p></span>
            </div>
            <div class="stat">
                <span><p>${generalStats['ratio goals involvements']}'</p>
                <p>Frequency of participation in goals</p></span>
            </div>
            <div class="stat">
                <span><p>${generalStats['ratio goals']}</p>
                <p>ratio goals</p></span>
            </div>
            <div class="stat">
                <span><p>${generalStats['ratio assists']}</p>
                <p>ratio assists</p></span>
            </div>    
        </div> 
    </div>    
    <div class="about__">
        <a href="">View more about ${player.name}</a>
        <span class="line--"></sapn>
    </div>     
    `  

    // Render list of players in PlayersSection
    PlayersSection.querySelector(".players-list").innerHTML =
    `    
    <ul class="list--">
        <li>
            <a href="/player/${listPlayers[0].id}/${listPlayers[0].name}">${listPlayers[0].name}</a>
            <span class="line--"></sapn>
        </li>
        <li>
            <a href="/player/${listPlayers[1].id}/${listPlayers[1].name}">${listPlayers[1].name}</a>
            <span class="line--"></sapn>
        </li>
        <li>
            <a href="/player/${listPlayers[2].id}/${listPlayers[2].name}">${listPlayers[2].name}</a>
            <span class="line--"></sapn>
        </li>
        <li>
            <a href="/player/${listPlayers[3].id}/${listPlayers[3].name}">${listPlayers[3].name}</a>
            <span class="line--"></sapn>
        </li>
        <li>
            <a href="/player/${listPlayers[4].id}/${listPlayers[4].name}">${listPlayers[4].name}</a>
            <span class="line--"></sapn>
        </li>
        <li>
            <a href="/players"><i class="fa fa-arrow-right"></i></a>
            
            <span class="line--"></sapn>
        </li>     
    </ul>
    `

    // Set a timeout to hide the loading element and display the wrapper after 2 seconds
    setTimeout(() => {
        document.querySelector(".load--").style.display="none",
        document.querySelector(".wrapper--").style.display="block"
    }, 2000)  
}



// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Fetch player stats asynchronously when the page loads
    getPlayerStats()
    .then(data => 
        renderStats(data),              
        )
    .catch(error => console.error('Error fetching data:', error));
    
});

