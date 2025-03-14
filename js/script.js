document.addEventListener('DOMContentLoaded', function() {
    // Fetch the local JSON data
    fetch('../shoes.json')  // Make sure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            loadFeaturedProducts(data.featured);
            loadHiddenProducts(data.hidden);
            loadCategories(data.categories);
        })
        .catch(error => {
            console.error('Error fetching the products data:', error);
            // You might want to add some fallback data here in case the fetch fails
        });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Wishlist Button Toggle
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.className === 'button-clicked') {
                btn.className = "wishlist-btn"
            } else {
                btn.className = "button-clicked"

            }
        });
    });
});

// Function to load featured products
function loadFeaturedProducts(products) {
    const featuredContainer = document.querySelector('.featured .products:not(.hidden)');
    
    // Clear any existing products
    featuredContainer.innerHTML = '';
    
    // Add each product
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Create the HTML for the product
        let priceBeforeHtml = product.priceBefore ? 
            `<div class="product-price-before">${product.priceBefore.toLocaleString()} ${product.currency}</div>` : '';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                ${priceBeforeHtml}
                <div class="product-price">${product.price.toLocaleString()} ${product.currency}</div>
                <div class="product-actions">
                    <a href="#" class="btn">Order Now</a>
                    <button class="wishlist-btn"><i class='bx bxs-heart'></i></button>
                </div>
            </div>
        `;
        
        featuredContainer.appendChild(productCard);
    });
}

// Function to load hidden products
function loadHiddenProducts(products) {
    const hiddenContainer = document.querySelector('.featured .products.hidden');
    
    // Clear any existing products
    hiddenContainer.innerHTML = '';
    
    // Add each product
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}">
            </div>
        `;
        
        hiddenContainer.appendChild(productCard);
    });
}

// Function to load categories
function loadCategories(categories) {
    const categoriesContainer = document.querySelector('.category-cards');
    
    // Clear any existing categories
    categoriesContainer.innerHTML = '';
    
    // Add each category
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name} Sneakers" class="category-image">
            <div class="category-overlay">
                <h3 class="category-name">${category.name}</h3>
            </div>
        `;
        
        categoriesContainer.appendChild(categoryCard);
    });
}