var Trex;
var Ground;
var Cloud;
var obstacle;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var Gamestate="play";
var GroupOB;
var GroupCL;
var score=0;
var Gameover;
var Restart;


function preload(){
  Trex1=loadAnimation("trex1.png","trex3.png","trex4.png");
  Ground2=loadAnimation("ground2.png");
  Cloud1=loadAnimation("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
  Check=loadSound("checkPoint.mp3");
  Die=loadSound("die.mp3");
  Jump=loadSound("jump.mp3");
  Gameover1=loadAnimation("gameOver.png");
  Restart1=loadAnimation("restart.png");
  TrexCollider=loadAnimation("trex_collided.png");
} 
function setup() {
  createCanvas(400, 400);
  Trex=createSprite(200,200,20,20);
  Trex.addAnimation("Trex1",Trex1);
  Trex.scale=0.7;
  //Trex.debug=true;
  Trex.setCollider("rectangle",-10,0,20,80,30);
  Trex.addAnimation("Trex2",TrexCollider);
  Ground=createSprite(200,235,1000,15);
  Ground.addAnimation("ground2.png",Ground2);
  Ground.velocityX=-10;
  
  Ground3=createSprite(200,255,400,15);
  //Ground3.shapeColor=220;
  Ground3.visible=false;
  
GroupOB=new Group();
GroupCL=new Group();
  
  Gameover=createSprite(200,100,20,20);
  Gameover.addAnimation("gameOver.png",Gameover1);
  Gameover.scale=0.5;
  
  Restart=createSprite(200,130,20,20);
  Restart.addAnimation("restart.png",Restart1);
  Restart.scale=0.5;
}


function draw() {
  background("white");
  if (Gamestate=="play"){
     if (keyDown("space") && Trex.y>=213){
    Trex.velocityY=-10;
       Jump.play();
     }//end of keydown
    Gameover.visible=false;
    Restart.visible=false;
        score=score+1;
  Trex.velocityY=Trex.velocityY+0.2;
     if(Ground.x<=0){
    Ground.x=200;                             
  }//end of Repositioning ground"
     if (frameCount%80==0){
     Cloud=createSprite(400,60,20,20);
    Cloud.addAnimation("Cloud",Cloud1);
  Cloud.velocityX=-3;
       Cloud.lifetime=300;
    Cloud.y=(Math.round(random(60,120)));
    Cloud.depth=0.5; //depth is the measure of which sprite will come in front of the other.
      GroupCL.add(Cloud);
   // console.log(Cloud.depth);
    
  }//end of if(cloud)
    if (frameCount%130==0){
      obstacle=createSprite(400,208,20,20);
      obstacle.velocityX=-8;
      obstacle.lifetime=300;
      obstacle.scale=0.6;
   r=Math.round(random(1,6));
      switch(r){
        case 1 : obstacle.addImage(obstacle1);break;
        case 2 : obstacle.addImage(obstacle2);break;
        case 3 : obstacle.addImage(obstacle3);break;
        case 4 : obstacle.addImage(obstacle4);break;
          case 5 : obstacle.addImage(obstacle5);break;
            case 6 : obstacle.addImage(obstacle6);break;
            default:break;
      } //end of switch
      GroupOB.add(obstacle);
      }//end of if(obstacle)
    if(Trex.isTouching(GroupOB)){
        Gamestate="end";
     Die.play();
       }
    if(score%100==0){
      Check.play();
      Ground.velocityX=Ground.velocityX-1;
      GroupOB.setVelocityXEach(Ground.velocityX)
    }
  }//end of gamestate play
 
  Trex.collide(Ground3);
  
 
  //console.log(Ground.depth);
  //cloud is created when framecount divided by 80 gives remainder=0;
 
        //console.log(Ground.velocityX);
   
      if (Gamestate=="end"){
        Ground.velocityX=0;
 GroupOB.setVelocityXEach(0);
         GroupCL.setVelocityXEach(0);
        GroupOB.setLifetimeEach(-1);
        GroupCL.setLifetimeEach(-1);
  Trex.velocityY=0;
         Trex.changeAnimation("Trex2",TrexCollider);
          Gameover.visible=true;
    Restart.visible=true;
        if(mousePressedOver(Restart)){
          Gamestate="play";
          GroupOB.destroyEach();
          Ground.velocityX=-10;
          Trex.changeAnimation("Trex1",Trex1);
          GroupCL.destroyEach();
         score=0;
        }//end of if (mouse)
        
      }
     
      
     text("score-"+score,320,50);
  
    
  
  drawSprites();
}