ComputerPlayer = function(game) {
  this.game = game;
  this.sprite = null;
  this.computerSpeed = 280;
  this.ballOnPaddle = false;
};

ComputerPlayer.prototype = new Player();

ComputerPlayer.prototype.update = function() {
  if (this.sprite.x - ball.sprite.x < -15)
    this.sprite.body.velocity.x = this.computerSpeed;
  else if (this.sprite.x - ball.sprite.x > 15)
    this.sprite.body.velocity.x = -this.computerSpeed;
  else
    this.sprite.body.velocity.x = 0;

  if (this.ballOnPaddle)
    ball.setBall();

  this.game.physics.collide(ball.sprite, this.sprite, this.ballHitsPaddle, null, this);
};
