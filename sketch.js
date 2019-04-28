var playerScore = 0;
var bird;
var pipes = [];
var img;
var gameWidth = 700;
var gameHeight = 500;
var birdHitPipes = false;
var gameOverBoolean = false;
let playerScoreFinished, startNewGameBtn;
var myCanvas;
var playPauseValue = 'Pause';
var playPauseBtn;
let bg, flappyImg;

function preload(){
    try {
        bg = loadImage('fwbg3_700x600.png');
        flappyImg = loadImage('greenBird.png');

    } catch (error){
        console.log(error);
    }
}

function setup() {
    myCanvas = createCanvas(gameWidth, gameHeight);
    myCanvas.parent('myCanvas');

    playPauseBtn = createButton(playPauseValue);
    playPauseBtn.parent('wrapper');
    playPauseBtn.mousePressed(playPauseClicked);
    startGame();
}

function playPauseClicked(){
    console.log(playPauseValue);
    if (playPauseValue == 'Pause'){
        noLoop();
        playPauseValue = 'Play';
        playPauseBtn.html(playPauseValue);
    } else if (playPauseValue == 'Play'){
        loop();
        playPauseValue = 'Pause';
        playPauseBtn.html(playPauseValue);
    } else if (playPauseValue == 'New Game'){
        playPauseValue = 'Pause';
        playPauseBtn.html(playPauseValue);
        startGame();
    }
}

function startGame() {
    delete bird;
    gameOverBoolean = false;
    birdHitPipes = false;
    pipes = [];
    playerScore = 0;

    bird = new Bird();
    pipes.push(new Pipe());
    loop();
}

//Main Draw function: runs 60 FPS
function draw() {
    c = color('#323232');
    try {
        background(bg);
    } catch (error){
        console.log(error);
        background(c);
    }
    if (!gameOverBoolean) {
        gameActive();
    } else {
        showGameOverMenu();
    }
}

function gameActive() {
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        if (!birdHitPipes) {
            pipes[i].update();

            if (pipes[i].hits(bird)) {
                console.log("Bird hit pipe");
                birdHitPipes = true;
                setTimeout(function(){
                    gameOverBoolean = true;
                    noLoop();
                },1500);
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }

            if (pipes[i].x + (pipes[i].w) == bird.x) {
                playerScore++;
            }
        }
    }

    push();
    strokeWeight(5);
    stroke(0);
    fill(255,255,240);
    textSize(36);
    text('Score: ' + playerScore, 20, 30);
    pop();

    bird.update();

    ellipseMode(CENTER);
    bird.show();
    //plane(this.diametre, this.diametre);

    if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }
}

function keyPressed() {
    if ((keyCode === UP_ARROW || key === 'w') && !birdHitPipes) {
        bird.up();
    }
}

function showGameOverMenu() {
    push();
    strokeWeight(7);
    stroke(0);
    fill(255);
    textSize(46);
    text("Your score: " + playerScore, (gameWidth / 3)-15, gameHeight / 2);
    pop();

    playPauseValue = 'New Game';
    playPauseBtn.html(playPauseValue);
}
