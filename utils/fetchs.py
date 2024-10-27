import requests
import json
from config import Config
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

URL_PLAYERS           = Config.URL_PLAYERS
URL_PLAYERS_STATS     = Config.URL_PLAYERS_STATS
URL_STATS_BY_POSITION = Config.URL_STATS_BY_POSITION

def fetch_data_from_api(endpoint, params=None):
    """Fetch data from a given API endpoint with optional query parameters."""    
    try:
        data_json = json.dumps(params)  # convert data to JSON format 
        headers = {"Content-Type": "application/json"} # set headers to indicate JSON content 
        response = requests.get(endpoint, data=data_json, headers=headers)

        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx, 5xx)
        logging.info(f"Fetched data from {endpoint} with params {params}")
        return response.json()
    except requests.RequestException as e:
        logging.error(f"Error fetching data from {endpoint}: {e}")
        return None

def get_list_players():
    """Retrieve list of players."""
    endpoint = URL_PLAYERS
    return fetch_data_from_api(endpoint)

def get_player(data):
    """Retrieve player data by ID."""
    endpoint = f"{URL_PLAYERS}{data['player']}"
    return fetch_data_from_api(endpoint, params=data)

def get_stats(data):
    print(data)
    """Retrieve general stats for a player."""
    endpoint = URL_PLAYERS_STATS    
    return fetch_data_from_api(endpoint, params=data)

def get_player_stats_by_position(data):
    """Retrieve stats for a player, grouped by position."""
    endpoint = URL_STATS_BY_POSITION
    return fetch_data_from_api(endpoint, params=data)
