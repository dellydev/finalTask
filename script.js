'use strict';
let     imgCard = document.querySelector('.card-img');
let  trolleyCountE1 = document.querySelector('.cart-count');
let   productView = document.querySelector('.data-view');
let    cartIcon = document.querySelector('.cart-icon');
let   categoryView = document.querySelector('.category-list');
let    cardText = document.querySelector('.card-text'); 
let    titleCard = document.querySelector('.card-title');
let    productBtn = document.querySelector('.btn-product');

let newArray = [];

function getPost(){
  fetch('https://fakestoreapi.com/products')
  .then((response)=>response.json())
  .then((data)=>{
    data.forEach((e, index) => {
    let product = `
       <div class="col each-item">
  <div class="card each">
    <img class="card-img" src="${e.image}" class="card-img-top" alt="Product 1">
    <div class="card-body">
      <h5 class="card-title">${e.title}</h5>
      <p class="card-text">$${e.price}</p>
      
    </div>
  </div>
</div>
     `;
     productView.innerHTML+= product;
     itemView()
  
  
  });
})


}

getPost()

function itemView() {
  let disProduct = document.querySelectorAll('.unit-item')
  disProduct.forEach((e, index) => {
  product.addEventListener('click', ()=>{
   localStorage.setItem("productId", index+1)
   window.location.href="../html page/product.html"
  })


  });

  
}
function cartItem(){
  fetch('https://fakestoreapi.com/products/category/')
  .then((res) => res.json())
  .then((e)=>{
    e.forEach((item, index) => {
     console.log(item);
    let Item = `
       <div class="col each-item">
  <div class="card each">
    <img class="card-img" src="${item.image}" class="card-img-top" alt="Product 1">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">$${item.price}</p>
      
    </div>
  </div>
</div>
     `;
     categoryView.innerHTML=Item;
  
    });
  })
  
}
cartItem()
document.querySelector('.cart-icon').addEventListener('click', function() {
  window.location.href = 'cart.html'; // Replace with the actual URL of your cart summary page
});