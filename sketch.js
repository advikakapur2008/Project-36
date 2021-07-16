var dog,sadDog,happyDog;
//var Milk;
var feed, add;
var foodObj;
var foodStock, foodS;
var database;
//var x;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  //Milk = loadImage("Images/Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  //foodObj = new food;
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  add = createButton("Add the food");
  add.position(800,95);
  add.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  if(keyWentDown("space") && foodS===0){
    writestock(foodS);
    dog.addImage(Dog);
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happy_Dog);
  }
  //foodObj.display();
  drawSprites();
  fill(255,255,254);
  stroke("black");
  textSize(18);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:x
  })
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}