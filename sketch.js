var marathoneRunner, marathoneRunnerImg,marathoneRunner1Img;
var bg,bgImg;
var  bottomGround;
var obs1,obs2,obs3,obs4,obs5,obstacle;
var obs3Img,obs4Img,obs5Img;
var obs3PinkImg,obs4YellowImg,obs5RedImg;

var bgSound,gameOverSound,gameOverSound1;

var obstacleGroup;
var pinkCG,redCG,yellowCG;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var distance = 0;
var gameOver,gameOverImg;
var restart;

function preload(){
  bgImg = loadImage("Road.png");
  marathoneRunnerImg = loadAnimation("Marathone runner-1.png","Marathone-runner-3.png","Marathone-runner-3.png");
  marathoneRunner1Img = loadAnimation("Marathone runner -4.png");
  obs1 = loadImage("obs 2.png");
  obs2 = loadImage("obstacle2.png");
  obs3Img = loadAnimation("opponent1.png","opponent2.png");
  obs3PinkImg = loadAnimation("opponent3.png");
  obs4Img = loadAnimation("opponent4.png","opponent5.png");
  obs4YellowImg = loadAnimation("opponent6.png");
  obs5Img = loadAnimation("opponent7.png","opponent8.png");
  obs5RedImg = loadAnimation("opponent9.png");

  gameOverImg = loadImage("gameOver.png");

//  bgSound = loadSound("jazzy_beats.mp3");
  gameOverSound = loadSound("game_over.mp3");
  gameOverSound1 = loadSound("gameover.mp3");

}

function setup() {
  createCanvas(800,400);

 bg = createSprite(165,200,1,1);
bg.addImage(bgImg);
bg.scale = 1;
bg.velocityX = -2
    
//creating runner`  
marathoneRunner = createSprite(100,300,20,20);
marathoneRunner.addAnimation("marathone",marathoneRunnerImg);
marathoneRunner.addAnimation("collided",marathoneRunner1Img);
marathoneRunner.scale = 0.4

bottomGround = createSprite(500,390,1000,20);
bottomGround.visible = false;

//marathoneRunner1.setCollider("rectangle",0,-80,marathoneRunner1.width,marathoneRunner1.height);
marathoneRunner.debug = true;
  
  
gameOver = createSprite(450,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  

obstacleGroup = new Group();
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

}

function draw() {

  background(0);  
  
  
  if(gameState === PLAY){

    distance = distance + Math.round(getFrameRate()/50);
    bg.velocityX = -(6 + 2*distance/150);
   
    gameOver.depth = gameOver.depth+1;
    
    //Making player move
    marathoneRunner.y = World.mouseY;
     
   // marathoneRunner.collide(bottomGround);
    
  //creating edges
   edges= createEdgeSprites();
   marathoneRunner.collide(edges);
  
     //code to reset the background
  if(bg.x < 0 ){
    bg.x = width/2;
  }

   //creating continous opponent players
   var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclist();
    } else if (select_oppPlayer == 2) {
      yellowCyclist();
    } else {
      redCyclist();
    }
  }

  //calling function
  spawnObstacles();     
  

//code to stop plyer if he touch any obstacle
if(obstacleGroup.isTouching(marathoneRunner)){
gameState = END;
//change animation
;
}
  if(pinkCG.isTouching(marathoneRunner)){
  gameState = END; 
  obs3.changeAnimation("pink1",obs3PinkImg);
    pinkCG.setVelocityXEach(0);
  }
  if(yellowCG.isTouching(marathoneRunner)){
    gameState = END; 
    obs4.changeAnimation("yellow1",obs4YellowImg);
    yellowCG.setVelocityXEach(0);
    } 
    if(redCG.isTouching(marathoneRunner)){
      gameState = END; 
      obs5.changeAnimation("red1",obs5RedImg);
      redCG.setVelocityXEach(0);
      }
  }else if(gameState === END){

    textSize(20);``
    fill("red");
    text("Press Up Arrow to Restart the game!", 300,200);
  
    bg.velocityX = 0;
  

  
    gameOverSound1.play();


    marathoneRunner.changeAnimation( "collided",marathoneRunner1Img);
   
    
   




    // all things should stop when gameState end
    marathoneRunner.velocityX = 0; 
    marathoneRunner.velocityY = 0; 
    obstacleGroup.setVelocityXEach(0);

    
    gameOver.visible = true;
        //setting -1 lifetime so that obstacles don't disappear in the END state
        obstacleGroup.setLifetimeEach(-1);
        obstacleGroup.setLifetimeEach(-1);

        if(keyDown("UP_ARROW")) {
          reset();
        }
  }

  drawSprites();
  text("Distance: "+ distance,650,30);
  
}

function spawnObstacles(){
  if(World.frameCount%60 === 0){
  obstacle = createSprite(800,350,40,50);
  obstacle.scale = 0.3;
  obstacle.velocityX = -3



//random y positions for  obstacles
obstacle.y = Math.round(random(20,400));
  
  rand = Math.round(random(1,2));
  switch(rand){
    case 1: obstacle.addImage(obs1);
    break;
    case 2: obstacle.addImage(obs2);
    break;
    default:break;
  }
  obstacle.lifetime = 700;

  marathoneRunner.depth = marathoneRunner.depth+1;

  obstacleGroup.add(obstacle);
  }

} 

 function reset(){
   gameState = PLAY;
   gameOver.visible = false;
  marathoneRunner.changeAnimation("marathone",marathoneRunnerImg);

  obstacleGroup.destroyEach();
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  distance = 0;
 }

 function pinkCyclist(){
  obs3 = createSprite(800,Math.round(random(20,400)));
  obs3.scale =0.3;
  obs3.velocityX = -(2 + 2*distance/150);
  obs3.addAnimation("pink",obs3Img);
  obs3.addAnimation("pink1",obs3PinkImg);
  obs3.setLifetime=700;
  pinkCG.add(obs3);

 }

 function yellowCyclist(){
  obs4 = createSprite(800,Math.round(random(20,400)));
  obs4.scale =0.3;
  obs4.velocityX = -(2 + 2*distance/150);
  obs4.addAnimation("yellow",obs4Img);
  obs4.addAnimation("yellow1",obs4YellowImg);
  obs4.setLifetime=700;
  yellowCG.add(obs4);

 }

 function redCyclist(){
  obs5 = createSprite(800,Math.round(random(20,400)));
  obs5.scale =0.3;
  obs5.velocityX = -(2 + 2*distance/150);
  obs5.addAnimation("red",obs5Img);
  obs5.addAnimation("red1",obs5RedImg);
  obs5.setLifetime=700;
  redCG.add(obs5);

 }