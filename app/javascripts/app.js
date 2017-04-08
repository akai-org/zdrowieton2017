var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
  app.Product.load('/json/foods.json');

  setTimeout(function() {
    let shop = new app.Shop(10);
    shop.loadRandomProducts(Object.keys(app.products), 20);
    shop.draw(document.querySelector(".shop.container"));
  }, 2000);
});
