
function updateCartCount() {
    const totalCount = document.querySelector(".count_item_header");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach(item => count += item.quantity);
    totalCount.textContent = count;
    localStorage.setItem("totalCount", count);
  }
  
  // Listen for changes in localStorage from other tabs/pages
  window.addEventListener("storage", (event) => {
    if (event.key === "cart") {
      updateCartCount();
    }
  });
  
  // Update count on load
  document.addEventListener("DOMContentLoaded", updateCartCount);
  