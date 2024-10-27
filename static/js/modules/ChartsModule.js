// CustomChart class for handling chart creation and animation
export class CustomChart {
    constructor() {
        this.chartConfig = this.getConfig();
        this.chart = null;
    }

    createChart(config) {
        this.chartConfig.type = config.type;
        this.chartConfig.data = config.data;
        this.chartConfig.options = config.options;

        const ctx2 = config.ctx;       
        this.chart = new Chart(ctx2, this.chartConfig);
        
    }

    requestAnimationFrame(config) {
        this.chartConfig.data.datasets = config.data.datasets;
        this.chartConfig.options.animation = config.options.animation;
        this.chart.update();
    }

    getConfig() {
        return {            
            type: null,  
            data: {
                labels: null,    
                datasets: null,
            },
            options: {             
                maintainAspectRatio: false,              
                responsive: true,
                indexAxis: 'x',
                cutout: null,            
                interaction: {                
                    mode: 'index',                        
                    intersect: false,
                    includeInvisible: true
                },                       
                plugins: {    
                    title: {
                        display: true,
                        text: null,
                        align: 'start',
                        color: '#c7c7c7',                
                        font: {
                            size: 30, 
                            family: "NeueMontreal-Light",
                            weight: 100,                    
                        },
                        padding: { bottom: 5 }
                    }, 
                    subtitle: {
                        display: null,
                        text: null,
                        align: 'start',
                        color: '#c7c7c7',  
                        padding: { bottom: 10 } 
                    },
                    legend: {
                        display: true,
                        align: 'start',                    
                        labels: { color: '#c7c7c7', margin:30, }                
                    }
                },
                scales: {
                    x: { 
                        stacked: true,
                        ticks: {
                            display: false
                        }
                    },
                    
                    y: { 
                        stacked: true,                        
                        ticks: {
                            color: "#c7c7c7", 
                            stepSize: 1,
                            beginAtZero: true, 
                            font: { size: null },                                                            
                        }

                    },                         
                }, 
            },           
        }        
    }
}
// Function to configure the chart for performance by season
export function performbySeasonConfig(stats) {
    var data = {
        labels: stats.seasons,
        datasets: [
            {
                label: 'Goals',
                data: stats.goals,
                fill: 'start',
                borderColor: '#720303',
                pointRadius: 2.5,
                borderWidth: 3,
            },
            {
                label: 'Assists',
                data: stats.assists,
                fill: 'start',
                borderColor: '#fffeee',  
                pointRadius: 2.5,
                borderWidth: 3,
            },
            {
                label: 'Goals Involvements',
                data: stats.goals_involvements,
                fill: 'start',
                borderColor: 'lightsalmon',
                pointRadius: 2.5,
                borderWidth: 3, 
            },
            {
                label: "Games",
                data: stats.games,
                fill: 'start',
                backgroundColor: "#3c3754",
                type: 'bar', 
            },
        ]
    };

    return {       
        type: "line",
        data: data,
        options:{
            indexAxis : "x",
            interaction: {
                mode: 'index',
                intersect: true,
            },              
            plugins: {               
                title: {
                    display: true,
                    text: 'Player performance throughout the seasons.',                 
                    align: 'start',
                    color: '#c7c7c7',                
                    font: {
                        size: 16, 
                        family: "NeueMontreal-Light",
                        weight: 100,                    
                    },
                    padding: { bottom: 5 }
                },
                legend: {
                    display: true,
                    align: 'start',   
                    font: {
                        size: 15, 
                        family: "NeueMontreal-Light",                                       
                    },                 
                    labels: { color: '#c7c7c7', margin:30, },
                    padding: { bottom: 5 }                
                }
            },            
            maintainAspectRatio: false,              
            responsive: true,
            scales    : scalesLIneChart,
            animation : animationProgressLine(stats.seasons),
        },        
        ctx : document.querySelector("#perfomSeasonsChart").getContext('2d'),
    };
}
// Function to configure the chart for performance by position
export function performPositionConfig(stats) {
 
    // Object.keys(stats) returns an array of keys (positions)
    var positions = Object.keys(stats);

    var positionLabels = [] 
    var goalData   = []
    var assitsData = []
    var gamesData  = []
    
    for (let i = 0; i < positions.length; i++) {
        // Access the position (key) and the corresponding dictionary
        let position = positions[i];
        let statsForPosition = stats[position];

        // Log the position and corresponding dictionary
        positionLabels.push(position);
        gamesData.push(statsForPosition.games);
        goalData.push(statsForPosition.goals);
        assitsData.push(statsForPosition.assists);            
      }

    var data = {        
        labels: stats.position,        
        datasets: [{            
            label: 'Matches Played',
            data: stats.games,
            backgroundColor: "#3c3754",              
        },
        {            
            label: 'Goals',
            data: stats.goals,
            backgroundColor: "#720303",            
        },
        {            
            label: 'Assits',
            data: stats.assists,
            backgroundColor: "#fffeee",           
        }
    ]
    };

    return {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            interaction: {
                mode: 'index',
                intersect: true,
            },  
            plugins: {
                title: {
                    display:true,
                    title: "Tracking player performance throughout the seasons."   
                }   
            },
            maintainAspectRatio: false,              
            responsive: true,
            scales:{
                x: { 
                    grid: {
                        color: '#aaaaaa30',
                        drawOnChartArea: true,
                        drawTicks: false,
                    }
                }   
            }        
        },        
        ctx: document.querySelector("#performPosition").getContext('2d'),
    };
}
// Function to configure the doughnut chart for goals involvements
export function goalsInvolvementsConfig(stats){
    var goalPCT     = ( (stats["player goals"] / stats["team goals"]) * 100 ); 
    var assistsPCT  = ( (stats["player assists"] / stats["team goals"]) * 100 );
    var teamGoalPCT = 100 - (goalPCT + assistsPCT); 

    var data = {
        labels: [ "Player's Goals","Player's Assists", "Teams's Goals" ],
        datasets: [                        
            {                        
                data: [goalPCT.toFixed(2), assistsPCT.toFixed(2), teamGoalPCT.toFixed(2)],
                label: "player's Goals",
                borderWidth: 0,
                backgroundColor: [
                "#720303",
                "#fffeee",
                "#3c3754",
                ],
                hoverOffset: 10  
            }
            
        ]
    }

    return {
        type : 'doughnut',
        data: data,
        options: {
            cutout : '80%',  
            maintainAspectRatio: false,              
            responsive: true,  
            animation: animationDonut(),
            
        }, 
        ctx: document.querySelector("#goalsInvolvementsChart").getContext('2d'),
    }

}

