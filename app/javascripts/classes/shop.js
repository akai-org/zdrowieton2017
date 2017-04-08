/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Shop = class {
  constructor(limit) {
    this.products = [];
    this.cart = [];
    this.limit = limit;
  }

  loadRandomProducts(set, number) {
    this.products = set.map(name => [name, Math.random()])
      .sort((a, b) => a[1] - b[1])
      .slice(0, number)
      .map(item => item[0]);
  }

  insertProduct(productName) {
    this.products.push(productName);
  }

  buyProduct(productName) {
    if (this.limit > 0) {
      this.cart.push(productName);
      this.limit--;
    }
  }

  checkout() {
    // put the products into the fridge
  }

  draw(container) {
    let well = container.getElementsByClassName("well")[0];
    products.forEach(function(product) {
      let div = document.createElement("div");
      div.className = "item";
      app.products[product].draw(div);
      div.addEventListener("click", function() {
        console.log("An item has been clicked!", app.products[product]);
      });
      well.appendChild(div);
    });
  }
};