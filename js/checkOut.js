
document.addEventListener("DOMContentLoaded", () => {
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
document.addEventListener("DOMContentLoaded", updateCart);
function submitOrder() {
    event.preventDefault(); // stops default form submit behavior (just in case)

    console.log("submit")
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  const name = document.querySelector('input[placeholder="Enter Your Name"]').value;
  // Calculate total items and total price
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  // Update summary values
  document.getElementById("summary_count").textContent = totalItems;
  document.getElementById("summary_total").textContent = totalPrice.toFixed(2);
  document.getElementById("client_name").textContent = name;

  // Show summary popup
  document.getElementById("order_summary").classList.remove("hidden");

  localStorage.removeItem("cart");
  localStorage.removeItem("buttonStates");
  localStorage.removeItem("totalCount")
}

function closeSummary() {

  document.getElementById("order_summary").classList.add("hidden");
  window.location.href = "index.html"; 
}
totalCount = document.querySelector(".count_item_header")
totalCount.innerHTML=`${localStorage.getItem("totalCount")}`

