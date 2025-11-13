"""
TomsMCPs - Model Context Protocol Server Directory
Entry point for production deployment
"""
import os
from app import app

if __name__ == '__main__':
    # Get configuration from environment
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'

    # Run the application
    app.run(host=host, port=port, debug=debug)
