let currentPage = 1;
const itemsPerPage = 36; // 4 columns x 9 rows
let products = [];

// Fetch data from shoes.json
fetch("../shoes.json")
  .then(response => response.json())
  .then(data => {
    products = data.shop;
    renderProducts();
  })
  .catch(error => console.error("Error loading shoes.json:", error));

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous items

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = products.slice(start, end);

  paginatedItems.forEach(item => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.dataset.name = item.name || "Unknown";
    productCard.dataset.price = item.price || 0;
    
    productCard.innerHTML = `
      <img src="${item.image}" alt="${item.name || item.alt}">
      <h2>${item.brand ? item.brand + " - " : ""}${item.name || item.alt}</h2>
      ${item.price ? `<p><span class="old-price">${item.priceBefore ? item.priceBefore + " DZD" : ""}</span> ${item.price} DZD</p>` : ""}
    `;

    productList.appendChild(productCard);
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  document.getElementById("pagination").innerHTML = `
    <button onclick="changePage(-1)" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button onclick="changePage(1)" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
  `;
}

function changePage(direction) {
  currentPage += direction;
  renderProducts();
}
