'use strict';

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }

  getCost() {
    return this.price * this.quantity;
  }

  getMarkup() {
    return `<p>${this.name} ${this.quantity} шт. $${this.price
      .toFixed(2)} $${this.getCost().toFixed(2)}</p>`;
  }
}

function addProduct(name, price, basket) {
    for (const el of basket) {
    if (el.name === name) {
      el.quantity++;
      return;
    }   
  }
  basket.push(new Product(name, price));
}

function drawBasket(basket) {
  let html = '<p><b>Название товара Количество Цена за шт. Итого</b></p>';
  basket.forEach(el => {
    html += el.getMarkup();
  });
  const totalCost = basket.reduce((acc, item) => acc + item.getCost(), 0);
  const totalQuantity = basket.reduce((acc, item) => acc + item.quantity, 0);
  html += `Товаров в корзине на сумму: $${totalCost
    .toFixed(2)} штук: ${totalQuantity}`;
  countEl.textContent = totalQuantity;
  popupBasket.innerHTML = html;  
}

const featuredItems = document.querySelector('.featuredItems');
const countEl = document.querySelector('.cartIconWrap > span');
const cartIcon = document.querySelector('.cartIcon');
const popup = document.getElementById('popup');
const popupBasket = document.getElementById('popup-basket');
const btnClear = document.getElementById('popup-btn');

let basket = [];
drawBasket(basket);

featuredItems.addEventListener('click', event => {  
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const name = featuredItem.querySelector('.featuredName').textContent.trim();
  let price = featuredItem.querySelector('.featuredPrice').textContent.trim();
  price = +price.replace('$', '');
  addProduct(name, price, basket);
  drawBasket(basket);
});

cartIcon.addEventListener('click', () => {
  popup.classList.toggle('hidden');
});

btnClear.addEventListener('click', () => {
  basket = [];
  drawBasket(basket);
});