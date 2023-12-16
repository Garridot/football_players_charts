let playerData;

// #### RENDER DATA IN THE TEMPLATE #### //

let chartInvolvements;
let chartSeason;
let chartPosition;

// Function to render player data in the template
const renderPlayerData = (data)=>{
    var mainBody = document.querySelector("main").querySelector(".main-body");
    
    var image = document.querySelector(".main-background .image")

    image.style.background = `url("${playerMedia[data.id]}")`;
    image.style.backgroundSize = "cover";  

    mainBody.innerHTML = `    
        <div class="main-title">
            <h1>${data.name}</h1>
        </div>
        <div class="main-stats">
            <ul>
                <li>Name: ${data.name}</li>
                <li>Age: ${data.age}</li>
                <li>Date of birth: ${data.date_of_birth}</li>
                <li>Nationality: ${data.nationality}</li>
                <li>Position: ${data.position}</li>
                <li>Current club: ${data.current_club}</li>                
            </ul>
        </div>    
    `;    
}

// Function to render filter stats
var filtersExists = false
const renderFilterStats = (res) => {     
    var filters = document.querySelector(".filters__");
    var teamFilters = filters.querySelector(".team--filter select optgroup");
    var competitionsFilters = filters.querySelector(".competitions--filter select optgroup");
    var seasonsFilters = filters.querySelector(".season--filter select optgroup");    

    if (!filtersExists) {
        var teams = res.teams;
        var seasons = res.seasons;
        var competitions = res.competitions;
        
        // Add the item "Total" to the first place
        teams.unshift("Total");
        seasons.unshift("Total");
        competitions.unshift("Total");

        for (i in teams){        
            var option = document.createElement("option");
            option.innerHTML = teams[i];
            option.value = teams[i];
            teamFilters.appendChild(option);}

        for (i in seasons){        
            var option = document.createElement("option");
            option.innerHTML = seasons[i];
            option.value = seasons[i];
            seasonsFilters.appendChild(option);}

        for (i in competitions){        
            var option = document.createElement("option");
            option.innerHTML = competitions[i];
            option.value = competitions[i];
            competitionsFilters.appendChild(option);}   
        
        filtersExists = true
    }   
}


const renderGeneralStats = (res) => {    
    var container = document.querySelector(".general__ .container");
    container.innerHTML = 
    `
    <div class="row">
        <div class="stat">
            <span><p>${res.games}</p>
            <p>Games</p></span>
        </div>
        <div class="stat">
            <span><p>${res.goals}</p>
            <p>goals</p></span>
        </div>
        <div class="stat">
            <span><p>${res.assists}</p>
            <p>assists</p></span>
        </div>    
        <div class="stat">
            <span><p>${res['ratio goals involvements']}'</p>
            <p>Frequency of participation in goals</p></span>
        </div>
        <div class="stat">
            <span><p>${res['ratio goals']}</p>
            <p>ratio goals</p></span>
        </div>
        <div class="stat">
            <span><p>${res['ratio assists']}</p>
            <p>ratio assists</p></span>
        </div>
    </div>
    `;
}
const renderGoalsInvolvements = (res) => {
    let stats =  document.querySelector('.goals_involvements .description--'); 

    while (stats.hasChildNodes()){ stats.removeChild(stats.lastChild);}

    stats.innerHTML =  
    `
        <ul>
            <li>Team's Goals : ${res["team goals"]}</li>
            <li>Player Goals: ${res["player goals"]}</li>
            <li>Player Assists: ${res["player assists"]}</li>
            <li>Goals Involvements:  ${res["goals involvements"]}%</li>
        </ul>
    `;


    var donutText = document.querySelector(".donut-text");
    donutText.innerHTML = 
    `
    <div class="donut-table">
        <h1>Goal <br> involvement:</h1>
        <h1>${res["goals involvements"]}%</h1>
    </div>  
    `;

    // Create Chart
    var config = goalsInvolvementsConfig(res);    
    if(chartInvolvements){ chartInvolvements.chart.destroy(); }    
    chartInvolvements = new CustomChart();    
    chartInvolvements.createChart(config);   
    
    
}
const renderPerforSeason = (res) => {
    // Create Chart     
    var config = performbySeasonConfig(res);
    if (chartSeason){ chartSeason.chart.destroy(); }    
    if (res.seasons.length <= 2){    
        config["options"]["animation"] = null;
        config["options"]["indexAxis"] = "y";   
    }
    chartSeason = new CustomChart();        
    chartSeason.createChart(config);

    // Create a list of objects containing the season and its corresponding score
    const seasonInvolvements = res.seasons.map((season, index) => ({
    season: season, involvements: res.goals_involvements[index], goals: res.goals[index], assists: res.assists[index] }));

    // Sort the list of seasons by score in descending order
    const sortedSeasons = seasonInvolvements.sort((a, b) => b.involvements - a.involvements);

    // Rename list
    var topSeasons = sortedSeasons;

    if(sortedSeasons.length > 5){ var topSeasons = sortedSeasons.slice(0, 5);}    

    var performace = document.querySelector(".perfom_seasons .description-- ul");

    while (performace.hasChildNodes()){ performace.removeChild(performace.lastChild);}

    topSeasons.forEach(season => {
        var li = document.createElement("li");
        li.innerHTML = `${season.season}: ${season.goals} goals | ${season.assists} assists`;         
        performace.appendChild(li);
    })
    
   
}
const renderPerformPosition = (res) => {
    // Create Chart
    var config = performPositionConfig(res);
    if(chartPosition){ chartPosition.chart.destroy(); }
    chartPosition = new CustomChart();    
    chartPosition.createChart(config);

    // Render stats
    var table = document.querySelector(".perfom_position .data--");

    while (table.hasChildNodes()){ table.removeChild(table.lastChild);}

    for(i in res.position){
        var performace = document.createElement("ul");  
        performace.innerHTML =  
        `
            <li>${res.position[i]}</li>
            <li>${res.games[i]}</li>
            <li>${res.goals[i]}</li>
            <li>${res.assists[i]}</li>            
        `
        table.appendChild(performace)
    }
        
}
const renderPerforCompetition = (res) => {
    let table = document.querySelector('.competitions .data-performace');
        
    while (table.hasChildNodes()){ table.removeChild(table.lastChild);}
    
    for (i in res.competition){
    var performace = document.createElement("ul");
    performace.className = "performace";
    performace.innerHTML =  
    `
        <li class="t-data">${res.competition[i]}</li>
        <li class="t-data">${res.games[i]}</li>
        <li class="t-data">${res.team_goals[i]}</li>
        <li class="t-data">${res.goals[i]}</li>
        <li class="t-data">${res.assists[i]}</li>
        <li class="t-data">${res.performance[i]}%</li>
    `
    table.appendChild(performace)
    }
}


