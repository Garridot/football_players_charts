from flask import Blueprint, render_template, jsonify, request, abort, make_response
from utils.fetchs import get_player, get_list_players, get_stats, get_player_stats_by_position
from utils.compute import general_stats, goals_involvements, performance_by_season, performance_competition, performance_by_position

bp = Blueprint('main', __name__)

@bp.route('/list_players', methods=['GET'])
def list_players():
    """Retrieve and return a list of players."""
    return jsonify(get_list_players())

@bp.route('/get_player_data/player/<int:id>', methods=['GET'])
def get_player_data(id):
    """ 
    Returns data of a player.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}

    player = get_player(data)
        
    if player:
        return jsonify(player)
    else:
        return make_response(jsonify({"404": "Players not found"}), 404)

@bp.route('/player_stats/player/<int:id>/general', methods=['POST'])
def get_stats_general(id):
    """ 
    Returns general statistics for a player.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}
    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']
        if 'competition' in filters: data["competition"] = filters['competition']
        if 'season' in filters: data["season"] = filters['season']

    stats = get_stats(data)    
    if stats:
        return jsonify(general_stats(data,stats))
    else:
        return make_response(jsonify({"404": "Stats not found"}), 404)


@bp.route('/player_stats/player/<int:id>/by_season', methods=['POST'])
def get_stats_by_season(id):
    """ 
    Returns player performance grouped by season.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}
    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']
        if 'competition' in filters: data["competition"] = filters['competition']
        if 'season' in filters: data["season"] = filters['season']

    stats = get_stats(data)
    if stats:
        return jsonify(performance_by_season(stats))
    else:
        return make_response(jsonify({"404": "Stats not found"}), 404)


@bp.route('/player_stats/player/<int:id>/by_competition', methods=['POST'])
def get_stats_by_competition(id):
    """ 
    Returns player performance grouped by competition.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}
    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']
        if 'competition' in filters: data["competition"] = filters['competition']
        if 'season' in filters: data["season"] = filters['season']

    stats = get_stats(data)
    if stats:
        return jsonify(performance_competition(stats))
    else:
        return make_response(jsonify({"404": "Stats not found"}), 404)


@bp.route('/player_stats/player/<int:id>/goals_involvements', methods=['POST'])
def get_goals_involvements(id):
    """ 
    Returns player goals involvements.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}
    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']
        if 'competition' in filters: data["competition"] = filters['competition']
        if 'season' in filters: data["season"] = filters['season']

    stats = get_stats(data)
    if stats:
        return jsonify(goals_involvements(stats))
    else:
        return make_response(jsonify({"404": "Stats not found"}), 404)


@bp.route('/player_stats/player/<int:id>/by_position', methods=['POST'])
def get_stats_by_position(id):
    """ 
    Returns player performance grouped by position.
    Receives player ID and optional filters for team, competition, or season.
    """
    data = {"player": id}
    filters = request.get_json()

    if filters:
        if 'team' in filters: data["team"] = filters['team']
        if 'competition' in filters: data["competition"] = filters['competition']
        if 'season' in filters: data["season"] = filters['season']

    stats_by_position = get_player_stats_by_position(data)
    if stats_by_position:
        return jsonify(performance_by_position(stats_by_position))
    else:
        return make_response(jsonify({"404": "Stats not found"}), 404)