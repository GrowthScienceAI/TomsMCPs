import os
import json
import logging
from flask import Flask, render_template, send_from_directory
from logging.handlers import RotatingFileHandler

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get("SESSION_SECRET")
app.config['ENV'] = os.environ.get("FLASK_ENV", "production")
app.config['DEBUG'] = os.environ.get("FLASK_DEBUG", "False").lower() == "true"

# Security: Ensure secret key is set in production
if not app.config['SECRET_KEY']:
    if app.config['ENV'] == 'production':
        raise ValueError("SESSION_SECRET environment variable must be set in production")
    else:
        app.config['SECRET_KEY'] = 'dev_secret_key_change_in_production'
        app.logger.warning("Using default secret key - not suitable for production!")

# Configure logging
log_level = os.environ.get('LOG_LEVEL', 'INFO').upper()
logging.basicConfig(
    level=getattr(logging, log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Add file handler for production
if app.config['ENV'] == 'production':
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/tomsmcps.log', maxBytes=10240000, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('TomsMCPs startup')

# Security headers
@app.after_request
def add_security_headers(response):
    """Add security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    return response

@app.route('/')
def index():
    """Render the main page with server data"""
    try:
        with open('static/data/servers.json', 'r') as f:
            servers_data = json.load(f)
        app.logger.info(f'Loaded {len(servers_data)} servers')
    except FileNotFoundError:
        app.logger.error('servers.json file not found')
        servers_data = []
    except json.JSONDecodeError as e:
        app.logger.error(f'Error parsing servers.json: {e}')
        servers_data = []
    except Exception as e:
        app.logger.error(f'Unexpected error loading servers: {e}')
        servers_data = []

    return render_template('index.html', servers=servers_data)

@app.route('/favicon.ico')
def favicon():
    """Serve favicon"""
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/health')
def health():
    """Health check endpoint for monitoring"""
    return {'status': 'healthy', 'servers_count': get_server_count()}, 200

def get_server_count():
    """Get count of servers in the database"""
    try:
        with open('static/data/servers.json', 'r') as f:
            servers_data = json.load(f)
        return len(servers_data)
    except:
        return 0

if __name__ == '__main__':
    # Development server - DO NOT USE IN PRODUCTION
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'

    app.logger.info(f'Starting development server on {host}:{port}')
    app.run(host=host, port=port, debug=debug)