// #### Filter Stats  #### //

// Function to filter player stats based on user selection
const filterStats = async () => {
   
    var teamSelect         = document.querySelector(".team--filter select");
    var competitionsSelect = document.querySelector(".competitions--filter select");
    var seasonsSelect      = document.querySelector(".season--filter select"); 

    var team        = teamSelect.options[teamSelect.selectedIndex].value;        
    var competition = competitionsSelect.options[competitionsSelect.selectedIndex].value;  
    var season      = seasonsSelect.options[seasonsSelect.selectedIndex].value;  

    extraFilters = {}
    if(team != "Total"){ extraFilters["team"] = team };
    if(competition != "Total"){ extraFilters["competition"] = competition };
    if(season != "Total"){ extraFilters["season"] = season };        
    
    var stats__ = document.querySelector(".stats__");

    try {
        var response = await getPlayerStats(playerData, extraFilters);      
       
        if(document.querySelector(".not_found--")){ document.querySelector(".not_found--").remove(); }

        stats__.style.display = "block";
        
    } catch (error) {
        // Si hay un error, verifica si es un error 404 y realiza acciones específicas
        if (error instanceof Error && error.message.includes('404')) {              
            stats__.style.display = "none";   
            
            if(document.querySelector(".not_found--")){ document.querySelector(".not_found--").remove(); }

            var newDiv = document.createElement("div");

            // Agregar clases y contenido al nuevo div
            newDiv.className = "not_found--";
            newDiv.innerHTML =  `<p>${error.message}</p>`;

            // Obtener el elemento con la clase "filters__"
            var filtersDiv = document.querySelector(".filters__");

            // Insertar el nuevo div antes del elemento con la clase "stats__"
            filtersDiv.parentNode.insertBefore(newDiv, filtersDiv.nextSibling);

            // Puedes realizar acciones adicionales específicas para el código 404 aquí
        } else {
            // Manejar otros errores aquí, si es necesario
            console.error('Error:', error);
        }
    }
}
// Function to make a request to the server for player stats
async function requetsData(url,data){        
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`404: Stats not found for ${JSON.stringify(data)}`);
        } else {
            throw new Error(`Error during request: ${response.status} - ${response.statusText}`);
        }
    }else{        
        const responseData = await response.json();
        return responseData;
    }
}
// Function to get player stats and render them in the template
async function getPlayerStats(data,extraFilters=null){   
    var url = '/api/player_stats/player/' + data.id    
    var response = await requetsData(url,extraFilters);    

    // Access specific properties in the response object
    const generalStats = response['general stats'];
    const goalsInvolvements = response['goals involvements'];
    const performanceBySeason = response['performance by season'];
    const performanceByCompetition = response['performance by competition'];
    const performanceByPosition = response['stats by position'];

    // Render stats in the template 
    renderFilterStats(generalStats);
    renderGeneralStats(generalStats);
    renderGoalsInvolvements(goalsInvolvements);
    renderPerforSeason(performanceBySeason);
    renderPerformPosition(performanceByPosition);
    renderPerforCompetition(performanceByCompetition);
}

// Check if the response status is 200 and render player data and stats
if( response.status_code == 200 ){   
    playerData = response.data 
    renderPlayerData(playerData);
    getPlayerStats(playerData);
} 