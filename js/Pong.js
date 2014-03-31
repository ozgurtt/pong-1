var game = new Phaser.Game(480, 640, Phaser.AUTO, 'playScreen', { preload: preload, create: create, update: update});

var player;
var computerPlayer;

var topY = 20;
var bottomY = 620;

var ball;
var matchLimit = 3;

function preload() {

  game.load.image('background','assets/background.png')

  player = new Player(game);
  player.preload();

  computerPlayer = new ComputerPlayer(game);
  computerPlayer.preload();

  //Player Serves first
  player.ballOnPaddle = true;

  ball = new Ball(game);
  ball.preload();

}


function create() {
  // Tells the world to include walls on the the left, right but not the top and bottom
  game.physics.setBoundsToWorld(true, true, false, false);

  game.add.sprite(0, 0, 'background');

  player.create(game.world.centerX,bottomY);
  computerPlayer.create(game.world.centerX,topY);


  ball.create();

  scoreText = game.add.text(32, 550, 'Score: 0 | 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  introText = game.add.text(game.world.centerX, 400, '~ click to start ~', { font: "40px Arial", fill: "#ffffff", align: "center" });
  introText.anchor.setTo(0.5, 0.5);

  ball.sprite.events.onOutOfBounds.add(this.checkGoal, this);

}

function update() {
  player.update();
  computerPlayer.update();
  checkGoal();
}

function checkGoal() {

  if (player.score === matchLimit){
    gameOver("Player");
  }else if(computerPlayer.score === matchLimit) {
    gameOver("Computer");
  }
  else {
    if (ball.sprite.y < topY)
      player.scores();
    else if (ball.sprite.y > bottomY)
      computerPlayer.scores();

    scoreText.content = 'Score: ' + player.score + ' | ' + computerPlayer.score;
  }

}
function gameOver(playerName) {

  ball.sprite.body.velocity.setTo(0, 0);
  ball.sprite.y = player.sprite.y -16

  player.ballOnPaddle = true;
  player.score = 0;

  computerPlayer.ballOnPaddle = false;
  computerPlayer.score = 0;

  introText.content = playerName+' WINS!';
  introText.visible = true;
}
