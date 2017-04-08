var app = app || {};

app.Game = class {
  constructor() {
    this.score = 0;

    this.min_kcal = 100;
    this.min_protein = 100;
    this.min_fat = 100;
    this.min_carbohydrates = 100;

    this.max_kcal = 2000;
    this.max_protein = 500;
    this.max_fat = 500;
    this.max_carbohydrates = 500;

    // document.getElementsByClassName("valueKcal")[0].innerHTML = this.max_kcal.toString();
    // document.getElementsByClassName("valueProtein")[0].innerHTML = this.max_protein.toString();
    // document.getElementsByClassName("valueFat")[0].innerHTML = this.max_fat.toString();
    // document.getElementsByClassName("Carbo")[0].innerHTML = this.max_carbohydrates.toString();

    this.actual_kcal = 0;
    this.actual_protein = 0;
    this.actual_fat = 0;
    this.actual_carbohydrates = 0;
  }

  rand(min, max){
    return Math.floor(Math.random()*(max-min) + min);
  }

  random() {
    this.kcal = this.rand(this.min_kcal,this.max_kcal);
    this.protein = this.rand(this.min_protein,this.max_protein);
    this.fat = this.rand(this.min_fat,this.max_fat);
    this.carbohydrates = this.rand(this.min_carbohydrates,this.max_carbohydrates);


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


};