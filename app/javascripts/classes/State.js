var app = app || {};

app.states = ['welcome', 'monster', 'shop', 'fridge', 'score'];

app.State = class {
  constructor() {

  }

  set(target) {
    for(let i in app.states) {
      let state = app.states[i];
      console.log(state);
      console.log(document.getElementById(state));
      document.getElementById(state).classList.add("hidden");
    }
  }
};