# TomsMCPs - MCP Server Directory

A comprehensive, searchable web directory of Model Context Protocol (MCP) servers, designed to help developers discover and integrate MCP servers for AI automation and enhancement.

## Overview

TomsMCPs is a user-friendly web application that catalogs **316 MCP servers** across **43 curated categories**, providing an intuitive interface for browsing, searching, and filtering servers based on your specific needs. Whether you're looking for database integrations, web scraping tools, cloud storage solutions, or AI thinking tools, this directory makes discovery straightforward and efficient.

## Features

- **Comprehensive Catalog**: 316 MCP servers organized across 43 categories
- **Advanced Search**: Full-text search across server names and descriptions
- **Multi-Faceted Filtering**:
  - Tab-based category navigation
  - Dropdown filters for precise results
  - Real-time filtering without page reloads
- **Top Categories Include**:
  - Database (39 servers) - PostgreSQL, SQLite, ClickHouse, etc.
  - Development Tools (27 servers) - IDEs, debugging, package management
  - AI & Machine Learning (17 servers) - LLM tools, ML pipelines
  - Search (16 servers) - Brave Search, Perplexity, Exa
  - Analytics & Data (16 servers) - BI, data processing, visualization
  - Cloud & Infrastructure (15 servers) - AWS, Cloudflare, hosting
  - API & Integration (13 servers) - API gateways, webhooks
  - Web Scraping & Data (10 servers) - Puppeteer, data extraction
  - DevOps & CI/CD (9 servers) - Docker, CircleCI, deployment
  - Plus 34 more specialized categories
- **Direct GitHub Links**: Each server links directly to its official repository
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible UI**: Clean, modern interface following web accessibility standards
- **Health Monitoring**: Built-in health check endpoint for uptime monitoring

## Technologies

### Backend
- **Python 3.11+**: Runtime environment
- **Flask 3.1.1+**: Lightweight web framework with security headers
- **Gunicorn 23.0.0**: Production WSGI HTTP server
- **Flask-SQLAlchemy**: Database support (configured for future scaling)

### Frontend
- **Vanilla HTML/CSS/JavaScript**: No complex frameworks, optimized for performance
- **Responsive CSS**: Flexbox-based layout system
- **Fetch API**: Async data loading and manipulation
- **Jinja2**: Server-side templating

### Security & Production
- **Environment-based Configuration**: Secure secret management
- **Security Headers**: CSP, HSTS, X-Frame-Options, XSS Protection
- **Logging**: Rotating file handlers with configurable log levels
- **Health Checks**: Monitoring endpoint for uptime tracking

### Deployment
- **Render.com**: Free tier cloud hosting (recommended)
- **Git-based Deployment**: Auto-deploy on push to main branch
- **Alternative Platforms**: Compatible with Railway, Fly.io, Heroku

## Installation

### Prerequisites
- Python 3.11 or higher
- pip (Python package manager)
- Git

### Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/GrowthScienceAI/TomsMCPs.git
cd TomsMCPs
```

2. **Create a virtual environment (recommended):**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and set your SESSION_SECRET
# For development, you can use any random string
# For production, use a secure random key:
python -c "import secrets; print(secrets.token_hex(32))"
```

5. **Run the application:**
```bash
# Development mode
export FLASK_ENV=development
export FLASK_DEBUG=True
python app.py

# Production mode (recommended for testing)
export FLASK_ENV=production
export FLASK_DEBUG=False
gunicorn --bind 0.0.0.0:5000 main:app
```

6. **Open your browser and navigate to:**
```
http://localhost:5000
```

### Environment Variables

