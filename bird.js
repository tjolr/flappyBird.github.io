

function Bird() {

  this.y = height/2;
  this.x = 64;
  this.diametre = 32
  this.radius = this.diametre / 2;
  this.rotation = 0;

  this.gravity = 0.7;
  this.lift = -17;
  this.velocity = 0;

  this.show = function() {
    push();
    noStroke();
    ellipseMode(CENTER);
    fill(135,0,0,0);
    ellipse(this.x, this.y, this.diametre, this.diametre);
    image(flappyImg, this.x-this.radius, this.y-this.radius, this.diametre, this.diametre);
    pop();
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.down = function(){
      this.velocity -= this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.rotation = cos(this.velocity);


    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
