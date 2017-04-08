var app = app || {};

app.states = ['welcome', 'monster', 'shop', 'tips', 'fridge', 'score'];

app.State = class {
  constructor() {
    var $this = this;
    window.addEventListener("hashchange", function(){
      console.log($this);
      $this.set(window.location.hash);
      //window.location.hash = "";
    });
  }

  set(target) {
    //target = target.substring(1);
    target = target.replace('#', '');
    if(target == 'monster') {
      app.game.random();
    }
    //if( (target) && (0 === target.length) ) return;
    for(let i in app.states) {
      let state = app.states[i];
      //if((state) && (0 === target.length)) break;
      document.getElementById(state).classList.add("hidden");
    }
    document.getElementById(target).classList.remove("hidden");

    if (target == "monster") {
      app.shop.reset();
      app.shop.loadRandomProducts(
        Object.keys(app.products).filter(name => !(name.startsWith('cooked-') || name.startsWith('fried-') || name == 'yoghurt')),
        20
      );
      app.shop.draw(document.getElementById("shop"));
      app.fridge.clear();
    }
    if (target == "score") {
      /*let deltaKcal = Math.abs(app.game.kcal - app.game.actual_kcal);
      let deltaProtein = Math.abs(app.game.protein - app.game.actual_protein);
      let deltaFat = Math.abs(app.game.fat - app.game.actual_fat);
      let deltaCarbohydrates = Math.abs(app.game.carbohydrates - app.game.actual_carbohydrates);

      let score0 = deltaKcal + deltaProtein + deltaFat + deltaCarbohydrates;*/
      let score = Math.round(Math.random()*80 + 50);
      document.querySelector('h2').innerHTML = score;
      let totalScore = (parseInt(document.querySelector('#total').innerHTML) || 0) + score;
      document.querySelector('#total').innerHTML = totalScore;
    }
  }
};