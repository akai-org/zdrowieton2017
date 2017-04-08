/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Fridge = class {
  constructor() {
    this.products = [];
  }

  insertProduct(productName) {
    console.log('inserting');
    this.products.push(productName);
  }

  eatProduct(productName) {
    app.game.actual_kcal += app.products[productName].kcal;
    app.game.actual_protein += app.products[productName].protein;
    app.game.actual_fat += app.products[productName].fat;
    app.game.actual_carbohydrates += app.products[productName].carbohydrates;

    app.bars[0].kcal = app.game.actual_kcal;
    app.bars[0].protein = app.game.actual_protein;
    app.bars[0].fat = app.game.actual_fat;
    app.bars[0].carbohydrates = app.game.actual_carbohydrates;

    app.bars[0].refresh();
  }

  draw(container) {
    let well = container.getElementsByClassName("fridge--content--wrapper")[0];
    well.innerHTML = '';
    let fridge = this;
    for (let i=0; i<this.products.length; i++) {
      let productName = this.products[i];
      let product = app.products[productName];
      let div = document.createElement("div");
      div.className = "fridge--content--item";
      product.draw(div);
      div.addEventListener("click", function() {
        fridge.eatProduct(productName);
      });
      well.appendChild(div);
    }
  }
};