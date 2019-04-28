function Pipe() {
    var pipeHeights = calculatePipeDistance();
    this.pipe1Ymax = pipeHeights[0];
    this.pipe2Ymin = pipeHeights[1];
    this.x = width;
    this.w = 40;
    this.speed = 2;

    this.highlight = false;

    this.hits = function(bird) {

        if ((bird.y - bird.radius) < this.pipe1Ymax || (bird.y + bird.radius) > this.pipe2Ymin) {
            if ((bird.x + bird.radius) > this.x && (bird.x - bird.radius) < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.show = function() {
        push();
        strokeWeight(2);
        stroke(50);
        fill(0,153,50);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.pipe1Ymax);
        rect(this.x, this.pipe2Ymin, this.w, gameHeight - this.pipe2Ymin);
        pop();
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}

function calculatePipeDistance() {
    var minPipeGap = bird.diametre * 3.5;
    var minPipeHeight = 70;

    var pipe1Ymax = minPipeHeight + random(gameHeight - (minPipeHeight * 2) - minPipeGap);
    var pipe2Ymin = pipe1Ymax + minPipeGap;
    return [pipe1Ymax, pipe2Ymin];
}
