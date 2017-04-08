var app = app || {};

app.Bar = class {
  constructor() {
    this.kcal = 0;
    this.protein = 0;
    this.fat = 0;
    this.carbohydrates = 0;

    this.kcal_limit = 30;
    this.protein_limit = 30;
    this.fat_limit = 30;
    this.carbohydrates_limit = 30;
  }

  refbar(bar,a,max){
    bar.style.height=(100-(100*a/max)).toString()+'%';
  }

  refresh() {
    this.refbar(this.bars[0].getElementsByClassName('blank')[0],this.kcal,app.game.max_kcal);
    this.bars[1].getElementsByClassName('blank')[0].style.height=(100-(100*this.protein/app.game.max_protein)).toString()+'%';
    this.bars[2].getElementsByClassName('blank')[0].style.height=(100-(100*this.fat/app.game.max_fat)).toString()+'%';
    this.bars[3].getElementsByClassName('blank')[0].style.height=(100-(100*this.carbohydrates/app.game.max_carbohydrates)).toString()+'%';
    this.bars[0].getElementsByClassName('limit')[0].style.top=(100-(100*this.kcal/app.game.kcal_limit)).toString()+'%';
    this.bars[1].getElementsByClassName('limit')[0].style.top=(100-(100*this.protein/app.game.protein_limit)).toString()+'%';
    this.bars[2].getElementsByClassName('limit')[0].style.top=(100-(100*this.fat/app.game.fat_limit)).toString()+'%';
    this.bars[3].getElementsByClassName('limit')[0].style.top=(100-(100*this.carbohydrates/app.game.carbohydrates_limit)).toString()+'%';
  }

  static init() {
    app.bars = [];
    let needs = document.getElementsByClassName('needs');
    app.needs = needs;

    for(let i = 0; i < needs.length ; i++) {
      let chart = new app.Bar();
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
};