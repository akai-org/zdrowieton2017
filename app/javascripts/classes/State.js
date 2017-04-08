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
    console.log(target);
    //if( (target) && (0 === target.length) ) return;
    for(let i in app.states) {
      let state = app.states[i];
      //if((state) && (0 === target.length)) break;
      console.log(state);
      document.getElementById(state).classList.add("hidden");
    }
    console.log(target);
    document.getElementById(target).classList.remove("hidden");
  }
};