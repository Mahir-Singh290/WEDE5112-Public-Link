/*/* 
    References & Technical Documentation Sources:
    - MDN Web Docs. (2026). Array.prototype.filter(). Mozilla Developer Network. Retrieved 3rd November, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    - MDN Web Docs. (2026). Array.prototype.sort(). Mozilla Developer Network. Retrieved 3rd November, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    - W3Schools. (2026). JavaScript Array filter() Method. W3Schools Online Web Tutorials. Retrieved 3rd November, from https://www.w3schools.com/jsref/jsref_filter.asp
    - W3Schools. (2026). JavaScript String localeCompare() Method. W3Schools Online Web Tutorials. Retrieved 3rd November, from https://www.w3schools.com/jsref/jsref_localecompare.asp


    2. CSS LAYOUT, GRID & SHAPE STYLING:
       - MDN Web Docs. (2026). CSS Grid Layout. Mozilla Developer Network. 
         Retrieved 3rd November, from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
       - W3Schools. (2026). CSS border-radius Property. W3Schools Online Web Tutorials. 
         Retrieved 3rd November, from https://www.w3schools.com/cssref/css3_pr_border-radius.php

    3. LIGHTBOX MODAL & EVENT HANDLING (LIGHTBOX.JS):
       - MDN Web Docs. (2026). Introduction to events. Mozilla Developer Network. 
         Retrieved 3rd November, from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
       - MDN Web Docs. (2026). Event: stopPropagation() method. Mozilla Developer Network. 
         Retrieved 3rd November, from https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
       - W3Schools. (2026). How To Create a Lightbox / Modal. W3Schools Online Web Tutorials. 
         Retrieved 3rd November, from https://www.w3schools.com/howto/howto_js_lightbox.asp
*/



// Products data - Cape Union Mart Inventory with Images
const productsData = [
    {
        id: 1,
        name: "Rugged Hiking Boots",
        category: "footwear",
        price: 1899,
        image: "images/boots.jpg",
        description: "High-traction, waterproof leather boots designed for rough mountain terrain.",
        features: ["Waterproof membrane", "Vibram rubber sole", "Ankle support", "Breathable lining"]
    },
    {
        id: 2,
        name: "Adventure 65L Backpack",
        category: "gear",
        price: 2499,
        image: "images/Backpack.jpg",
        description: "Ergonomic multi-compartment hiking backpack with integrated rain cover.",
        features: ["65L Capacity", "Built-in rain cover", "Hydration compatible", "Adjustable harness"]
    },
    {
        id: 3,
        name: "4-Person Dome Tent",
        category: "gear",
        price: 3199,
        image: "images/Tent.jpg",
        description: "Wind-resistant, easy-pitch camping tent with waterproof flysheet.",
        features: ["Easy-pitch poles", "Waterproof flysheet", "Mesh ventilation", "Compact carry bag"]
    },
    {
        id: 4,
        name: "K-Way Waterproof Jacket",
        category: "apparel",
        price: 1599,
        image: "images/kwayjacket.avif",
        description: "Breathable, lightweight shell jacket engineered for extreme weather protection.",
        features: ["Fully seam-sealed", "Windproof", "Packable design", "Adjustable hood"]
    },
    {
        id: 5,
        name: "Outdoor GPS Watch",
        category: "gear",
        price: 4299,
        image: "images/GPS watch.jpg",
        description: "Advanced fitness tracker featuring altimeter, barometer, and route navigation.",
        features: ["GPS & GLONASS", "Heart rate monitor", "Altimeter & Barometer", "Long battery life"]
    },
    {
        id: 6,
        name: "Self-Inflating Air Mattress",
        category: "gear",
        price: 799,
        image: "images/airmattress.jpg",
        description: "Compact and comfortable camping mattress for insulated sleeping support.",
        features: ["Self-inflating valve", "Durable puncture-resistant fabric", "Compact roll-up", "Includes repair kit"]
    }
];

// Global variables
let allProducts = [];
let filteredProducts = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const loadingIndicator = document.getElementById('loading-indicator');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');

/* 
    References & Technical Documentation Sources (DOMContentLoaded & Timing):
    - MDN Web Docs. (2026). Document: DOMContentLoaded event. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
    - MDN Web Docs. (2026). Window: setTimeout() method. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
    - W3Schools. (2026). HTML DOM Document addEventListener() Method. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/jsref/met_document_addeventlistener.asp
    - W3Schools. (2026). Window setTimeout() Method. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/jsref/met_win_settimeout.asp
*/
// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        loadProducts();
    }, 500);

    if (searchInput) searchInput.addEventListener('input', filterAndDisplayProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndDisplayProducts);
    if (sortSelect) sortSelect.addEventListener('change', filterAndDisplayProducts);
});

/* 
    References & Technical Documentation Sources (Product Rendering & Filtering):
    - MDN Web Docs. (2026). Spread syntax (...). Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    - MDN Web Docs. (2026). Template literals (template strings). Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    - MDN Web Docs. (2026). Array.prototype.map(). Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    - MDN Web Docs. (2026). Element: innerHTML property. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
    - W3Schools. (2026). JavaScript Array.map(). W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/jsref/jsref_map.asp
    - W3Schools. (2026). JavaScript HTML DOM innerHTML. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/jsref/prop_html_innerhtml.asp
*/
function loadProducts() {
    allProducts = [...productsData];
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
    if (loadingIndicator) loadingIndicator.style.display = 'none';
}

function createProductCard(product) {
    return `
        <div class="card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-thumb">
            <h3>${product.name}</h3>
            <span style="font-size: 0.85rem; font-weight: bold; color: #16A34A; text-transform: uppercase;">${product.category}</span>
            <p style="margin-top: 0.5rem;">${product.description}</p>
            <div style="font-size: 1.25rem; font-weight: bold; color: #1E293B; margin: 0.5rem 0;">R${product.price.toLocaleString()}</div>
            <ul style="font-size: 0.9rem; margin-bottom: 1rem; color: #475569;">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button style="padding: 0.5rem 1rem; background-color: #16A34A; color: white; border: none; border-radius: 0.3rem; cursor: pointer; font-weight: bold;" onclick="handleProductClick(${product.id})">View Details</button>
        </div>
    `;
}

function displayProducts(products) {
    if (!productsContainer) return;
    if (products.length === 0) {
        productsContainer.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        if (noResults) noResults.style.display = 'none';
        productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
    }
}

function filterAndDisplayProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const sortMethod = sortSelect ? sortSelect.value : 'name-asc';

    filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.features.some(feature => feature.toLowerCase().includes(searchTerm));

        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    sortProducts(filteredProducts, sortMethod);
    displayProducts(filteredProducts);
}

function sortProducts(products, method) {
    switch (method) {
        case 'name-asc':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
    }
}

function handleProductClick(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        alert(`Selected Product: ${product.name}\nPrice: R${product.price.toLocaleString()}\n\nAdded to your viewing list!`);
    }
}