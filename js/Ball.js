Ball = function(game) {
  this.game = game;
  this.sprite = null;
  this.ballSpeed = 500;
  this.ballReleased = false;
};

Ball.prototype = {
  preload: function() {
    game.load.image('ball','assets/ball.png')
  },
  create: function() {
    this.sprite = game.add.sprite(player.sprite.x, player.sprite.y - 16, 'ball');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1,1);

    this.game.input.onDown.add(this.setBall, this);
  },
  setBall: function() {
    if (player.ballOnPaddle)
      player.serveBall();
    else if (computerPlayer.ballOnPaddle)
      computerPlayer.serveBall();

    introText.visible = false
  },
}
