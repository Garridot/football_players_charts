import {  getPlayerGeneralStats, getPlayerStatsByCompetition, getPlayerStatsByGoalsInvolvements, getPlayerStatsByPosition, getPlayerStatsBySeason } from './modules/FetchModule.js';
import { 
    renderPlayerData, renderGeneralStats, renderFilterStats, renderLoederAnimation, renderPerforCompetition, renderGoalsInvolvements, renderBySeason, renderPerformPosition,
    renderInvolvementsChart, renderBySeasonChart, renderPositionChart} from './modules/RenderModule.js';
    
import { getFilters } from './modules/FilterStatsmodule.js'
 
// 
let playerData = response.data;

// 
let generalStats;
let statsByCompetition;  
let statsByInvolvements;
let statsBySeason;
let statsByPosition;

const waitDataAnimation = (container) => {
    container.innerHTML = "";
    container.appendChild(renderLoederAnimation());    
} 

const renderExtraStats = async(dataList) => {    

    // Render Tamplates
    renderGoalsInvolvements(dataList[0]);
    renderBySeason(dataList[1]);
    renderPerformPosition(dataList[2]);
    renderPerforCompetition(dataList[3]);       

    // Render Charts
    if (dataList[0].status = 200) {
        renderInvolvementsChart(dataList[0]);
        renderBySeasonChart(dataList[1]);
        renderPositionChart(dataList[2]);
    }
}

document.querySelector("main").appendChild(renderLoederAnimation());

async function loadData() {

    try { 
        generalStats = await getPlayerGeneralStats(playerData.id,null); 
    } catch (error) {
        console.error(error);
    } finally {
        
        const involvementsSection = document.querySelector("#stats_byinvolvements");
        const seasonSection = document.querySelector("#stats_byseason");
        const positionSection = document.querySelector("#perfom_position");
        const competitionSection = document.querySelector(".competitions");  
        
        waitDataAnimation(involvementsSection);
        waitDataAnimation(seasonSection);
        waitDataAnimation(positionSection);
        waitDataAnimation(competitionSection);

        renderPlayerData(playerData);
        renderGeneralStats(generalStats);
        renderFilterStats(generalStats);  

        statsByInvolvements = await getPlayerStatsByGoalsInvolvements(playerData.id,null);          
        statsBySeason = await getPlayerStatsBySeason(playerData.id,null);
        statsByPosition = await getPlayerStatsByPosition(playerData.id,null);
        statsByCompetition = await getPlayerStatsByCompetition(playerData.id,null); 

        await renderExtraStats([statsByInvolvements,statsBySeason,statsByPosition,statsByCompetition]);

        var filterButton = document.querySelector(".filter-button input");        
        filterButton.addEventListener("click", async()=>{
            var extraFilters = getFilters();

            try { 

                const generalSection = document.querySelector(".general .container");
                const involvementsSection = document.querySelector("#stats_byinvolvements");
                const seasonSection = document.querySelector("#stats_byseason");
                const positionSection = document.querySelector("#perfom_position");
                const competitionSection = document.querySelector(".competitions");                  

                waitDataAnimation(generalSection);
                waitDataAnimation(involvementsSection);
                waitDataAnimation(seasonSection);
                waitDataAnimation(positionSection);
                waitDataAnimation(competitionSection);

                generalStats = await getPlayerGeneralStats(playerData.id, extraFilters); 
                statsByInvolvements = await getPlayerStatsByGoalsInvolvements(playerData.id,extraFilters);
                statsByCompetition = await getPlayerStatsByCompetition(playerData.id,extraFilters);                
                statsBySeason = await getPlayerStatsBySeason(playerData.id,extraFilters); 
                statsByPosition = await getPlayerStatsByPosition(playerData.id,extraFilters); 
                
                renderGeneralStats(generalStats);
                
                await renderExtraStats([statsByInvolvements,statsBySeason,statsByPosition,statsByCompetition]);               
                
            } catch (error) {               
                console.log(error.message);  
               
            }
        })
    }

}

await loadData()


