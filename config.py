from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    URL_PLAYERS_STATS = os.getenv("URL_PLAYERS_STATS")
    URL_PLAYERS = os.getenv("URL_PLAYERS")
    URL_STATS_BY_POSITION = os.getenv("URL_STATS_BY_POSITION")