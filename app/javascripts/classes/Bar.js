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

  refresh() {
    this.bars[0].getElementsByClassName('blank')[0].style.height=(100-this.kcal).toString()+'%';
    this.bars[1].getElementsByClassName('blank')[0].style.height=(100-this.protein).toString()+'%';
    this.bars[2].getElementsByClassName('blank')[0].style.height=(100-this.fat).toString()+'%';
    this.bars[3].getElementsByClassName('blank')[0].style.height=(100-this.carbohydrates).toString()+'%';
    this.bars[0].getElementsByClassName('limit')[0].style.top=(100-this.kcal_limit).toString()+'%';
    this.bars[1].getElementsByClassName('limit')[0].style.top=(100-this.protein_limit).toString()+'%';
    this.bars[2].getElementsByClassName('limit')[0].style.top=(100-this.fat_limit).toString()+'%';
    this.bars[3].getElementsByClassName('limit')[0].style.top=(100-this.carbohydrates_limitg).toString()+'%';
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
      chart.refresh();
    }

  }
};