var app = app || {};

app.Product = class {
  constructor() {

  }

  static load(url){
    fetch(url)
      .then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function(json) {
            app.products = {};
            for(let food in json.foods){
              app.products[food] = Object.assign( new app.Product(), json.foods[food]);
            }
          });
        } else {
          console.log("Oops, we haven't got JSON!");
        }
      });
  }

  draw(div) {
    let img = document.createElement("img");
    img.src = 'img/icons/'+this.icon;
    img.alt = this.displayName;
    div.appendChild(img);
  }

};