export const getFilters = () => {
            
    var teamSelect         = document.querySelector("#filter-teams select");
    var competitionsSelect = document.querySelector("#filter-competitions select");
    var seasonsSelect      = document.querySelector("#filter-seasons select"); 

    var team        = teamSelect.options[teamSelect.selectedIndex].value;        
    var competition = competitionsSelect.options[competitionsSelect.selectedIndex].value;  
    var season      = seasonsSelect.options[seasonsSelect.selectedIndex].value;  

    var extraFilters = {}
    if(team != "Total"){ extraFilters["team"] = team };
    if(competition != "Total"){ extraFilters["competition"] = competition };
    if(season != "Total"){ extraFilters["season"] = season }; 

    return extraFilters
}