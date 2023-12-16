# Football Player Charts 

## Overview
Football Player Charts is a web application built with Flask that allows users to explore and analyze performance statistics of football players. The application fetches player data from an external API and provides insights into various aspects of a player's performance, such as goals, assists, games played, and more.

## Key Features
- **Player Statistics**: View detailed statistics for individual players, including general stats, performance by season, and performance by competition.

- **Interactive Charts**: Gain insights into a player's impact on their team through interactive charts and visualizations.

## How to Use

1. Clone the repository:

```bash
git clone https://github.com/Garridot/football_players_charts.git

```

2. Navigate to the project directory:

```bash
cd football_players_charts
```

3. Install dependencies:

```bash  
pip install -r requirements.txt

```
4. Run the application:

```bash  
python run.py
```

Visit the web application in your browser and start exploring football player statistics!

## Dependencies

- Flask
- Pandas
- Requests
- Charts.js 

## Project Structure
- **utils/**: Contains utility modules for handling API requests and computing statistics.
- **static/**: Holds static files such as CSS styles, icons, and JavaScript files.
- **templates/**: Contains HTML templates for the application views.
- **.github/**: Contains a cron job to keep the server running.  

## Contribution
1. Fork the repository.
2. Create a branch for your contribution: 
```bash  
git checkout -b my-contribution
```
3. Make your changes and commit:
```bash
git commit -m "Description of changes"
```
4. Send a pull request.


