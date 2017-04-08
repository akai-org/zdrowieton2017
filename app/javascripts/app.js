var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
  if(app.started) return;
  app.started = true;
  app.Product.load('/json/foods.json');

  app.fridge = new app.Fridge();

  app.state = new app.State();
  //app.state.set('welcome');

  setTimeout(function() {
    app.shop = new app.Shop(10);
  }, 500);


  app.Bar.init();

  app.game = new app.Game();
  app.game.random();

  app.bars[0].refresh();
  app.bars[1].refresh();


});
