import { PlayerMedia } from  './MediaModule.js' 
import { CustomChart, performbySeasonConfig, goalsInvolvementsConfig, performPositionConfig } from './ChartsModule.js'       

export const renderLoederAnimation = () => {
    var div = document.createElement("div");
    div.className = "loeder-animation";
    div.innerHTML = `<div class="loader"></div>`;    
    return div;
}

export const renderMessageError = (message) => {
    var div = document.createElement("div");
    div.className = "message-error";
    div.innerHTML = `<p class="text-stats">${message}</p>`;
    return div;
}

export const renderPlayerList = (data) => {

    document.querySelector("#players-container").innerHTML =  
    `<div class="section-row"style="width: 100%;">        
        <div class="section--col">
            <div class="section-header s-header-secondary">
                <h1 class="section-title">View about others players</h1>
            </div>
        </div>            
    </div>  
    <div class="section-row"style="width: 100%;">
        <div class="section--col">
            <div class="description-- players-list">                    
            </div>
        </div>
    </div>`        

    var container = document.querySelector(".players-list");
    for (let i=0;i < data.length; i++) {
        var li = document.createElement("li");
        li.className = "player-li text-stats"   
        li.innerHTML =  
        `
        <a href="/player_stats/${data[i].id}">${data[i].name}</a>      
        `     
        container.appendChild(li) 
    }
}      

export const renderPlayerData = (data) => {
    var main = document.querySelector("main")

    main.innerHTML = ` 
        <div class="section-row">
            <div class="section--col" id="col-1">
                <div class="section-picture"><img src="${PlayerMedia[data.id]}" alt="" class="section-image"></div>
            </div>
            <div class="section--col" id="col-2">
                <div class="section-header">
                    <h1 class="section-title">${data.name}</h1>
                </div>                
                <div class="secttion-info container">
                    <ul class="container">
                        <li class="text-stats">Name: ${data.name}</li>
                        <li class="text-stats">Age: ${data.age}</li>
                        <li class="text-stats">Date of birth: ${data.date_of_birth}</li>
                        <li class="text-stats">Nationality: ${data.nationality}</li>
                        <li class="text-stats">Position: ${data.position}</li>
                        <li class="text-stats">Current club: ${data.current_club}</li>                
                    </ul>
                </div>                
            </div>
        </div>
        <div class="section-row">            
            <div class="section--col" id="col-3">
                <div class="filters">
                    <div class="filters-title">
                        <p>filters</p>
                    </div>
                    <div class="container">
                        <div class="filter-option" id="filter-teams">
                            <label for="teams">teams:</label>
                            <select id="filter-positions" name="positions" class="text-stats">
                                <optgroup label="Teams">                  
                                </optgroup>                
                            </select>            
                        </div>
                        <div class="filter-option" id="filter-competitions">
                            <label for="competitions">competitions:</label>
                            <select id="filter-positions" name="positions" class="text-stats">
                                <optgroup label="Competitions">                  
                                </optgroup>                
                            </select>   
                        </div>        
                        <div class="filter-option" id="filter-seasons">
                            <label for="seasons">seasons:</label>
                            <select id="filter-positions" name="positions" class="text-stats">
                                <optgroup label="Seasons">                  
                                </optgroup>                
                            </select>   
                        </div>                                              
                    </div>
                    <div class="filter-button">
                        <input type="button" class="text-stats" value="Filter">
                    </div>  
                </div>
            </div>
            <div class="section--col" id="col-4">
                <div class="general">
                    <div class="section-header s-header-secondary">
                        <h1 class="section-title">General Stats</h1>
                    </div>
                    <div class="container"></div>    
                </div>
            </div>
        </div>
    `;  
}  

export const renderGeneralStats = (res) => { 
    var container = document.querySelector(".general .container");
    container.innerHTML = ``

    if(res.status === 200) { 
        res = res.data
        container.innerHTML = 
        `
        <div class="general-stat">
            <span>
                <p class="text-stats">${res.games}</p>
                <p class="text-stats">Games</p>
            </span>
        </div>
        <div class="general-stat">
            <span>
                <p class="text-stats">${res.goals}</p>
                <p class="text-stats">goals</p>
            </span>
        </div>
        <div class="general-stat">
            <span>
                <p class="text-stats">${res.assists}</p>
                <p class="text-stats">assists</p>
            </span>
        </div>    
        <div class="general-stat">
            <span>
                <p class="text-stats">${res['ratio goals involvements']}'</p>
                <p class="text-stats">Frequency of participation in goals</p>
            </span>
        </div>
        <div class="general-stat">
            <span>
                <p class="text-stats">${res['ratio goals']}</p>
                <p class="text-stats">ratio goals</p>
            </span>
        </div>
        <div class="general-stat">
            <span>
                <p class="text-stats">${res['ratio assists']}</p>
                <p class="text-stats">ratio assists</p>
            </span>
        </div>                        
        `;
    } 
    else if (res.status === 404){
        var message = renderMessageError(res.data);
        container.appendChild(message);
    }
    
}

