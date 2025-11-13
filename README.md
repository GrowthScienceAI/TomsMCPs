# TomsMCPs - MCP Server Directory

A comprehensive, searchable web directory of Model Context Protocol (MCP) servers, designed to help developers discover and integrate MCP servers for AI automation and enhancement.

## Overview

TomsMCPs is a user-friendly web application that catalogs 300+ MCP servers across diverse categories, providing an intuitive interface for browsing, searching, and filtering servers based on your specific needs. Whether you're looking for database integrations, web scraping tools, cloud storage solutions, or AI thinking tools, this directory makes discovery straightforward and efficient.

## Features

- **Comprehensive Catalog**: 300+ MCP servers organized by category
- **Advanced Search**: Full-text search across server names and descriptions
- **Multi-Faceted Filtering**:
  - Tab-based category navigation
  - Dropdown filters for precise results
  - Real-time filtering without page reloads
- **Categories Include**:
  - Database (PostgreSQL, SQLite)
  - Search Engines (Brave Search)
  - Web Tools (Fetch, Puppeteer, Web Scraping)
  - Cloud Storage (Google Drive, Dropbox)
  - Version Control (Git, GitLab)
  - Project Management (Asana, Monday.com)
  - CRM (Pipedrive, HubSpot)
  - Customer Support (Zendesk)
  - Development Tools
  - Maps & Location Services
  - Team Communication (Slack)
  - AI & Thinking Tools
  - Finance & Payments
- **Direct GitHub Links**: Each server links directly to its official repository
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible UI**: Clean, modern interface following web accessibility standards

## Technologies

### Backend
- **Python 3.11+**: Runtime environment
- **Flask 3.1.1+**: Lightweight web framework
- **Gunicorn**: WSGI HTTP server for production deployment
- **Flask-SQLAlchemy**: Database support (configured for future scaling)

### Frontend
- **Vanilla HTML/CSS/JavaScript**: No complex frameworks, optimized for performance
- **Responsive CSS**: Flexbox-based layout system
- **Fetch API**: Async data loading and manipulation
- **Jinja2**: Server-side templating

### Deployment
- **Replit**: Cloud hosting platform
- **Python Environment**: Nix package management

## Installation

### Prerequisites
- Python 3.11 or higher
- pip (Python package manager)

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/GrowthScienceAI/TomsMCPs.git
cd TomsMCPs
```

2. Install dependencies:
```bash
pip install -r pyproject.toml
# Or if you prefer using pyproject.toml directly:
pip install -e .
```

3. Run the application:
```bash
# Development mode
python app.py

# Production mode (recommended)
gunicorn --bind 0.0.0.0:5000 main:app
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
TomsMCPs/
├── app.py                     # Flask application entry point
├── main.py                    # Application runner
├── pyproject.toml            # Python project dependencies
├── .replit                   # Replit deployment configuration
├── replit.md                 # Architecture & design documentation
├── static/                   # Static assets
│   ├── css/
│   │   └── styles.css        # Responsive styling
│   ├── js/
│   │   └── script.js         # Client-side filtering & interactivity
│   ├── data/
│   │   └── servers.json      # MCP server database (300+ servers)
│   └── images/
│       └── logo.png          # Application logo
├── templates/
│   └── index.html            # Main application template
└── attached_assets/          # Reference files and backups
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

The application is configured for easy deployment on Replit:
- Push to the main branch
- Replit automatically detects the `.replit` configuration
- The app deploys with Gunicorn in production mode
- Access via your Replit URL

For other platforms, use the standard Flask deployment process with Gunicorn.

## License

[License information to be added]

## Contact

For questions, suggestions, or support, please open an issue on GitHub.

## Acknowledgments

This directory catalogs MCP servers from the broader Model Context Protocol ecosystem. Special thanks to all the developers creating and maintaining these servers.

---

**Happy discovering!** Find the perfect MCP server for your AI automation needs.
