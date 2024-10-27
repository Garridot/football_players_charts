from flask import Flask, render_template
from api.routes import bp as routes_bp
from utils.fetchs import get_player
import secrets


def create_app():
    app = Flask(__name__)

    # Set a secret key for session security
    app.secret_key = secrets.token_hex(16)  # Generates a hexadecimal secret key of 16 bytes (32 characters)   

    # Register blueprints   
    app.register_blueprint(routes_bp, url_prefix='/api')

    @app.route('/')
    def home():
        """Render the home page."""
        return render_template('home.html')

    @app.route('/player_stats/<int:id>')
    def return_player(id):
        """Retrieve player details and render them on a template."""
        data = get_player({"player": id})        
        context = {            
            "data": data,
        }
        return render_template('player_stats.html', context=context)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)    