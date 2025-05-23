// Main data object to store all server information
let allServers = [];
let filteredServers = [];
let activeTab = 'all';
let searchTerm = '';
let categoryFilter = '';

// Function to initialize the page
async function initPage() {
    try {
        // Fetch server data from our JSON file
        const response = await fetch('/static/data/servers.json');
        allServers = await response.json();
        filteredServers = [...allServers];
        
        // Populate category filter dropdown
        populateCategoryFilter();
        
        // Update server count
        updateServerCount();
        
        // Render all servers initially
        renderServers(filteredServers);
        
        // Set up event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing page:', error);
        document.getElementById('serversGrid').innerHTML = `
            <div class="no-results">
                <h3>Error Loading Servers</h3>
                <p>There was a problem loading the server data. Please try again later.</p>
            </div>
        `;
    }
}

// Function to populate the category filter dropdown
function populateCategoryFilter() {
    const categorySelect = document.getElementById('categoryFilter');
    const categories = [...new Set(allServers.map(server => server.category))].sort();
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Function to update the server count display
function updateServerCount() {
    const serverCountElement = document.getElementById('serverCount');
    serverCountElement.textContent = `${filteredServers.length} ${filteredServers.length === 1 ? 'Server' : 'Servers'}`;
    
    const resultsInfoElement = document.getElementById('resultsInfo');
    resultsInfoElement.textContent = `Showing ${filteredServers.length} of ${allServers.length} servers`;
}

// Function to render the servers grid
function renderServers(servers) {
    const serversGrid = document.getElementById('serversGrid');
    
    if (servers.length === 0) {
        serversGrid.innerHTML = `
            <div class="no-results">
                <h3>No Matching Servers Found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    servers.forEach(server => {
        // Determine category class for styling
        const categoryClass = getCategoryClass(server.category);
        
        html += `
            <div class="server-card" onclick="window.open('${server.url}', '_blank')">
                <div class="server-header">
                    <div class="server-info">
                        <div class="server-name">${server.name}</div>
                        <div class="server-category ${categoryClass}">${server.category}</div>
                    </div>
                </div>
                <div class="server-description">${server.description}</div>
                <div class="server-footer">
                    <a href="${server.url}" class="server-url" target="_blank">
                        <svg class="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    });
    
    serversGrid.innerHTML = html;
}

// Function to map category to CSS class
function getCategoryClass(category) {
    const categoryMap = {
        'Database': 'category-database',
        'Search Engine': 'category-search',
        'Web Scraping & Content': 'category-web',
        'File Management': 'category-workflow',
        'Version Control': 'category-development',
        'Project Management': 'category-project',
        'Knowledge Base': 'category-knowledge',
        'Cloud Storage': 'category-cloud',
        'Maps & Location': 'category-web',
        'Language & Translation': 'category-knowledge',
        'API Integration': 'category-development',
        'Development Tools': 'category-development',
        'Messaging': 'category-workflow',
        'Productivity': 'category-workflow'
    };
    
    return categoryMap[category] || '';
}

// Function to filter servers based on active tab, search term, and category filter
function filterServers() {
    filteredServers = allServers.filter(server => {
        // Filter by tab
        if (activeTab !== 'all') {
            const tabCategoryMap = {
                'featured': ['Search Engine', 'Database', 'Version Control', 'Cloud Storage'],
                'database': ['Database'],
                'search': ['Search Engine'],
                'project': ['Project Management'],
                'development': ['Development Tools', 'Version Control', 'API Integration'],
                'cloud': ['Cloud Storage']
            };
            
            if (tabCategoryMap[activeTab] && !tabCategoryMap[activeTab].includes(server.category)) {
                return false;
            }
        }
        
        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const nameMatch = server.name.toLowerCase().includes(searchLower);
            const descMatch = server.description.toLowerCase().includes(searchLower);
            if (!nameMatch && !descMatch) {
                return false;
            }
        }
        
        // Filter by category
        if (categoryFilter && server.category !== categoryFilter) {
            return false;
        }
        
        return true;
    });
    
    updateServerCount();
    renderServers(filteredServers);
}

// Function to set up event listeners
function setupEventListeners() {
    // Tab filters
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update active tab
            activeTab = tab.getAttribute('data-tab');
            
            // Apply filters
            filterServers();
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.trim();
        filterServers();
    });
    
    // Category filter
    const categoryFilterElement = document.getElementById('categoryFilter');
    categoryFilterElement.addEventListener('change', () => {
        categoryFilter = categoryFilterElement.value;
        filterServers();
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
