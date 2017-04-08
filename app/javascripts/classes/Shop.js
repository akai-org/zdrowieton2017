/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Shop = class {
  constructor(limit) {
    this.products = [];
    this.cart = {};
    this.limit = limit;
    this.inCart = 0;
    this.shelfSize = 5;
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
    if (this.inCart < this.limit) {
      this.cart[productName] = (this.cart[productName] || 0) + 1;
      this.inCart++;
    }
  }

  checkout() {
    for (let prod in this.cart) {
      let n = this.cart[prod];
      console.log('put some ', prod, ' to the fridge n=', n);
      while (n--) {
        app.fridge.insertProduct(prod);

      }
    }
    app.fridge.draw(document.getElementById("fridge"));
  }

  draw(container) {
    let well = container.getElementsByClassName("well")[0];
    well.innerHTML = '';
    container.getElementsByClassName("projRemaining")[0].innerHTML = this.inCart + '/' + this.limit;
    let shop = this;
    let shelf, j;
    for (let i=0; i<this.products.length; i++) {
      if (!shelf) {
        shelf = document.createElement("div");
        shelf.className = "shelf";
        j = 0;
      }
      let productName = this.products[i];
      let div = document.createElement("div");
      div.className = "item";
      let product = app.products[productName];
      product.draw(div);
      div.addEventListener("click", function() {
        shop.buyProduct(productName);
        container.getElementsByClassName("projRemaining")[0].innerHTML = shop.inCart + '/' + shop.limit;
        container.getElementsByClassName("cart")[0].innerHTML = JSON.stringify(shop.cart);
      });
      shelf.appendChild(div);
      if (++j >= this.shelfSize) {
        well.appendChild(shelf);
        shelf = null;
      }
    }
    document.querySelector("#shop .start").addEventListener("click", function() {
      shop.checkout();
    });
  }
};