var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
  app.Product.load('/json/foods.json');

  app.state = new app.State();
  //app.state.set('welcome');

  setTimeout(function() {
    let shop = new app.Shop(10);
    shop.loadRandomProducts(
      Object.keys(app.products).filter(name => !(name.startsWith('cooked-') || name.startsWith('fried-'))),
      10
    );
    shop.draw(document.getElementById("shop"));
  }, 500);
});
