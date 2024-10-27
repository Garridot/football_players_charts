import { getPlayerData, getListPlayers, getPlayerGeneralStats} from './modules/FetchModule.js';
import { renderPlayerData, renderGeneralStats, renderFilterStats, renderPlayerList, renderLoederAnimation} from './modules/RenderModule.js';
import { getFilters } from './modules/FilterStatsmodule.js'

var player = Math.floor(Math.random() * 11) + 1 ;

var dataPlayer;
var generalStats;
var listPlayers; 

document.querySelector(".wrapper-- main").appendChild(renderLoederAnimation())

const addLinkPlayer = (dataPlayer) => {
    var section = document.createElement("div");
    section.className = "section-row";
    section.style.width = "100%";
    section.innerHTML =
    `
    <div class="section--col">            
        <div class="about__">
            <a href="/player_stats/${dataPlayer.id}">View more about ${dataPlayer.name}</a>
            <span class="line--"></span>
        </div>
    </div>
    `;

    document.querySelector("main").appendChild(section)
}

async function loadData() {

    try {        
        dataPlayer = await getPlayerData(player);
        generalStats = await getPlayerGeneralStats(player,null); 
        listPlayers = await getListPlayers(); 

    } catch (error) {

    } finally {
        renderPlayerData(dataPlayer);
        addLinkPlayer(dataPlayer);
        renderGeneralStats(generalStats);
        renderFilterStats(generalStats);          
        renderPlayerList(listPlayers); 

        var filterButton = document.querySelector(".filter-button input");

        filterButton.addEventListener("click", async()=>{
            var extraFilters = getFilters()

            try {
                var performace = document.querySelector(".general .container");

                performace.innerHTML = "";
                performace.appendChild(renderLoederAnimation())

                const generalStats = await getPlayerGeneralStats(player, extraFilters);              
                renderGeneralStats(generalStats);   
                
            } catch (error) {               
                console.log(error.message)  
               
            }
        })
    }

}

await loadData()