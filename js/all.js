"use strict";

var app = app || {};

document.addEventListener("DOMContentLoaded", function () {
  if (app.started) return;
  app.started = true;
  app.Product.load('/json/foods.json');

  app.fridge = new app.Fridge();

  app.state = new app.State();
  //app.state.set('welcome');

  setTimeout(function () {
    app.shop = new app.Shop(10);
  }, 500);

  app.Bar.init();

  app.game = new app.Game();
  app.game.random();

  app.bars[0].refresh();
  app.bars[1].refresh();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.Bar = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.kcal = 0;
    this.protein = 0;
    this.fat = 0;
    this.carbohydrates = 0;

    this.kcal_limit = 30;
    this.protein_limit = 30;
    this.fat_limit = 30;
    this.carbohydrates_limit = 30;
  }

  _createClass(_class, [{
    key: 'refbar',
    value: function refbar(bar, a, max) {
      bar.style.height = (100 - 100 * a / max).toString() + '%';
    }
  }, {
    key: 'refresh',
    value: function refresh(b) {
      this.refbar(this.bars[0].getElementsByClassName('blank')[0], this.kcal, app.game.max_kcal);
      this.bars[1].getElementsByClassName('blank')[0].style.height = (100 - 100 * this.protein / app.game.max_protein).toString() + '%';
      this.bars[2].getElementsByClassName('blank')[0].style.height = (100 - 100 * this.fat / app.game.max_fat).toString() + '%';
      this.bars[3].getElementsByClassName('blank')[0].style.height = (100 - 100 * this.carbohydrates / app.game.max_carbohydrates).toString() + '%';
      if (b) {
        this.bars[0].getElementsByClassName('limit')[0].style.top = (100 - 100 * this.kcal_limit / app.game.max_kcal).toString() + '%';
        this.bars[1].getElementsByClassName('limit')[0].style.top = (100 - 100 * this.protein_limit / app.game.max_protein).toString() + '%';
        this.bars[2].getElementsByClassName('limit')[0].style.top = (100 - 100 * this.fat_limit / app.game.max_fat).toString() + '%';
        this.bars[3].getElementsByClassName('limit')[0].style.top = (100 - 100 * this.carbohydrates_limit / app.game.max_carbohydrates).toString() + '%';
      }
    }
  }], [{
    key: 'init',
    value: function init() {
      app.bars = [];
      var needs = document.getElementsByClassName('needs');
      app.needs = needs;

      for (var i = 0; i < needs.length; i++) {
        var chart = new app.Bar();
        chart.bars = [];
        chart.bars.push(app.needs[i].getElementsByClassName("kcal")[0]);
        chart.bars.push(app.needs[i].getElementsByClassName("protein")[0]);
        chart.bars.push(app.needs[i].getElementsByClassName("fat")[0]);
        chart.bars.push(app.needs[i].getElementsByClassName("carbohydrates")[0]);
        app.bars.push(chart);
        console.log(chart);
        //chart.refresh();
      }
    }
  }]);

  return _class;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Fridge = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.products = [];
  }

  _createClass(_class, [{
    key: "clear",
    value: function clear() {
      this.products = [];
    }
  }, {
    key: "insertProduct",
    value: function insertProduct(productName) {
      console.log('inserting');
      this.products.push(productName);
    }
  }, {
    key: "eatProduct",
    value: function eatProduct(productName) {
      console.log(app.game.actual_kcal, app.products[productName].kcal, app.game.actual_kcal + app.products[productName].kcal, app.game.max_kcal);

      if (app.game.actual_kcal + app.products[productName].kcal > app.game.max_kcal || app.game.actual_protein + app.products[productName].protein > app.game.max_protein || app.game.actual_fat + app.products[productName].fat > app.game.max_fat || app.game.actual_carbohydrates + app.products[productName].carbohydrates > app.game.max_carbohydrates) {
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

      // app.bars[1].max_kcal = app.game.actual_kcal;
      // app.bars[1].max_protein = app.game.actual_protein;
      // app.bars[1].max_fat = app.game.actual_fat;
      // app.bars[1].max_carbohydrates = app.game.actual_carbohydrates;

      app.bars[1].refresh(true);
    }
  }, {
    key: "draw",
    value: function draw(container) {
      var _this = this;

      var well = container.getElementsByClassName("fridge--content--wrapper")[0];
      well.innerHTML = '';
      var fridge = this;
      var i = void 0;

      var _loop = function _loop() {
        var productName = _this.products[i];
        var product = app.products[productName];
        var div = document.createElement("div");
        div.className = "fridge--content--item";
        div.dataset.title = product.kcal + ' kcal, białko: ' + product.protein + ', węglowodany: ' + product.carbohydrates + ', tłuszcze: ' + product.fat;
        product.draw(div);
        div.addEventListener("click", function () {
          fridge.eatProduct(productName);
          div.style.visibility = 'hidden';
        });
        well.appendChild(div);
      };

      for (i = 0; i < this.products.length; i++) {
        _loop();
      }
      while (i % 5 != 0) {
        i++;
        var _div = document.createElement("div");
        _div.className = "fridge--content--item";
        well.appendChild(_div);
      }
    }
  }]);

  return _class;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.Game = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.score = 0;

    this.min_kcal = 1000;
    this.min_protein = 100;
    this.min_fat = 100;
    this.min_carbohydrates = 100;

    this.max_kcal = 2000;
    this.max_protein = 500;
    this.max_fat = 500;
    this.max_carbohydrates = 500;

    document.getElementsByClassName("valueKcal")[0].innerHTML = this.max_kcal.toString();
    document.getElementsByClassName("valueProtein")[0].innerHTML = this.max_protein.toString();
    document.getElementsByClassName("valueFat")[0].innerHTML = this.max_fat.toString();
    document.getElementsByClassName("valueCarbo")[0].innerHTML = this.max_carbohydrates.toString();

    this.actual_kcal = 0;
    this.actual_protein = 0;
    this.actual_fat = 0;
    this.actual_carbohydrates = 0;
  }

  _createClass(_class, [{
    key: "rand",
    value: function rand(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: "random",
    value: function random() {
      this.kcal = this.rand(this.min_kcal, this.max_kcal);
      this.protein = this.rand(this.min_protein, this.max_protein);
      this.fat = this.rand(this.min_fat, this.max_fat);
      this.carbohydrates = this.rand(this.min_carbohydrates, this.max_carbohydrates);

      this.actual_kcal = 0;
      this.actual_protein = 0;
      this.actual_fat = 0;
      this.actual_carbohydrates = 0;

      app.bars[0].kcal = this.kcal;
      app.bars[0].protein = this.protein;
      app.bars[0].fat = this.fat;
      app.bars[0].carbohydrates = this.carbohydrates;

      app.bars[0].kcal_limit = this.kcal;
      app.bars[0].protein_limit = this.protein;
      app.bars[0].fat_limit = this.fat;
      app.bars[0].carbohydrates_limit = this.carbohydrates;

      app.bars[1].kcal_limit = this.kcal;
      app.bars[1].protein_limit = this.protein;
      app.bars[1].fat_limit = this.fat;
      app.bars[1].carbohydrates_limit = this.carbohydrates;

      app.bars[0].refresh(true);
      app.bars[1].refresh(true);
    }
  }]);

  return _class;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.Product = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "draw",
    value: function draw(div) {
      var img = document.createElement("img");
      img.src = 'images/icons/' + this.icon;
      img.alt = this.displayName;
      div.appendChild(img);
    }
  }], [{
    key: "load",
    value: function load(url) {
      fetch(url).then(function (response) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function (json) {
            app.products = {};
            for (var food in json.foods) {
              app.products[food] = Object.assign(new app.Product(), json.foods[food]);
            }
          });
        } else {
          console.log("Oops, we haven't got JSON!");
        }
      });
    }
  }]);

  return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by rozwad on 08.04.17.
 */

