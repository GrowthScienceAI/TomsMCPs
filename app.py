import os
import json
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

@app.route('/')
def index():
    # We'll load and pass server data to the template
    try:
        with open('static/data/servers.json', 'r') as f:
            servers_data = json.load(f)
    except:
        # If file doesn't exist yet, use empty list
        servers_data = []
        
    return render_template('index.html', servers=servers_data)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
