let cartCountE1 = document.querySelector('.cart-count');
let cartView = document.querySelector('.cart-view');
let cartData = JSON.parse(localStorage.getItem('cartData')) || []


let cartCount = cartData.length;
cartCountE1.innerText = cartCount;

function showProduct() {
  let productId = localStorage.getItem('productId');
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      
      let proView = `
        <div class="card mb-3" style="max-width: 33rem;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${data.image}" class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">$${data.price}</p>
                <p class="card-text"><small class="text-body-secondary">${data.description}</small></p>
                <a class="btn btn-primary btn-product" onClick="addToCart(${data.id}, 1)">🛒 Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      `;
      cartView.innerHTML = proView;


      fetchRelatedProducts(data.category, data.id);
    });
}

function fetchRelatedProducts(category, currentProductId) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => response.json())
    .then((products) => {
      let relatedProductsHTML = '<h3>Related Products</h3><div class="row">';

      products.forEach((product) => {

        if (product.id !== currentProductId) {
          relatedProductsHTML += `
            <div class="col-md-4 each-item mb-3">
              <div class="each card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">$${product.price}</p>
                  <a class="btn btn-primary btn-product" onclick="viewRelatedProduct(${product.id})">View Product</a>
                </div>
              </div>
            </div>
          `;
        }
      });

      relatedProductsHTML += '</div>';
      cartView.innerHTML += relatedProductsHTML; 
    });
}


function viewRelatedProduct(productId) {
  localStorage.setItem('productId', productId); 
  showProduct(); 
}

function addToCart(productId, quantity) {

  let existingProduct = cartData.find(item => item.productId === productId);
  
  if (existingProduct) {
    alert('This product is already in your cart.');
  } else {
    
    cartData.push({ productId, quantity });

    
    localStorage.setItem('cartData', JSON.stringify(cartData));


    cartCount += 1;
    cartCountE1.innerText = cartCount;
  }
}

showProduct();

document.querySelector('.cart-icon').addEventListener('click', function() {
  window.location.href = 'cart.html'; 
});
document.addEventListener('DOMContentLoaded', function () {
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    let orderSummaryContainer = document.querySelector('.order-summary');
    let totalAmount = 0;

    if (cartData.length === 0) {
        orderSummaryContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let orderSummaryHTML = '<ul class="list-group">';

        
        Promise.all(cartData.map(item => {
            return fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(response => response.json())
                .then(product => {
                    let itemTotal = product.price * item.quantity;
                    totalAmount += itemTotal;

              
                    return `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                         <img src="${product.image}" alt="${product.title}" style="width: 25px; height: auto; object-fit: contain;" class="me-1">
                        <span>${product.title} (x${item.quantity})</span>
                            <span>$${itemTotal.toFixed(2)}</span>
                        </li>
                    `;
                });
        }))
        .then(itemsHTML => {
          
            orderSummaryHTML += itemsHTML.join('');
            orderSummaryHTML += '</ul>';

        
            orderSummaryHTML += `
                <div class="mt-3">
                    <h5>Total Amount: $${totalAmount.toFixed(2)}</h5>
                </div>
            `;

          
            orderSummaryContainer.innerHTML = orderSummaryHTML;
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            orderSummaryContainer.innerHTML = '<p>There was an error loading your cart.</p>';
        });
    }
});

document.getElementById('billing-form').addEventListener('submit', function (e) {
    e.preventDefault();
    saveOrderSummary();
});

document.getElementById('shipping-form').addEventListener('submit', function (e) {
    e.preventDefault();
    saveOrderSummary();
});

document.querySelector('button[type="submit"]').addEventListener('click', function (e) {
    e.preventDefault();
    saveOrderSummary();
    console.log("its clicked")
    window.location.href = 'order-summary.html';
});

function saveOrderSummary() {
    // Gather all the form data
    const billingName = document.getElementById('bill-name').value;
    const billingEmail = document.getElementById('bill-mail').value;
    const billingAddress = document.getElementById('bill-add').value;
    const billingPhone = document.getElementById('bill-phone').value;
    const billingCard = document.getElementById('bill-card').value;
  
    const shippingName = document.getElementById('ship-name').value;
    const shippingPhone = document.getElementById('ship-on').value;
    const shippingAddress = document.getElementById('ship-address').value;
    
    const paymentMethod = document.getElementById('payment-method').value;

    
    localStorage.setItem('orderSummary', JSON.stringify({
        billingName,
        billingEmail,
        billingAddress,
        billingPhone,
        billingCard,
        shippingName,
        shippingPhone,
        shippingAddress,
        paymentMethod
    }));
    
  
    
}

document.querySelector('.cart-icon').addEventListener('click', function() {
    window.location.href = 'cart.html';
});