var app = app || {};

app.Shop = function () {
  function _class(limit) {
    _classCallCheck(this, _class);

    this.products = [];
    this.cart = {};
    this.limit = limit;
    this.inCart = 0;
    this.shelfSize = 5;
  }

  _createClass(_class, [{
    key: 'reset',
    value: function reset() {
      this.products = [];
      this.cart = {};
      this.inCart = 0;
    }
  }, {
    key: 'loadRandomProducts',
    value: function loadRandomProducts(set, number) {
      this.products = set.map(function (name) {
        return [name, Math.random()];
      }).sort(function (a, b) {
        return a[1] - b[1];
      }).slice(0, number).map(function (item) {
        return item[0];
      });

      this.products[Math.floor(Math.random() * number)] = "yoghurt";
    }
  }, {
    key: 'insertProduct',
    value: function insertProduct(productName) {
      this.products.push(productName);
    }
  }, {
    key: 'buyProduct',
    value: function buyProduct(productName) {
      if (this.inCart < this.limit) {
        this.cart[productName] = (this.cart[productName] || 0) + 1;
        this.inCart++;
      }
    }
  }, {
    key: 'checkout',
    value: function checkout() {
      var items = Object.keys(this.cart);
      var randomName = items[Math.floor(Math.random() * items.length)];
      document.getElementById('best-tip-ever').innerHTML = app.products[randomName].hint;

      for (var prod in this.cart) {
        var n = this.cart[prod];
        console.log('put some ', prod, ' to the fridge n=', n);
        while (n--) {
          app.fridge.insertProduct(prod);
        }
      }
      app.fridge.draw(document.getElementById("fridge"));
    }
  }, {
    key: 'draw',
    value: function draw(container) {
      var _this = this;

      this.shelfSize = Math.min(window.innerWidth, 260 * 5) / 260;

      var well = container.getElementsByClassName("well")[0];
      well.innerHTML = '';
      container.getElementsByClassName("projRemaining")[0].innerHTML = this.inCart + '/' + this.limit;
      var shop = this;
      var shelf = void 0,
          j = void 0;

      var _loop = function _loop(i) {
        if (!shelf) {
          shelf = document.createElement("div");
          shelf.className = "shelf";
          j = 0;
        }
        var productName = _this.products[i];
        var div = document.createElement("div");
        div.className = "item";
        div.dataset.num = 0;
        var product = app.products[productName];
        product.draw(div);
        div.addEventListener("click", function () {
          shop.buyProduct(productName);
          div.dataset.num = shop.cart[productName] || 0;
          container.getElementsByClassName("projRemaining")[0].innerHTML = shop.inCart + '/' + shop.limit;
        });
        shelf.appendChild(div);
        if (++j >= _this.shelfSize) {
          well.appendChild(shelf);
          shelf = null;
        }
      };

      for (var i = 0; i < this.products.length; i++) {
        _loop(i);
      }

      document.querySelector("#shop .start").onclick = function () {
        shop.checkout();
      };
    }
  }]);

  return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.states = ['welcome', 'monster', 'shop', 'tips', 'fridge', 'score'];

app.State = function () {
  function _class() {
    _classCallCheck(this, _class);

    var $this = this;
    window.addEventListener("hashchange", function () {
      console.log($this);
      $this.set(window.location.hash);
      //window.location.hash = "";
    });
  }

  _createClass(_class, [{
    key: 'set',
    value: function set(target) {
      //target = target.substring(1);
      target = target.replace('#', '');
      if (target == 'monster') {
        app.game.random();
      }
      //if( (target) && (0 === target.length) ) return;
      for (var i in app.states) {
        var state = app.states[i];
        //if((state) && (0 === target.length)) break;
        document.getElementById(state).classList.add("hidden");
      }
      document.getElementById(target).classList.remove("hidden");

      if (target == "monster") {
        app.shop.reset();
        app.shop.loadRandomProducts(Object.keys(app.products).filter(function (name) {
          return !(name.startsWith('cooked-') || name.startsWith('fried-') || name == 'yoghurt');
        }), 20);
        app.shop.draw(document.getElementById("shop"));
        app.fridge.clear();
      }
      if (target == "score") {
        /*let deltaKcal = Math.abs(app.game.kcal - app.game.actual_kcal);
        let deltaProtein = Math.abs(app.game.protein - app.game.actual_protein);
        let deltaFat = Math.abs(app.game.fat - app.game.actual_fat);
        let deltaCarbohydrates = Math.abs(app.game.carbohydrates - app.game.actual_carbohydrates);
         let score0 = deltaKcal + deltaProtein + deltaFat + deltaCarbohydrates;*/
        var score = Math.round(Math.random() * 80 + 50);
        document.querySelector('h2').innerHTML = score;
        var totalScore = (parseInt(document.querySelector('#total').innerHTML) || 0) + score;
        document.querySelector('#total').innerHTML = totalScore;
      }
    }
  }]);

  return _class;
}();
//# sourceMappingURL=all.js.map
