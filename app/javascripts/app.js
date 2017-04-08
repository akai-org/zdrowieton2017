var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
  if(app.started) return;
  app.started = true;
  app.Product.load('/json/foods.json');

  app.state = new app.State();
  //app.state.set('welcome');

  setTimeout(function() {
    let shop = new app.Shop(10);
    shop.loadRandomProducts(Object.keys(app.products), 20);
    shop.draw(document.getElementById("shop"));
  }, 2000);

  app.Bar.init();
});
