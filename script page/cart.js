'use strict';

let cartCountE1 = document.querySelector('.cart-count');
let cartItemsContainer = document.querySelector('.cart-items');
let cartTotalE1 = document.querySelector('.cart-total p');
let cartData = JSON.parse(localStorage.getItem('cartData')) || []; 

// Initialize cart count
let cartCount = cartData.length;
cartCountElement.innerText = cartCount;

// Function to render the cart summary
function renderCartSummary() {
  cartItemsContainer.innerHTML = ''; // Clear existing items
  let subtotal = 0;

  cartData.forEach((item, index) => {
    fetch(`https://fakestoreapi.com/products/${item.productId}`)
      .then((response) => response.json())
      .then((product) => {
        let totalItemPrice = product.price * item.quantity;
        subtotal += totalItemPrice;

       let cartItemHTML = `
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <img src="${product.image}" alt="${product.title}" style="width: 50px; height: auto; object-fit: contain;" class="me-3">
            <div>
              <p style=fon">${product.title}</p>
              <p>Price: $${product.price.toFixed(2)} x ${item.quantity} = $${totalItemPrice.toFixed(2)}</p>
            </div>
            <div>
            <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateCart(${index}, this.value)">
            </div>
            <b utton class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;

        
        cartItemsContainer.innerHTML += cartItemHTML;

        
        if (index === cartData.length - 1) {
          cartTotalE1.innerHTML = `Total: $${subtotal.toFixed(2)}`;
        }
      });
  });

  if (cartData.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalE1.innerHTML = 'Total: $0.00';
  }
}
//function to add to cart
function updateCart(index, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(index); 
  } else {
    cartData[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cartData', JSON.stringify(cartData)); 
    renderCartSummary(); 
  }
}
function removeFromCart(index) {
  cartData.splice(index, 1); 
  localStorage.setItem('cartData', JSON.stringify(cartData)); 
  cartCount -= 1;
  cartCountElement.innerText = cartCount; 
  renderCartSummary(); 
}


function proceedToCheckout() {
  window.location.href = '../html page/checkout.html'; 
}


renderCartSummary();
document.querySelector('.cart-icon').addEventListener('click', function() {
    window.location.href = '../html page/cart.html'; 
});
