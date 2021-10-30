var rulesimg
var room1_img
var playerimg
var play
var gameState= "rules"
var level1_start=1
var level2_start=1
var score=0
var life= 3
//var v;
function preload(){
   rulesimg=loadImage("rulesimg.jpg");
    room1_img=loadImage("room1img.jpg")
    playerimg_running=loadAnimation("walk1.png","walk2.png","walk3.png","walk4.png","walk5.png")
    playerimg_mirror=loadAnimation("walk1_mirror.png","walk2_mirror.png","walk3_mirror.png","walk4_mirror.png","walk5_mirror.png")
    player_standing=loadAnimation("walk3.png")
    coin_img=loadImage("coin_img.png");
    bomb_img=loadAnimation("b1.png")
   bomb_explotion=loadAnimation("b1.png","b2.png","b3.png","b4.png");
   gameOver_img=loadImage("gameOver.jpg");
   restart_img=loadImage("restart.png");
   gameOver_img=loadImage("gameOver.jpg");
   restart_img=loadImage("restart.png");
   room2_img=loadImage("room2img.jpg")1
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  play = createButton("PLAY")
  play.position(width/2,height-200);
  play.mousePressed(() => {
    gameState="level1"
    play.hide()
  });

 gameover= createSprite(width/2,height/2);
 gameover.addImage(gameOver_img);
 gameover.scale=0.5;
 gameover.visible= false;

 restart= createSprite(width/2+190,height/2+100);
 restart.addImage(restart_img);
 restart.scale=0.2;
restart.visible= false;

  player= createSprite(400,200);
  player.addAnimation("standing",player_standing);
  player.addAnimation("running",playerimg_running);
  player.addAnimation("leftrun",playerimg_mirror);
  player.visible= false
  player.scale =0.09;
 player.debug=true;

  coinGroup=new Group()
  bombGroup=new Group()
  

  
}

function draw() {
  background(255,255,255);
 
  if(gameState==="rules"){
    image(rulesimg,0,0,width,height);
  }
  if(gameState==="level1"){
    if(level1_start){
      spawnCoins()
      spawnBomb();
      level1_start =0

    }
    
    image(room1_img,0,0,width,height);
    player.visible= true
    if(score == 5){
    bombGroup.destroyEach()
      gameState="level2"
    }

    for(var i=0;i<coinGroup.length;i++){
      temp = coinGroup.get(i)
       if(player.isTouching(temp)){
         score = score +1
         temp.destroy();
       }
       
    }
   
    for(var j =0; j < bombGroup.length;j++){
      
      var bombtemp = bombGroup.get(j)
      if(player.isTouching(bombtemp)){
        player.x =20
        player.y = 20
        console.log("touch")
        bombtemp.addAnimation("explosion",bomb_explotion)
        bombtemp.changeAnimation("explosion",bomb_explotion)
        //if(life>0)
        //life = life-1
        bombtemp.lifetime=50
      gameState= "over"
        
        
      
      }
     
      

    }
    
    
  if(keyIsDown(UP_ARROW)){
    player.y-=4
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x-=4
    player.changeAnimation("leftrun",playerimg_mirror);
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.changeAnimation("running",playerimg_running);
    player.x+=4
  }
  if(keyIsDown(DOWN_ARROW)){
    player.y+=4
  }
  }
  if(gameState==="level2"){

    if(level_start){
      spawnCoins()
     
      level2_start =0

    }
    
    image(room2_img,0,0,width,height);
    player.visible= true

    for(var i=0;i<coinGroup.length;i++){
      temp = coinGroup.get(i)
       if(player.isTouching(temp)){
         score = score +1
         temp.destroy();
       }
       
    }
   
    
    
    
  if(keyIsDown(UP_ARROW)){
    player.y-=4
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x-=4
    player.changeAnimation("leftrun",playerimg_mirror);
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.changeAnimation("running",playerimg_running);
    player.x+=4
  }
  if(keyIsDown(DOWN_ARROW)){
    player.y+=4
  }
  }
  if(gameState==="over"){
    image(room1_img,0,0,width,height);
     gameover.visible= true;
     restart.visible= true;
     if(mousePressedOver(restart)){
        location.reload()
        
     }
  }
 
    drawSprites();
    textSize(20);
    fill("red")
    text("Score: "+ score, 155,50);
   
}
function spawnCoins(){
  for(var i = 0;i<5;i++){
    x=random(20,width-50)
    y=random(20,height-50);
    coin=createSprite(x,y);
    coin.addImage(coin_img)
    coin.scale=0.05
    coinGroup.add(coin);
  }

}
function spawnBomb(){
  for(var i = 0;i<5;i++){
    x=random(20,width-50)
    y=random(20,height-50);
    bomb=createSprite(x,y);
    bomb.debug = true
    bomb.addAnimation("still",bomb_img)
    bomb.scale=0.5
    bombGroup.add(bomb);
  }
}
function mydestroy(temp){
  console.log("hello")
  temp.destroy()
}