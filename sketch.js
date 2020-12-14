 var bird,bird_img;
var pipe,pipe2,pipe3,pipes,pipes2,pipes3,pipesGroup,pipesGroup2;
var ground,ground_img;
var backgr,backgr_img;
var gameover,gameover_img;
var restart,restart_img;
var play,play_img;
 var play2,play2_img;
 var real,real_img;
 var END=0;
 var serve;
var score=0;
var PLAY=1;
var gameState=PLAY;
var wingS,scoreS,hitS;

function preload(){
   bird_img=loadImage("bird2.png");
   pipe=loadImage("pipe1)).png");
   pipe2=loadImage("pipe2)).png");
   pipe3=loadImage("pipe 3.png");
   pipes=loadImage("pipes.png");
   pipes2=loadImage("pipe2.png");
   pipes3=loadImage("pipes3.png");
   ground_img=loadImage("ground.png");
   backgr_img=loadImage("background.png");
   gameover_img=loadImage("gameover.png");
   restart_img=loadImage("reset.png");
   play_img=loadImage("play.png");
   play2_img=loadImage("play 2.png");
   real_img=loadImage("real play.png");
   wingS=loadSound("wing.mp3");
  scoreS=loadSound("point.mp3");
   hitS=loadSound("hit.mp3");

}

function setup(){
    createCanvas(1500,800 );
  

    pipesGroup=new Group;
    pipesGroup2=new Group;

backgr=createSprite(150,400,1500,800);
 backgr.addImage(backgr_img);
 backgr.x = backgr.width/2;
 backgr.velocityX=-8;

ground=createSprite(width/2,height-20,width,135);
ground.visible=false;
ground.x = ground.width/2;
ground.velocityX=-4;


bird=createSprite(300,height-190,20,20);
bird.addImage(bird_img);
bird.scale=0.17;

 gameover=createSprite(width/2,height/2-200);
  gameover.scale=0.3;
  gameover.addImage(gameover_img);
  restart=createSprite(width/2,height/2);
  restart.addImage(restart_img);
  restart.scale=0.2;

  
  /*play=createSprite(800,450);
  play.addImage(play_img);
  play.scale=0.4;
  
  real=createSprite(800,250);
  real.addImage(real_img);
  real.scale=0.6;
 
  play2=createSprite(800,100);
  play2.addImage(play2_img);
  play2.scale=1;*/
 
  gameover.visible=false;
  restart.visible=false;
 // play.visible=false;
 // real.visible=false;
 // play2.visible=false;
 
 fill("black");  
  score=0;
}
function draw(){
  // background(backgr_img);
  //console.log(PLAY);
 
  drawSprites();
     textSize(30);
  text("SCORE :"+score,1100,200);
  if (backgr.x < 0){
    backgr.x = backgr.width/2;
    
      
  }
    if(gameState===PLAY){
    
     backgr.velocityX=-8;
     ground.velocityX=-(4+2*score/500);
   
     score = score+Math.round(getFrameRate()/30); 
    
    if(score>0 && score%500===0){
      scoreS.play();
    }

   if (ground.x < 0){ 
    ground.x = ground.width/2;
  }
  // if (backgr.x < 0){
    //backgr.x = backgr.width/2;
  //}
  if(touches.length>0 || keyDown("space")){
         bird.velocityY = -12 ;
         wingS.play();
         touches = [];
           }
           bird.velocityY = bird.velocityY + 0.8;
           bird.velocityX=0;
           //bird.collide(ground);
           spawnPipes();
           spawnPipes2();
          // bird.collide(pipesGroup);
           //bird.collide(pipesGroup2);

          if(bird.isTouching(ground) || bird.isTouching(pipesGroup) || bird.isTouching(pipesGroup2)){
            gameState=END;
            hitS.play();
           }}
          if(gameState===END){
           gameover.visible=true;
            restart.visible=true;
            backgr.velocityX=0;
            ground.velocityX=0;
            bird.velocityY=0;
            pipesGroup.setVelocityXEach(0);
            pipesGroup2.setVelocityXEach(0);
            pipesGroup.setLifetimeEach(-1);
            pipesGroup2.setLifetimeEach(-1);
            //score=0;
            bird.y=200;
            textSize(40);
            fill("black");
            text("It is ok.😉.Try once more😎😎-FLAPPY",400,300);
        
           }
      
      if(touches.length>0 || mousePressedOver(restart)) {
        reset();
        touches = [];  
      }
    
  
      }
      
      function reset(){
        gameState=PLAY;
        gameover.visible=false;
        restart.visible=false;
        pipesGroup.destroyEach();
        pipesGroup2.destroyEach();
        score=0;

      }



     function spawnPipes() {
        //write code here to spawn the clouds
        if (frameCount % 40 === 0) {
          var pipe1 = createSprite(1200,600,40,10);
          pipe1.y = Math.round(random(700,900));
          pipe1.addImage(pipe);
          pipe1.scale = 0.8;
          pipe1.velocityX = -(8+2*score/500);
          
          pipe1.lifetime = 300;
          //add each pipe to the group
          pipesGroup.add(pipe1);
        }
      }

      function spawnPipes2() {
        //write code here to spawn the clouds
        if (frameCount % 40 === 0) {
          var pipe = createSprite(1200,200,40,10);
          pipe.y = Math.round(random(0,50));
          pipe.addImage(pipe2);
          pipe.scale = 0.8;
          pipe.velocityX = -(8+2*score/500);
          
           //assign lifetime to the variable
          pipe.lifetime = 300;
          
          //add each cloud to the group
          pipesGroup2.add(pipe);
        }
      }
