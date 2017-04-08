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
    console.log("om nom nom");
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