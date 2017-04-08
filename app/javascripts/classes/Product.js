var app = app || {};

app.Product = class {
  constructor() {

    //this.name = {};
  }

  static load(url){
    fetch(url)
      .then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function(json) {
            app.products = [];
            for(let food in json.foods){

              //let product = new app.Product();

              app.products.push( Object.assign( new app.Product(), json.foods[food]) );
            }
          });
        } else {
          console.log("Oops, we haven't got JSON!");
        }
      });
  }


};