export const renderFilterStats = (res) => {     
    var filters = document.querySelector(".filters");
    var teamFilters = filters.querySelector("#filter-teams select optgroup");
    var competitionsFilters = filters.querySelector("#filter-competitions select optgroup");
    var seasonsFilters = filters.querySelector("#filter-seasons select optgroup");

    if(res.status === 200) {
        res = res.data
        var teams = res.teams;        
        var seasons = res.seasons;
        var competitions = res.competitions;
        
        // Add the item "Total" to the first place
        teams.unshift("Total");
        seasons.unshift("Total");
        competitions.unshift("Total");         

        for (let i = 0; i < teams.length; i++){
            var option = document.createElement("option");        
            option.innerHTML = teams[i];
            option.value = teams[i];
            teamFilters.appendChild(option);
        }   
        
        for (let i = 0; i < seasons.length; i++){
            var option = document.createElement("option");        
            option.innerHTML = seasons[i];
            option.value = seasons[i];
            seasonsFilters.appendChild(option);
        }   

        for (let i = 0; i < competitions.length; i++){
            var option = document.createElement("option");     
            option.innerHTML = competitions[i];
            option.value = competitions[i];
            competitionsFilters.appendChild(option);
        }        
    }
}

export const renderGoalsInvolvements = (res) => {
    const container = document.querySelector("#stats_byinvolvements");
    container.innerHTML = ``;  

    container.innerHTML = 
    `
    <div class="section-row" style="width:100%">
        <div class="section--col">
            <div class="section-header s-header-secondary">
                <h1 class="section-title">goals involvements</h1>
            </div>           
        </div>        
    </div> 
    <div class="section-row" style="width: 80%; margin:auto;">
        <div class="section--col">
            <div class="graph--">            
                <canvas id="goalsInvolvementsChart"></canvas>
                <div class="donut-text">                                              
                </div>                        
            </div>            
        </div>      
    </div>   
    <div class="section-row" style="width: 100%; margin:3rem auto;">
        <div class="section--col">
            <div class="description--" id="goals_involvements">
            </div>
        </div>        
    </div>   
    `    
    let stats =  document.querySelector('#goals_involvements'); 

    while (stats.hasChildNodes()){ stats.removeChild(stats.lastChild);}

    if(res.status === 200) { 
        res = res.data;

        stats.innerHTML =  
        `
            <ul>
                <li class="text-stats">Team's Goals : ${res["team goals"]}</li>
                <li class="text-stats">Player Goals: ${res["player goals"]}</li>
                <li class="text-stats">Player Assists: ${res["player assists"]}</li>
                <li class="text-stats">Goals Involvements: ${res["player goals"] + res["player assists"]}</li>
                <li class="text-stats">Goals Involvements:  ${res["goals involvements"]}%</li>
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
    } 
    else if (res.status === 404){
        container.querySelector(".section-row:nth-child(2)").remove();
        container.querySelector(".section-row:nth-child(2").remove();
        var message = renderMessageError(res.data);
        container.appendChild(message);
    }
}

export const renderBySeason = (res) => {
    const container = document.querySelector("#stats_byseason");
    container.innerHTML = ``;  

    container.innerHTML = 
    `
    <div class="section-row" style="width:100%">
        <div class="section--col">
            <div class="section-header s-header-secondary">
                <h1 class="section-title">Stats By seasons</h1>
            </div>
        </div>
    </div>
    <div class="section-row" style="width: 80%; margin: 3rem auto;">
        <div class="section--col">
            <div class="graph--">            
                <canvas id="perfomSeasonsChart"></canvas> 
            </div>
        </div>               
    </div>   
    <div class="section-row" style="width: 100%; margin:auto;">                
        <div class="section--col">
            <div class="description--" id="perfom_seasons">  
                <li class="text-stats">Best seasons:</li>                      
                <ul></ul>
            </div>
        </div>
    </div>   
    `;

    if(res.status === 200) { 
        res = res.data;
        // Create a list of objects containing the season and its corresponding score
        const seasonInvolvements = res.seasons.map((season, index) => ({
        season: season, involvements: res.goals_involvements[index], goals: res.goals[index], assists: res.assists[index] }));

        // Sort the list of seasons by score in descending order
        const sortedSeasons = seasonInvolvements.sort((a, b) => b.involvements - a.involvements);

        // Rename list
        var topSeasons = sortedSeasons;

        if(sortedSeasons.length > 5){ var topSeasons = sortedSeasons.slice(0, 5);}    

        var performace = document.querySelector("#perfom_seasons ul");

        while (performace.hasChildNodes()){ performace.removeChild(performace.lastChild);}

        topSeasons.forEach(season => {
            var li = document.createElement("li");
            li.className="text-stats";
            li.innerHTML = `${season.season}: ${season.goals} goals | ${season.assists} assists`;         
            performace.appendChild(li);
        })
    } 
    else if (res.status === 404){
        container.querySelector(".section-row:nth-child(2)").remove();
        container.querySelector(".section-row:nth-child(2)").remove();
        var message = renderMessageError(res.data);
        container.appendChild(message);
    }

}

export const renderPerformPosition = (res) => {
    const container = document.querySelector("#perfom_position");
    container.innerHTML = ``;  

    container.innerHTML = 
    `
    <div class="section-row" style="width: 100%;">
        <div class="section--col">
            <div class="section-header s-header-secondary">
                <h1 class="section-title">Performance by position</h1>
            </div>
        </div>
    </div>  
    <div class="section-row" style="width: 80%; margin: 3rem auto;">
        <div class="section--col">
            <div class="graph--">            
                <canvas id="performPosition"></canvas>    
            </div>
        </div>                
    </div>  
    <div class="section-row" style="width: 100%; margin:auto;">                
        <div class="section--col">
            <div class="description--">
                <ul class="container">
                    <li class="text-stats">As</li>
                    <li class="text-stats">Games</li>
                    <li class="text-stats">Goals</li>
                    <li class="text-stats">Assists</li>                
                </ul> 
                <div class="data--"></div>
            </div>
        </div>
    </div>       
    `;

    if(res.status === 200){
        res = res.data;
        
        var table = document.querySelector("#perfom_position .data--");

        while (table.hasChildNodes()){ table.removeChild(table.lastChild);}

        for (let i=0; i < res.position.length; i++) {  
            var performace = document.createElement("ul");
            performace.className = "container";  
            performace.innerHTML =  
            `
                <li class="text-stats">${res.position[i]}</li>
                <li class="text-stats">${res.games[i]}</li>
                <li class="text-stats">${res.goals[i]}</li>
                <li class="text-stats">${res.assists[i]}</li>            
            `
            table.appendChild(performace)
        }
    }
    else if (res.status === 404){
        // container.querySelector(".section-row:nth-child(2)").remove();
        // container.querySelector(".section-row:nth-child(2)").remove();
        var message = renderMessageError(res.data);
        container.appendChild(message);
    }
}       

export const renderPerforCompetition = (res) => {
    var container = document.querySelector(".competitions");

    container.innerHTML =
    `
    <div class="section-header s-header-secondary">
        <h1 class="section-title">Performance by Competition</h1>
    </div>
    <ul class="table container"> 
        <li class="t-head">Competition</li>
        <li class="t-head">MP</li>
        <li class="t-head">Gls.</li>
        <li class="t-head">Assts.</li>
        <li class="t-head">G/A %</li>            
    </ul>
    <div class="data-performace"></div>
    `
    let table = document.querySelector('.competitions .data-performace');
        
    while (table.hasChildNodes()){ table.innerHTML = " "}


    if(res.status === 200){

        res = res.data;

        for (let i=0; i < res.competition.length; i++) {  
            var performace = document.createElement("ul");
            performace.className = "performace container";
            performace.innerHTML =  
            `
                <li class="t-data text-stats">${res.competition[i]}</li>
                <li class="t-data text-stats">${res.games[i]}</li>        
                <li class="t-data text-stats">${res.goals[i]}</li>
                <li class="t-data text-stats">${res.assists[i]}</li>
                <li class="t-data text-stats">${res.performance[i]}%</li>
            `
            table.appendChild(performace)
        }
    }
    else if (res.status === 404) {                
        var message = renderMessageError(res.data);
        container.appendChild(message)
    }
}

// 

// 
var chartInvolvements;
let chartSeason;
let chartPosition;

export const renderInvolvementsChart = async(res) => {
    
    var config = goalsInvolvementsConfig(res.data);    
    if(chartInvolvements){ chartInvolvements.chart.destroy(); }    
    chartInvolvements = new CustomChart();    
    chartInvolvements.createChart(config);
} 
export const renderBySeasonChart = async(res) => {   
   
    var config = performbySeasonConfig(res.data);
    if (chartSeason){ chartSeason.chart.destroy(); }    
    if (res.data.seasons.length <= 2){    
        config["options"]["animation"] = null;
        config["options"]["indexAxis"] = "y";   
    }
    chartSeason = new CustomChart();        
    chartSeason.createChart(config);
} 
export const renderPositionChart = async(res) => {    
    var config = performPositionConfig(res.data);
    if(chartPosition){ chartPosition.chart.destroy(); }
    chartPosition = new CustomChart();    
    chartPosition.createChart(config);
}