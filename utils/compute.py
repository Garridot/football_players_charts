import pandas as pd 

def general_stats(data,stats):
    """ Function to compute general statistics based on player stats """
    context = {}   
    context['player'] = data["player"]       
    context['goals']    = 0
    context['assists']  = 0
    context['games']    = 0  

    minutes_played = 0

    for stat in stats: # Compute cumulative statistics 
        context['goals']   += stat['goals'] 
        context['assists'] += stat['assists']
        context['games']   += stat['games']
        minutes_played += stat["minutes_played"]

    # Compute ratios
    context['ratio goals']   = round(context['goals'] / context['games'],2)     
    context['ratio assists'] = round(context['assists'] / context['games'],2)

    context['ratio goals involvements']  = round( minutes_played / ( context['goals'] + context['assists'] ) ,2) 

    # Extra data
    df = pd.DataFrame(stats)

    context['teams'] = df["team"].unique().tolist()
    context['competitions'] = df["competition"].unique().tolist()
    context['seasons'] = df["season"].unique().tolist()

    return context


def goals_involvements(stats):
    """ Function to compute goals involvements based on player stats """    
    df = pd.DataFrame(stats)    

    goals = int(df['goals'].sum())
    assists = int(df['assists'].sum())
    team_goals = int(df['team_goals'].sum())

    context = {
        "team goals": team_goals,
        "player goals": goals,
        "player assists": assists,
        "goals involvements": round((goals + assists) * 100 / team_goals, 2),
    }

    return context

def performance_by_season(stats): 
    """ compute all player's goals, player's assists, player's goals involvements and player's matches by season """  
    df = pd.DataFrame(stats)

    df = df.groupby(['season']).sum() # Group by season and sum all stats  

    context = {}     
    context['seasons'] = df.index.tolist()    
    context['goals']   = df['goals'].values.tolist()
    context['assists'] = df['assists'].values.tolist() 
    context['games']   = df['games'].values.tolist() 
    
    goals_involvements = []  # Compute goals involvements by season  
    for goal,assist in zip (context['goals'],context['assists']): 
        goals_involvements.append( goal + assist )    

    context['goals_involvements'] =  goals_involvements

    return context
   

def performance_competition(stats):
    """
    compute all player's goals, player's assists, player's goals involvements and player's matches by competition    
    """

    df = pd.DataFrame(stats)
    df = df.groupby(['competition']).sum()        

    goals    = df['goals'].values.tolist()
    assists  = df['assists'].values.tolist()
    team_gls = df['team_goals'].values.tolist()
    
    performance = []
    for g,a,t in zip(goals,assists,team_gls): 
        # if 'team_gls' is equal to 0, replace to 1(You can not divide by zero)  
        try:    performance.append(round(((g+a)*100) / int(t),2))
        except: performance.append(round(((g+a)*100) / 1,2))

    df['performance'] = performance 

    df.sort_values(by=['games'], inplace=True, ascending=False)

    context = {
        'competition' : df.index.unique().to_list(),    
        'games'       : df['games'].values.tolist(), 
        'team_goals'  : df['team_goals'].values.tolist(),
        'goals'       : df['goals'].values.tolist(),
        'assists'     : df['assists'].values.tolist(), 
        'performance' : df['performance'].values.tolist(), 
    }
    
    return context 


def performance_by_position(stats):
    """ Function to compute player's performance by position. """
    df = pd.DataFrame(stats)   

    df = df.groupby(['position']).sum() 

    context = {
        'position'    : df.index.unique().to_list(),    
        'games'       : df['games'].values.tolist(),         
        'goals'       : df['goals'].values.tolist(),
        'assists'     : df['assists'].values.tolist(),         
    }
    
    return context 
