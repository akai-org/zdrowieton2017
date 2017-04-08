var app = app || {};

app.Game = class {
  constructor() {
    this.score = 0;

    this.min_kcal = 100;
    this.min_protein = 100;
    this.min_fat = 100;
    this.min_carbohydrates = 100;

    this.max_kcal = 200;
    this.max_protein = 200;
    this.max_fat = 200;
    this.max_carbohydrates = 200;
  }

  rand(min, max){
    return Math.floor(Math.random()*(max-min) + min);
  }

  random() {
    this.kcal = this.rand(this.min_kcal,this.max_kcal);
    this.protein = this.rand(this.min_protein,this.max_protein);
    this.fat = this.rand(this.min_fat,this.max_fat);
    this.carbohydrates = this.rand(this.min_carbohydrates,this.max_carbohydrates);


    app.bars[0].kcal = 100 * this.kcal / this.max_kcal;
    app.bars[0].protein =100 *  this.protein / this.max_protein;
    app.bars[0].fat =100 *  this.fat / this.max_fat;
    app.bars[0].carbohydrates =100 *  this.carbohydrates / this.max_carbohydrates;

    app.bars[0].kcal_limit = app.bars[0].kcal;
    app.bars[0].protein_limit = app.bars[0].protein;
    app.bars[0].fat_limit = app.bars[0].fat;
    app.bars[0].carbohydrates_limit = app.bars[0].carbohydrates;

    app.bars[0].refresh();
  }


};