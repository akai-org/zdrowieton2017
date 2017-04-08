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
  }
};