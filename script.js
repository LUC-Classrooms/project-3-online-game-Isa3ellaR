/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Isabella Rodriguez 
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash"; //initial state of the game, set to splash
var player1; // global variable declaring the player object
var gameTimer; //time the game play
var testBox; //box preview on the splash screen
var dropTimer; //regulate box drops
var presents = new Array(0); //empty array called "presents"
var score = 0; //keep track of points (starting at 0)

function setup() {

  createCanvas(600, 400); //creates a canvas of size 600x400 pixels
  player1 = new Player(width/2, height* 4/5); //initial position of player 1
  testBox = new Box(width/2, height/3) //initial position of testBox
  console.log(player1); //logs the player object in the console
  gameTimer = new Timer(20000); //20 second timer
  dropTimer = new Timer(1000); //1 second 

}



function draw() {
  background(255, 240, 140); //light yellow background
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
}//end of draw function

function splash() {
  // this is what you would see when the game starts
  background(255, 240, 140); //light yellow
  textAlign(CENTER); //center-align the text
  textSize(16); //set text size to 16
  text("Let's Play a Game!", width / 2, height / 2); //displays welcome message
  textSize(12); //text size set to 12
  text("(click the mouse to continue)", width / 2, height / 2 + 30); //displays a prompt to start the game
  testBox.display(); //displays the test box on the splash screen
  testBox.spin(); //applys a spin effect to the test box
}//end of splash function

function play() {
  // this is what you see when the game is running 
  background(238, 196, 255); //light pink
  fill(0, 0, 200) //sets fill color
  textAlign(CENTER); //center-aligned text
  textSize(16);//sets text size to 16
  text("This is where the Game happens", width / 2, height / 2); // message indicating the game has started
  //player1.x = mouseX;
  //player1.y = mouseY;
  player1.display(); //displays player character
 // player1.move();

  if(gameTimer.isFinished()){ //if the game timer has finished...
    gameState = "gameOver";// the game state changes to "gameover"
  }
  if(dropTimer.isFinished()){ //if the drop timer has finished...
    let p = new Box(random(width), -40); //creates a new box at random x-position, starting off screen
    presents.push(p); //add p to the array
    dropTimer.start(); //restarts drop timer
    console.log(p); //logs new box to the console
    }

  for(let i = 0; i < presents.length; i++){
    presents[i].display(); //displays the box
    presents[i].move(); //moves the box
    presents[i].spin(); //applies spin effect

    if(presents[i].y > height){ //if the box goes beyond the bottom of the screen...
      presents.splice(i, 1); //remove from array
      score --; //for every missed array a point is lost 
    }
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y); //distance between the box and the player
    if(d< 50){ //if the distance is less than 50 pixels...(indicates a collision)
      presents.splice(i, 1) //remove 1 item at index 'i'
      score ++; // if the object collides with the array it adds a point

    }


  }//end of for()loop
  textAlign(LEFT); //left-aligned text
  text("elapsed time:" + gameTimer.elapsedTime, 20, 20); //display of elapsed time on top-left coner
  text("SCORE:" + score, 20, 40); //shows the score 

  //show elapsed time in top left corner
}//end of play function

function gameOver() {
  // this is what you see when the game ends
  background(0);//black background
  fill(255, 0, 0)//red fill color for text
  textAlign(CENTER);//center-aligned text
  textSize(16);//text size 16
  text("Game Over!", width / 2, height / 2); //displays game over text
  text("Final Score:" + score, width/2, height * 2/3) //displays final score
}//end of gameover fucntion

function mousePressed() { //this function handles mouse clicks

  console.log("click!"); //logs click in console
  if(gameState == "splash"){ //if the game state is "splash"...
    gameState = "play"; //...change the game state to "play"
    gameTimer.start(); //start the timer
    dropTimer.start(); //starts drop timer
    score = 0; //resets score 

  } //go to "play"
  else if(gameState == "play"){
    //gameState = "gameOver";
  } //go to "gameOver"
  else if (gameState == "gameOver"){
    gameState = "splash";
  } //go to "splash"
  console.log (gameState) //logs current gaame state in console
  if (gameState == "gameOver"){
    gameState = "play"; //go to the play() screen

  }
}

function keyPressed(){ //handles key presses for movement of player1
  switch(keyCode){
    case UP_ARROW : //if the up arrow is pressed..
      player1.y -= 30; //subtracts 30 px from .y
      break;
  case DOWN_ARROW : //if the down arrow is pressed...
      player1.y += 30; //adds 30 px from .y
      break;
  case LEFT_ARROW : //if the left arrow is pressed...
    player1.x -= 30;
    break;
  case RIGHT_ARROW : //if the right arrow is pressed...
    player1.x += 30;
    break;
  default:
    console.log("use the arrow keys to move!") //logs arrow use in console

  }
} //end of key pressed function


