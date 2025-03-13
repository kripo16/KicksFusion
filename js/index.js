document.addEventListener('DOMContentLoaded', function() {
    // Fetch the local JSON data
    fetch('../data/index.json')  // Make sure this path is correct
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
            `<div class="product-price-before">${product.priceBefore.toLocaleString()} DZD</div>` :'';

        let promotionHtml = product.priceBefore ? 
            `<div class="promotion">Promotion</div>` :`<div class="promotion" style="opacity:0;">Promotion</div>`;
        
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
                
            ${promotionHtml}

            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-container">
                    ${priceBeforeHtml}

                    <div class="product-price">${product.price.toLocaleString()} DZD</div>
                    <div class="product-actions">
                        <a href="#" class="btn">Order Now</a>
                        <button class="wishlist-btn"><i class='bx bxs-heart'></i></button>
                    </div>
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

    const cards = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.2 } // Adjust how much of the card needs to be visible before animation triggers
    );

    cards.forEach((card) => observer.observe(card));

    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');

    // Add click event to open modal buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            // First display the modal (but still invisible)
            modal.style.display = 'flex';
            
            // Allow the browser to process the display change
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(e);
            }
        });
    });

    // Close modal function
    function closeModal(e) {
        const modal = e.target.closest('.modal');
        modal.classList.remove('show');
        
        // Wait for transition to complete before hiding the modal
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
    }



    
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });
}