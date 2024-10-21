import requests
import json


URL_PLAYERS_STATS      = 'https://football-player-charts-stats-api.onrender.com/player_stats_general/'
URL_PLAYERS            = 'https://football-player-charts-stats-api.onrender.com/players/'
URL_STATS_BY_POSITION  = 'https://football-player-charts-stats-api.onrender.com/player_stats_position/'

### Function to retrieve player data from the API
def get_list_players():    
    try:
        response = requests.get(URL_PLAYERS, {"Content-Type": "application/json"})
        response.raise_for_status()  # Raises an exception for non-successful HTTP responses
        return response.json()
    except requests.exceptions.RequestException as e:
        # Handle the request exception, for example, logging an error message
        print(f"Error during request: {e}")
        return None  

# Function to retrieve player details from the API based on player ID
def get_player(data):  
    try:        
        headers = {"Content-Type": "application/json"} # set headers to indicate JSON content 
        response = requests.get(f"{URL_PLAYERS}{data['player']}", headers=headers)
        # response.raise_for_status()
        return response
    except requests.exceptions.RequestException as e:
        return print(f"Error during request to stats API: {e}")
        
# Function to retrieve player stats from the API based on player data
def get_stats(data): 
    try:
        data_json = json.dumps(data)  # convert data to JSON format 
        headers = {"Content-Type": "application/json"} # set headers to indicate JSON content 
        response = requests.get(URL_PLAYERS_STATS, data=data_json, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error during request to stats API: {e}")
        return None       

# Function to retrieve player stats by position from the API
def get_stats_by_position(data): 
    try:
        data_json = json.dumps(data)  # convert data to JSON format 
        headers = {"Content-Type": "application/json"} # set headers to indicate JSON content 
        response = requests.get(URL_STATS_BY_POSITION, data=data_json, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error during request to stats API: {e}")
        return None 