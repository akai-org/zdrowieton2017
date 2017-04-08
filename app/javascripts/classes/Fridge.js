/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Fridge = class {
  constructor() {
    this.products = [];
  }

  clear() {
    this.products = [];
  }

  insertProduct(productName) {
    console.log('inserting');
    this.products.push(productName);
  }

  eatProduct(productName) {
    console.log(app.game.actual_kcal, app.products[productName].kcal,
      app.game.actual_kcal + app.products[productName].kcal,
    app.game.max_kcal);

    if(
      (app.game.actual_kcal + app.products[productName].kcal > app.game.max_kcal)
      || (app.game.actual_protein + app.products[productName].protein > app.game.max_protein)
      || (app.game.actual_fat + app.products[productName].fat > app.game.max_fat)
      || (app.game.actual_carbohydrates + app.products[productName].carbohydrates > app.game.max_carbohydrates)
    ) {
      alert("Jesteś przejedzony!");
      return;
    }

    app.game.actual_kcal += app.products[productName].kcal;
    app.game.actual_protein += app.products[productName].protein;
    app.game.actual_fat += app.products[productName].fat;
    app.game.actual_carbohydrates += app.products[productName].carbohydrates;

    app.bars[1].kcal = app.game.actual_kcal;
    app.bars[1].protein = app.game.actual_protein;
    app.bars[1].fat = app.game.actual_fat;
    app.bars[1].carbohydrates = app.game.actual_carbohydrates;

    app.bars[1].refresh();
  }

  draw(container) {
    let well = container.getElementsByClassName("fridge--content--wrapper")[0];
    well.innerHTML = '';
    let fridge = this;
    let i;
    for (i=0; i<this.products.length; i++) {
      let productName = this.products[i];
      let product = app.products[productName];
      let div = document.createElement("div");
      div.className = "fridge--content--item";
      div.dataset.title = product.kcal+' kcal, białko: '+product.protein+', węglowodany: '+product.carbohydrates+', tłuszcze: '+product.fat;
      product.draw(div);
      div.addEventListener("click", function() {
        fridge.eatProduct(productName);
        div.style.visibility = 'hidden';
      });
      well.appendChild(div);
    }
    while (i % 5 != 0) {
      i++;
      let div = document.createElement("div");
      div.className = "fridge--content--item";
      well.appendChild(div);
    }
  }
};