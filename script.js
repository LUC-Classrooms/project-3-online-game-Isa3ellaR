/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash";
var player1;
var gameTimer; //time the game play


function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height* 4/5);
  console.log(player1);
  gameTimer = new Timer(10000); //10 second timer
}



function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch(gameState){
    case "splash" :
      splash(); //go to "splash"
      break;
    case "play" :
      play(); //go to the "play" screen
      break;
    case "gameOver":
      gameOver(); //go to the game over screen
      break;
    default:
      console.log("no match found")
  }
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
  //player1.x = mouseX;
  //player1.y = mouseY;
  player1.display();
 // player1.move();

  if(gameTimer.isFinished()){
    gameState = "gameOver";
  }
  textAlign(LEFT);
  text("elapsed time:" + gameTimer.elapsedTime, 40, 100);
  //show elapsed time in top left corner
}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {

  console.log("click!");
  if(gameState == "splash"){
    gameState = "play";
    gameTimer.start(); //start the timer

  } //go to "play"
  else if(gameState == "play"){
    //gameState = "gameOver";
  } //go to "gameOver"
  else if (gameState == "gameOver"){
    gameState = "splash";
  } //go to "splash"
  console.log (gameState)
  if (gameState == "splash"){
    gameState = "play"; //go to the play() screen

  }
}

function keyPressed(){
  switch(keyCode){
    case UP_ARROW :
      player1.y -= 30; //subtracts 30 px from .y
      break;
  case DOWN_ARROW :
      player1.y += 30; //adds 30 px from .y
      break;
  case LEFT_ARROW :
    player1.x -= 30;
    break;
  case RIGHT_ARROW :
    player1.x += 30;
    break;
  default:
    console.log("use the arrow keys to move!")

  }
}


