var splashscreen;
var playbutton, aboutbutton;
var gameState = "wait";
var health1 = 200;
var maxhealth1 = 200;
var score1 = 0;
var score2 = 0;
var health2 = 200;
var maxhealth2 = 200;
var playerimg, player;
var fireball, flame_obstacle
var enemy, enemyimg, enemyGroup, fireballGroup
var black_widowimg, boulder_obstacleimg, nick_furyimg, flame_obstacle, hawkeyeimg, hulkimg
var reward_plus_pointimg, thanosimg, thorimg, ultronimg, level2_bgimg, iron_manimg, lokiimg
var level3_img, lightning_obstacleimg,reward,rewardGroup
var fireballGroup2,enemyGroup2 ,rewardGroup2

function preload() {
  splashscreen = loadImage('assets/The quest.gif')
  bgwait = loadImage('assets/level1_bg.avif')
  playerimg = loadImage('assets/captain_america.png')
  enemyimg = loadImage('assets/chitauri.png')
  black_widowimg = loadImage('assets/black_widow.png')
  boulder_obstacleimg = loadImage('assets/boulder_obstacle.png')
  nick_furyimg = loadImage("assets/Director_Nick_Fury.webp")
  flame_obstacle = loadImage("assets/flame_obstacle.png")
  hawkeyeimg = loadImage('assets/hawkeye.png')
  hulkimg = loadImage('assets/hulk.png')
  iron_manimg = loadImage('assets/iron_man.png')
  level2_bgimg = loadImage('assets/level2_bg.jpg')
  level3_img = loadImage('assets/level3_bg.jpg')
  lightning_obstacleimg = loadImage('assets/lightning_obstacle.png')
  lokiimg = loadImage('assets/loki.png')
  reward_plus_pointimg = loadImage("assets/reward_plus_point.png")
  thanosimg = loadImage("assets/thanos.png")
  thorimg - loadImage("assets/thor.png")
  ultronimg = loadImage("assets/ultron.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)


  playbutton = createImg("assets/play_button.png");
  playbutton.position(width - 300, height - 100);
  playbutton.size(200, 75);


  aboutbutton = createImg("assets/information_button.png");
  aboutbutton.position(100, height - 100);
  aboutbutton.size(200, 75);

  player = createSprite(50, height - 100);
  player.addImage(playerimg);
  player.visible = false;
  player.scale = 0.5


  // create Groups
  fireballGroup = new Group()
  enemyGroup = new Group()
rewardGroup = new Group()


fireballGroup2 = new Group()
enemyGroup2 = new Group()
rewardGroup2 = new Group()


}


function draw() {
  if (gameState == "wait") {
    background(splashscreen);
   
  }
  playbutton.mousePressed(() => {
    gameState = "play";
    playbutton.hide();

  })

  aboutbutton.mousePressed(() => {
    gameState = "aboutgame";
    aboutbutton.hide();
  })

  if (gameState == "aboutgame") {
    aboutpopup();
  }

  if (gameState == "play") {
    background(bgwait);
    aboutbutton.hide();
    playbutton.hide();
    player.visible = true
    // health bar
    healthBar(width - 300, 33, health1, maxhealth1, "violet");

    // target
    healthBar(155, 33, score1, maxhealth1, "green")
    movement();
    spawnRewards();
    spawnEnemy();


    // fireball touching enemy
    for (var i = 0; i < enemyGroup.length; i++) {

      if (fireballGroup.isTouching(enemyGroup.get(i))) {

        enemyGroup.get(i).remove()
        fireballGroup.destroyEach()
        score1 +=10
      }
     
    }

    // player touching enemy
    for (var i = 0; i < enemyGroup.length; i++) {

      if (player.isTouching(enemyGroup.get(i))) {

        enemyGroup.get(i).remove()
        
        health1 -=10
      }

         }

// player touching reward
         for (var i = 0; i < rewardGroup.length; i++) {

          if (player.isTouching(rewardGroup.get(i))) {
    
            rewardGroup.get(i).remove()
            
            if(health1 <maxhealth1){
            health1 += 5
          }
          } 
    
             }


             if(score1>=200 && health1>=20){
              nextlevelpopup()
              enemyGroup.destroyEach()
              fireballGroup.destroyEach()
              player.visible=false
              rewardGroup.destroyEach()
             }


  }


// level 2 start
if(gameState=="level2"){
  background(level2_bgimg)
  player.visible = true


  movement()
  spawnReward2();
  spawnEnemy2();


    // health bar
    healthBar(width - 300, 33, health2, maxhealth2, "violet");

    // target
    healthBar(155, 33, score2, maxhealth2, "green")


}




  drawSprites()

  if (gameState == "play") {
    textSize(50)
    stroke("red")
    strokeWeight(4)
    fill("yellow")
    text("LEVEL 1", width / 2 - 100, 50)
    textSize(30)
    fill("cyan")
    stroke("red")
    text("TARGET :", 15, 50)
  }

  
  if (gameState == "level2") {
    textSize(50)
    stroke("red")
    strokeWeight(4)
    fill("yellow")
    text("LEVEL 2", width / 2 - 100, 50)
    textSize(30)
    fill("cyan")
    stroke("red")
    text("TARGET :", 15, 50)
  }

}

function aboutpopup() {
  swal({
    title: "Avengers- Assemble!!!",
    text: "The Avengers have all been captured, even director of S.H.I.E.L.D, Agent Nick Fury! Hit the enemies using the space bar to shoot flames and dodge them using the keys. If you are running low on health, collect the plus points! The more enemies you kill, the higher the chances of reaching the next level. Good luck Captain!",
    textAlign: "center",
    imageUrl: "assets/captain_america.png",
    imageSize: "200x200",
    confirmButtonText: "Let's Assemble!!!",
    confirmButtonColor: "blue",
  },
    function () {
      gameState = "wait"
    }
  )
}


function healthBar(x, y, h, mx, clr) {
  noFill();
  stroke("cyan");
  strokeWeight(2);
  rect(x, y, mx, 20);
  fill(clr);
  rect(x, y, h, 20);
}

function spawnRewards() {
  if (frameCount % 200 == 0) {
    reward = createSprite(
      Math.round(random(10, width - 100)),
      Math.round(random(50, height - 100)),
      50,
      50
    );
    reward.addImage(reward_plus_pointimg)
    reward.scale = 0.5


    rewardGroup.add(reward)
  }
}

function movement() {
  if (keyDown("RIGHT")) {
    player.x += 5;
  }
  if (keyDown("DOWN")) {
    player.y += 5;
  }
  if (keyDown("UP")) {
    player.y -= 5;
  }
  if (keyDown("LEFT")) {
    player.x -= 5;
  }

  if (keyDown("space")) {

    if (frameCount % 20 == 0) {
      fireball = createSprite(player.x, player.y)
      fireball.velocityX = 10
      fireball.addImage(flame_obstacle)
      fireballGroup.add(fireball)
    }

  }

}

function spawnEnemy() {
  if (frameCount % 60 == 0) {
    enemy = createSprite(width, Math.round(random(50, height - 150)));
    enemy.addImage(enemyimg)
    enemy.scale = 0.5
    enemy.velocityX = -7

    enemyGroup.add(enemy)
  }
}


function nextlevelpopup(){
  swal({
    title: "Congratulations!!! You have successfully completed level 1!",
    text: "Now, dive into level 2 and get another step closer to locating the missing Avengers and Nick Fury, Just click on the button below!",
    textAlign: "center",
    imageUrl: "assets/captain_america.png",
    imageSize: "200x200",
    confirmButtonText: "Start Level 2!",
    confirmButtonColor: "blue",
  },
    function () {
      gameState = "level2"
    }
  )
}

//level 2
function spawnReward2() {
  if (frameCount % 200 == 0) {
    reward = createSprite(
      Math.round(random(10, width - 100)),
      Math.round(random(50, height - 100)),
      50,
      50
    );
    reward.addImage(fuelimg);
    reward.scale = 0.5;

   rewardGroup2.add(reward);
  }
}

function spawnEnemy2() {
  if (frameCount % 60 == 0) {
    enemy2 = createSprite(width, Math.round(random(50, height - 150)));
    // enemy2.addImage(enemyimg2)
    enemy2.scale = 0.5;
    enemy2.velocityX = -7;

    rand1 = Math.round(random(1, 3));

    switch (rand1) {
      case 1:
        enemy2.addImage(enemyimg2);
        break;

      case 2:
        enemy2.addImage(enemyimg3);
        break;
      case 3:
        enemy2.addImage(enemyimg);
        break;

      default:
        break;
    }

    enemyGroup2.add(enemy2);
  }
}

function winpopup() {
  swal(
    {
      title: "Congratulations!!! You have successfully completed level 1!",
      text: "Now, dive into level 2 and get another step closer to locating the missing Avengers and Nick Fury, Just click on the button below!",
      textAlign: "center",
      imageUrl: "assets/captain_america.png",
      imageSize: "200x200",
      confirmButtonText: "Start Level 2!",
      confirmButtonColor: "blue",
    },
    function (isConfirm) {
      if (isConfirm) {
        score1 = 0;
        health1 = 200;
        maxhealth1 = 200;
        gameState = "wait";
        location.reload();
      }
    }
  );
}



function movement() {
  if (keyDown("RIGHT")) {
    player.x += 5;
  }
  if (keyDown("DOWN")) {
    player.y += 5;
  }
  if (keyDown("UP")) {
    player.y -= 5;
  }
  if (keyDown("LEFT")) {
    player.x -= 5;
  }

  if (keyDown("space")) {

    if (frameCount % 20 == 0) {
      fireball = createSprite(player.x, player.y)
      fireball.velocityX = 10
      fireball.addImage(flame_obstacle)
      fireballGroup.add(fireball)
    }

  }

}
