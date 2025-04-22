document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  const productList = document.getElementById("product-list");
  const selectBox = document.getElementById("categoty");
  const buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || [];
  let allProducts = [];
  // Fetch the products data
  fetch("js/products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network Error: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      allProducts = products;
      loadProducts(products);

      // Handle category filter change
      selectBox.addEventListener("change", (e) => {
        const selectedCategory = e.target.value;
        const filteredProducts = selectedCategory === "All Categoty"
          ? allProducts
          : allProducts.filter(product => product.category === selectedCategory);
        loadProducts(filteredProducts);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });

  // Function to load products into the page
  function loadProducts(products) {
    productList.innerHTML = products.map(product => `
      <div class="product">
        <div class="img_product">
          <a><img src="${product.image}" alt="${product.name}"></a>
        </div>
        <p class="name_product"><a href="#">${product.category}</a></p>
        <p class="name_product"><a href="#">${product.name}</a></p>
        <div class="price">
          <p><span>${product.price}$</span></p>
        </div>
        <div class="icons">
          <span class="btn_add_cart ${buttonStates.includes(product.id.toString()) ? 'active' : ''}" data-id="${product.id}">
            ${buttonStates.includes(product.id.toString())
        ? '<i class="fa-solid fa-check"></i> Item in cart'
        : '<i class="fa-solid fa-basket-shopping"></i> Add To Cart'}
          </span>
        </div>
      </div>
    `).join("");

    attachCartEventListeners(products);
  }

  // style selected button
  function attachCartEventListeners(products) {
    const addToButtonCart = document.querySelectorAll(".btn_add_cart");
    addToButtonCart.forEach(button => {
      const productId = button.getAttribute('data-id');
      const selectedProduct = products.find(product => product.id == productId);
      if (!selectedProduct) return;
      button.addEventListener("click", () => {
        addToCart(selectedProduct);
        updateCartCount();
        button.classList.add("active");
        button.innerHTML = `<i class="fa-solid fa-check"></i> Item in cart`;
        if (!buttonStates.includes(productId)) {
          buttonStates.push(productId);
          localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
        }
      });
    });
  }

  // Function to add item to the cart
  function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  // Update navigation active link based on the current page
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("#nav_links a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
});
// Scroll to top button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