// CHART ANIMATIONS
// Function to define the animation for progress line chart
function animationProgressLine(chartData){
    var delayBetweenPoints = 2000 / chartData.length;
    const previousY = (ctx) =>
        ctx.index === 0
            ? ctx.chart.scales.y.getPixelForValue(100)
            : ctx.chart            
            .getDatasetMeta(ctx.datasetIndex)
            .data[ctx.index - 1].getProps(["y"], true).y;
    return {
        x: {
            type: "number",
            easing: "linear",
            duration: delayBetweenPoints,
            from: NaN,
            delay(ctx) {
                if (ctx.type !== "data" || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            },
        },
        y: {
            type: "number",
            easing: "linear",
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== "data" || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            },
        },
    };

}
// Function to define the animation for the doughnut chart
const animationDonut = ()=>{
    return {
        animationEasing: "easeOutSine",
        animateRotate: true, // Animate the rotation of the doughnut chart
        duration: 1000 // Set the animation duration to 2000 milliseconds (2 seconds)
    }
}
// Configuration for line chart scales
const scalesLIneChart = {
    x: {
        stacked: true,
        ticks: {
            display: true,
            color: "#c7c7c7",
            stepSize: 1,
            beginAtZero: true,
        },
    },
    y: {        
        ticks: { display: true },
        border: { display: true,},
        grid: {
            color: '#aaaaaa30',
            drawOnChartArea: true,
            drawTicks: true,
        }
    }
};


