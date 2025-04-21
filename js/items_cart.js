document.addEventListener("DOMContentLoaded", updateCart);
function updateCart() {
  const cartItems = document.getElementById("cart_items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
var total_price=0
var total_count =0
  cartItems.innerHTML = ""; // Clear before adding
  cart.forEach((item, index) => {
   let total_price_item = (item.price)*(item.quantity)
total_price += total_price_item
total_count += item.quantity
    cartItems.innerHTML += `
      <div class="product">
        <div class="img_product">
          <a><img src="${item.image}" alt="${item.name}"></a>
        </div>
        <p class="name_product" style="font-weight: bold;">
          <a href="#">${item.category}</a>
        </p>
        <p class="name_product">
          <a href="#">${item.name}</a>
        </p>
        <div class="price"><p><span>${total_price_item}</span><span> $</span></p></div>
        <div class="icons">
          <span class="btn_add"  data-index="${index}"><i class="fa-solid fa-plus"></i></span>
          <span class="qantatity">${item.quantity}</span>
          <span class="btn_min" data-index="${index}"><i class="fa-solid fa-minus"></i></span>
          <span class="btn_remove" data-index="${index}"><i class="fa-solid fa-trash"></i></span>
        </div>
      </div>
    `;
  });
  const totalPrice = document.querySelector(".price_cart_total")
  const totalCount = document.querySelector(".count_item_header")
  totalPrice.innerHTML=`$ ${total_price}`
  totalCount.innerHTML=`${total_count}`
  localStorage.setItem("totalCount",total_count)
  const minButtons = document.querySelectorAll(".btn_min");
  const addButtons = document.querySelectorAll(".btn_add");
  const removeButtons = document.querySelectorAll(".btn_remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemIndex = button.getAttribute("data-index");
      removeFromCart(itemIndex);
    });
  });
  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemIndex = button.getAttribute("data-index");
      addCount(itemIndex);
    });
  });
  minButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemIndex = button.getAttribute("data-index");
      minCount(itemIndex);
    });
  });
}
function addCount(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity +=1;
localStorage.setItem('cart',JSON.stringify(cart))
  updateCart();
}
function minCount(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart[index].quantity>1){
    cart[index].quantity -=1;
    localStorage.setItem('cart',JSON.stringify(cart))
      updateCart();
  }
  
}
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removedProduct = cart.splice(index, 1)[0]; // Remove the product

  // Update cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Remove from buttonStates 
  let buttonStates = JSON.parse(localStorage.getItem("buttonStates")) || [];
  buttonStates = buttonStates.filter(id => id != removedProduct.id);
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));
  updateCart();
}
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
