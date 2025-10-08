# MCP Servers Directory

## Overview

This is a web application that serves as a directory for Model Context Protocol (MCP) servers. It provides a searchable, filterable catalog of MCP servers across various categories including search engines, file management, version control, cloud storage, and more. The application displays server information with descriptions, URLs, and categorization to help users discover and integrate MCP servers for AI automation and integration purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Problem**: Need to create an interactive, searchable directory interface for browsing MCP servers.

**Solution**: Vanilla JavaScript with server-side templating using Flask/Jinja2.

The frontend is built with:
- Pure HTML/CSS/JavaScript (no frontend framework)
- Server-side rendering via Jinja2 templates for initial page load
- Client-side JavaScript for dynamic filtering, searching, and tabbed navigation
- Responsive CSS using flexbox for layout management

**Rationale**: This simple approach avoids framework complexity for a straightforward directory application. The server-side rendering improves initial load performance, while client-side JavaScript provides interactivity without full page reloads.

### Backend Architecture

**Problem**: Need a lightweight web server to serve the directory and static assets.

**Solution**: Flask-based Python web application with minimal routing.

The backend consists of:
- Flask web framework handling HTTP requests
- Single main route (`/`) that loads server data from JSON and renders the template
- Static file serving for CSS, JavaScript, and data files
- Session secret configuration via environment variables

**Rationale**: Flask provides a minimal, easy-to-understand framework suitable for this simple directory application. The architecture is intentionally lightweight since the application is primarily read-only with no complex business logic.

### Data Storage

**Problem**: Need to store and retrieve MCP server information efficiently.

**Solution**: Static JSON file storage (`static/data/servers.json`).

The data architecture uses:
- File-based JSON storage for server listings
- In-memory data loading on each request
- Client-side caching of server data after initial fetch
- No database layer

**Rationale**: A static JSON file is sufficient for a directory application with infrequent updates. This approach simplifies deployment, eliminates database dependencies, and makes the data easily editable. If the catalog grows significantly or requires frequent updates, migrating to a database would be the next step.

**Data Schema**: Each server entry contains:
- `name`: Server display name
- `url`: GitHub or source repository URL
- `description`: Brief description of functionality
- `category`: Classification (e.g., "Search Engine", "Cloud Storage")

### Frontend-Backend Interaction

**Problem**: Need to make server data available to the client-side filtering system.

**Solution**: Hybrid approach with initial server-side rendering and client-side data fetching.

The interaction pattern:
- Server passes initial data to template during rendering
- Client-side JavaScript fetches the same JSON file for dynamic operations
- All filtering, searching, and categorization happens client-side
- No API endpoints for data manipulation (read-only application)

**Rationale**: This approach provides fast initial page load via SSR while enabling rich client-side interactivity. Since the data is read-only and relatively small, fetching it twice (once server-side, once client-side) has negligible performance impact.

### UI/UX Design Pattern

**Problem**: Users need to quickly find relevant MCP servers from a growing list.

**Solution**: Multi-faceted filtering system with search, tabs, and category dropdowns.

The interface provides:
- Text search across all server fields
- Tab-based filtering for common categories (Featured, Database, Search, etc.)
- Dropdown category filter for precise filtering
- Server count display for feedback
- Card-based grid layout for server presentation

**Rationale**: Multiple filtering options cater to different user behaviors (browsing vs. searching). The combination of tabs (quick access to popular categories) and dropdowns (comprehensive filtering) provides both convenience and flexibility.

## External Dependencies

### Core Framework
- **Flask**: Python web microframework for routing and templating
  - Used for: HTTP server, request handling, and Jinja2 template rendering
  - Configuration: Development server mode enabled, debug mode active

### Frontend Libraries
- **None**: The application uses vanilla JavaScript and CSS
  - Rationale: Simple UI requirements don't justify framework overhead

### Data Sources
- **Static JSON file**: `static/data/servers.json`
  - Contains the master list of MCP servers
  - Manually curated data (no external API integration currently)

### External Links
- **GitHub**: Server URLs point to GitHub repositories
  - The application links to external MCP server implementations
  - No API integration with GitHub (links only)

### Development Environment
- **Python 3.x**: Required runtime
- **Environment Variables**:
  - `SESSION_SECRET`: Flask session encryption key (defaults to 'dev_secret_key')

### Potential Future Integrations
The architecture could support:
- GitHub API integration for automatic server discovery
- Database (PostgreSQL/SQLite) for dynamic server management
- Admin interface for CRUD operations on server listings
- User authentication for submissions/ratings
- Analytics integration for usage tracking