Create a `.env` file or set these environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SESSION_SECRET` | Yes (production) | - | Secret key for session management |
| `FLASK_ENV` | No | `production` | Environment mode (`development` or `production`) |
| `FLASK_DEBUG` | No | `False` | Enable debug mode |
| `PORT` | No | `5000` | Server port |
| `HOST` | No | `0.0.0.0` | Server host |
| `LOG_LEVEL` | No | `INFO` | Logging level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

## Project Structure

```
TomsMCPs/
├── app.py                     # Flask application with security & logging
├── main.py                    # Production entry point
├── requirements.txt           # Python dependencies
├── pyproject.toml            # Python project metadata
├── render.yaml               # Render.com deployment config
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── static/                   # Static assets
│   ├── css/
│   │   └── styles.css        # Responsive styling
│   ├── js/
│   │   └── script.js         # Client-side filtering & interactivity
│   ├── data/
│   │   └── servers.json      # MCP server database (316 servers)
│   ├── images/
│   │   └── logo.png          # Application logo
│   └── favicon.ico           # Site favicon
├── templates/
│   └── index.html            # Main application template
└── attached_assets/          # Reference files and original data
```

## Usage

### Browsing Servers
- The homepage displays all available MCP servers in a grid layout
- Each card shows the server name, description, category, and GitHub link

### Searching
- Use the search bar at the top to filter servers by name or description
- Search is case-insensitive and updates results in real-time

### Filtering by Category
- Click on category tabs to filter servers by type
- Use the dropdown filter for more precise category selection
- Select "All Categories" to view the complete catalog

### Accessing Server Details
- Click "View on GitHub" to visit the server's official repository
- Each link opens in a new tab for convenient browsing

## Data Structure

The server data is stored in `static/data/servers.json` with the following structure:

```json
{
  "name": "Server Name",
  "url": "https://github.com/...",
  "description": "Brief description of the server",
  "category": "Category Name"
}
```

## Architecture

TomsMCPs follows a hybrid architecture:
- **Server-Side Rendering (SSR)**: Initial page load uses Jinja2 templates
- **Client-Side Filtering**: Dynamic filtering happens in the browser for better UX
- **Static JSON Data**: Servers are stored in a JSON file for simplicity and speed
- **Minimal Backend**: Single Flask route serves the main page

For detailed architecture documentation, see `replit.md`.

## Contributing

Contributions are welcome! To add a new MCP server to the directory:

1. Fork the repository
2. Add your server entry to `static/data/servers.json`:
```json
{
  "name": "Your Server Name",
  "url": "https://github.com/your-repo/server",
  "description": "Brief description of what your server does",
  "category": "Appropriate Category"
}
```
3. Ensure the category matches existing categories or propose a new one
4. Test locally to ensure the server appears correctly
5. Submit a pull request with a clear description

### Guidelines
- Keep descriptions concise (1-2 sentences)
- Use official GitHub repository URLs
- Choose the most appropriate category
- Ensure all fields are properly formatted

## Future Enhancements

Potential improvements planned for future versions:
- GitHub API integration for real-time server statistics
- Database migration for better scalability
- Admin interface for managing servers
- User authentication and favorites
- Server ratings and reviews
- API endpoint for programmatic access
- Advanced sorting options (popularity, recent updates, etc.)

## Development Philosophy

TomsMCPs embraces a "Keep It Simple" approach:
- No unnecessary complexity or frameworks
- Fast load times and responsive interactions
- Maintainable, readable code
- Static files over database for simplicity
- Client-side operations for better UX

## Deployment

### Deploying to Render.com (Recommended)

Render.com offers a generous free tier perfect for side projects. The application is pre-configured for Render deployment.

#### Quick Deploy

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Create a Render account:**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

3. **Create a new Web Service:**
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository (`TomsMCPs`)
   - Render will automatically detect the `render.yaml` configuration

4. **Configure (if using Blueprint):**
   - If you used the render.yaml blueprint, everything is pre-configured
   - If manually creating, use these settings:
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn main:app`
     - **Environment:** `Python 3.11`

5. **Set Environment Variables:**
   - Render automatically generates `SESSION_SECRET` (from render.yaml)
   - Or manually add in the Render dashboard:
     - `SESSION_SECRET`: Generate with `python -c "import secrets; print(secrets.token_hex(32))"`
     - `FLASK_ENV`: `production`
     - `FLASK_DEBUG`: `False`
     - `LOG_LEVEL`: `INFO`

6. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Your app will be live at `https://your-service-name.onrender.com`

#### Auto-Deploy on Git Push

Once connected, Render automatically deploys when you push to the main branch:
```bash
git add .
git commit -m "Update servers"
git push origin main
# Render automatically deploys the changes
```

#### Monitoring

- **Health Check:** Render uses the `/health` endpoint to monitor uptime
- **Logs:** View real-time logs in the Render dashboard
- **Free Tier Note:** Free tier services spin down after 15 minutes of inactivity and spin up on first request (~30 second delay)

### Alternative Deployment Options

#### Railway.app
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Fly.io
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch
fly deploy
```

#### Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SESSION_SECRET=$(python -c "import secrets; print(secrets.token_hex(32))")
heroku config:set FLASK_ENV=production

# Deploy
git push heroku main
```

### Manual Server Deployment

For VPS or dedicated servers:

1. **Install dependencies:**
```bash
sudo apt update
sudo apt install python3.11 python3-pip nginx
```

2. **Clone and setup:**
```bash
git clone https://github.com/GrowthScienceAI/TomsMCPs.git
cd TomsMCPs
pip install -r requirements.txt
```

3. **Configure environment:**
```bash
export SESSION_SECRET="your-secret-key-here"
export FLASK_ENV=production
```

4. **Run with Gunicorn:**
```bash
gunicorn --workers 4 --bind 0.0.0.0:8000 main:app
```

5. **Set up Nginx reverse proxy** (optional but recommended)

6. **Use systemd or supervisor** for process management

## License

[License information to be added]

## Contact

For questions, suggestions, or support, please open an issue on GitHub.

## Acknowledgments

This directory catalogs MCP servers from the broader Model Context Protocol ecosystem. Special thanks to all the developers creating and maintaining these servers.

---

**Happy discovering!** Find the perfect MCP server for your AI automation needs.
