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
    
    const billingName = document.getElementById('bill-name').value;
    const billingEmail = document.getElementById('bill-mail').value;
    const billingAddress = document.getElementById('billing-add').value;
    const billingPhone = document.getElementById('bill-on').value;
    const billingCard = document.getElementById('bill-card').value;
    
    const shippingName = document.getElementById('ship-name').value;
    const shippingPhone = document.getElementById('ship-phone').value;
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
