Player = function(game) {
  this.game = game;
  this.sprite = null;
  this.ballOnPaddle = false;
  this.score = 0;
};

Player.prototype = {
  preload: function() {
    this.game.load.image('paddle','assets/paddle.png')
    this.game.load.audio('smash', 'assets/smash.wav');
  },
  create: function(x,y) {
    this.sprite = this.game.add.sprite(x, y, 'paddle');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
    this.sprite.body.immovable = true;
    this.hit_s = this.game.add.sound('smash')
    this.hit_s.volume = 0.2;
  },
  update: function() {
    this.sprite.x = this.game.input.x;

    // Keep the paddle in the playing area
    if (this.sprite.x < 30)
      this.sprite.x = 30;
    else if (this.sprite.x > this.game.width - 30)
      this.sprite.x = this.game.width - 30;

    if (this.ballOnPaddle)
        ball.sprite.x = this.sprite.x;
    else
      this.game.physics.collide(ball.sprite, this.sprite, this.ballHitsPaddle, null, this);

  },

  scores: function() {
    this.ballOnPaddle = true;
    ball.sprite.x = this.sprite.x;

    if (this.sprite.y === bottomY)
      ball.sprite.y = this.sprite.y -16;
    else
      ball.sprite.y = this.sprite.y + 16;


    ball.sprite.body.reset();
    this.score += 1;
  },
  serveBall: function() {
    this.hit_s.play();

    ball.sprite.body.velocity.x = ball.sprite.body.velocity.x = 2 + Math.random() * 8;

    if (this.sprite.y === bottomY)
      ball.sprite.body.velocity.y = -ball.ballSpeed;
    else
      ball.sprite.body.velocity.y = ball.ballSpeed;

    this.ballOnPaddle = false;
  },
  ballHitsPaddle: function(){
    this.hit_s.play();

    var diff = 0;

    if (ball.sprite.x < this.sprite.x) {
        //If ball is in the left hand side on the racket
        diff = this.sprite.x - ball.sprite.x;
        ball.sprite.body.velocity.x = (-10 * diff);
    } else if (ball.sprite.x > this.sprite.x) {
        //If ball is in the right hand side on the racket
        diff = ball.sprite.x -this.sprite.x;
        ball.sprite.body.velocity.x = (10 * diff);
    } else {
        //The ball hit the center of the racket, let's add a little bit of a tragic accident(random) of his movement
        ball.sprite.body.velocity.x = 2 + Math.random() * 8;
    }
  },
};
