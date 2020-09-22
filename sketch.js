var banana_img, obstacle_img, obstaclesGroup;
var scene, scene_img, monkey_running;
var monkey, invisibleGround, bananaGroup;

var score = 0;

var count = 0;

function preload() {
  scene_img = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  banana_img = loadImage("Banana.png");

  obstacle_img = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);

  scene = createSprite(300, 150, 600, 300);
  scene.addImage(scene_img);

  monkey = createSprite(75, 200, 10, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.scale = 0.2;

  invisibleGround = createSprite(300, 355, 600, 20);
  invisibleGround.visible = false;

  bananaGroup = new Group();

  obstaclesGroup = new Group();
}

function draw() {
  background("white");

  scene.velocityX = -(2 + score / 200);

  score = score + Math.round(getFrameRate() / 60);

  if (scene.x < 300) {
    scene.x = scene.width / 2;
  }

  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -16;
  }

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    count = count + 1;
    if (count >= 2 && count < 4) {
      monkey.scale = 0.3;
    } else if (count >= 4 && count < 6) {
      monkey.scale = 0.4;
    } else if (count >= 6 && count < 8) {
      monkey.scale = 0.5;
    } else if (count >= 8) {
      monkey.scale = 0.6;
    }
  } else if (obstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.2;
    count = 0;
  }

  spawnBananas();
  spawnObstacles();

  monkey.velocityY = monkey.velocityY + 0.7;

  monkey.collide(invisibleGround);


  drawSprites();

  textSize(30);
  fill("white");
  text("Score: " + score, 6, 30);

  textSize(30);
  fill("white");
  text("Banana", 375, 30);
  text("Power", 375, 60);
  text(": " + count, 480, 50);
}

function spawnBananas() {
  if (frameCount % 250 === 0) {
    var banana = createSprite(600, 200, 200, 200);
    banana.addImage("my banana", banana_img);
    banana.scale = 0.05;
    banana.velocityX = -(2 + score / 200);
    bananaGroup.add(banana);
    //banana.debug = true;
    banana.setCollider("circle", 0, 0, 200);
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 315, 200, 200);
    obstacle.addImage("my stone", obstacle_img);
    obstacle.scale = 0.125;
    obstacle.velocityX = -(2 + score / 200);
    obstaclesGroup.add(obstacle);
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 150);
    obstacle.lifetime = 300;
  }
}