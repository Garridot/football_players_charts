from flask import Flask, render_template, jsonify, request, abort, make_response

from utils.fetchs import * 
from utils.compute import * 

import random
import secrets

app = Flask(__name__)

# Set a secret key for session security
app.secret_key = secrets.token_hex(16)  # Generates a hexadecimal secret key of 16 bytes (32 characters)

@app.route('/')
def home(): ### Route to render the home template
    return render_template('home.html')

@app.route('/players')
def list_players():
    context = { "list_players" : get_list_players(), }
    return render_template('players.html', context=context)


@app.route('/player/<int:id>/<string:name>')
def return_player(id,name): 
    data = get_player({ "player" : id })
    context = {
        "status_code": data.status_code,
        "data": data.json(),
        }
    return render_template('player_stats.html',context=context)


@app.route('/api/get_player_data')
def get_player_data(): 
    
    list_players = get_list_players()
    player = random.choice(list_players) 
    player_data = get_stats({ "player" : player["id"] })    
    player_stat = general_stats(player_data)
   
    context = {
        "list players"  : list_players,
        "player"        :  player,
        "general stats" : player_stat,   
    }

    # Return data in JSON formats
    return jsonify(context)



@app.route('/api/player_stats/player/<int:id>',methods=['POST'])
def get_general_stats(id):    
    data = {"player":id} 

    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']   
        if 'competition' in filters: data["competition"] = filters['competition']  
        if 'season' in filters : data["season"] = filters['season']   

    stats = get_stats(data)         
    stats_by_position = get_stats_by_position(data)

    if len(stats) != 0: 
        general   = general_stats(stats)
        by_season = performance_by_season(stats)
        by_cooet  = performance_competition(stats) 
        involvements = goals_involvements(stats)        

        context = {
            "general stats" : general, 
            "performance by season": by_season,
            "performance by competition": by_cooet,
            "goals involvements" : involvements,
            "stats by position"  : performance_by_position(stats_by_position),
        }

        # Return data in JSON format
        return jsonify(context)

    else: return make_response(jsonify({"404": "Stats not found"}), 404)

    




if __name__ == '__main__':  
    app.run(debug=True)
   