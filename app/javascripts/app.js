var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
  app.Product.load('/json/foods.json');
  app.state = new app.State();
  app.state.set('welcome');
});
