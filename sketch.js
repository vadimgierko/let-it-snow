// bigger / closer snow / 1000
let xs = [];
let ys = [];
// middle snow / 1000
let xs2 = [];
let ys2 = [];
// smaller background snow / 1000
let xs3 = [];
let ys3 = [];
// trees array
let trees = [];

class Tree {

  constructor(x, y, size, greenScale) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size * 1.5;
    this.greenScale = greenScale;
  }

  draw() {
    fill(5, this.greenScale, 21);
    noStroke();
    triangle(this.x, this.y, this.x + this.w/2, this.y - this.h, this.x + this.w, this.y);
  }
}

let isLoadForTheFirstTime = true;
let isPlaying = false;
let startButton, button;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // populate snow arrays with xs & ys
    for (let i = 0; i < 1000; i++) {
        xs.push(random(windowWidth));
        ys.push(random(-windowHeight, 0));
        xs2.push(random(windowWidth));
        ys2.push(random(-windowHeight, 0));
        xs3.push(random(windowWidth));
        ys3.push(random(-windowHeight, 0));
    }

    // populate trees array
    for (let i = 0; i < 51; i++) {
        const x = random(30, windowWidth - 30);
        const y = random(windowHeight * 2/3, windowHeight - 75);
        let size = 10;
        let greenScale = 30;
        if (y < windowHeight * 2/3 + (windowHeight * 1/3) * 1/4) {
            size = size;
            greenScale = greenScale;
        } else if (y < windowHeight * 2/3 + (windowHeight * 1/3) * 2/4) {
            size = size * 1.5;
            greenScale = greenScale * 2;
        } else if (y < windowHeight * 2/3 + (windowHeight * 1/3) * 3/4) {
            size = size * 2;
            greenScale = greenScale * 3;
        } else {
            size = size * 2.5;
            greenScale = greenScale * 4;
        }
        trees.push({x, y, size, greenScale});
    }

    startButton = createButton("Press to let it snow!");
    startButton.style("background-color", color("red"));
    startButton.style("color", color("white"));
    startButton.style("width", "200px");
    startButton.style("font-size", "20px");

    // play button
    button = createButton(isPlaying ? "||" : '>');
    button.style("background-color", color("red"));
    button.style("color", color("white"));
}

function letItSnow() {

    for (let i = 0; i < 1000; i++) {
        fill("white");
        noStroke();
        ellipse(xs3[i], ys3[i], 1, 1);
        ellipse(xs2[i], ys2[i], 3, 3);
        ellipse(xs[i], ys[i], 5, 5);
    }

    let t = 10000;
    let t2 = 1000;
    let t3 = 0;
  
    for (let n = 0; n < 1000; n++) {
        if (ys3[n] < windowHeight) {
            if (isPlaying) {
              ys3[n]++;
              if (xs3[n] < windowWidth) {
                  xs3[n] += map(noise(t3), 0, 1, -1, 1);
                  t3 += 0.005;
                } else {
                  xs3[n] = 0;
                }
            }
        } else {
            ys3[n] = 0;
        }
    }

    for (let n = 0; n < 1000; n++) {
        if (ys2[n] < windowHeight) {
            if (isPlaying) {
                ys2[n] += 2;
                if (xs2[n] < windowWidth) {
                  xs2[n] += map(noise(t2), 0, 1, -1, 1);
                  t2 += 0.005;
                } else {
                  xs2[n] = 0;
                }
            }
        } else {
            ys2[n] = 0;
        }
    }

    for (let n = 0; n < 1000; n++) {
        if (ys[n] < windowHeight) {
            if (isPlaying) {
                ys[n] += 3;
                if (xs[n] < windowWidth) {
                  xs[n] += map(noise(t), 0, 1, -1, 1);
                  t += 0.03;
                } else {
                  xs[n] = 0;
                }
            }
        } else {
            ys[n] = 0;
        }
    }   
}

function drawMountains() {
    const layerNum = 3;
    const incAmount = 0.01;
    for (var l = 1; l < layerNum; l++) { // turn off first highest layer for faster rendering
        const timeMoment = 0 + l * 5000;
        const strokeColor = 25 + l * 12.5;
        const mountHeight = 100 - l * 30;
        for (var t = 0; t < incAmount * windowWidth; t += incAmount) {
            const n = noise(timeMoment + t);
            const y = map(n, 0, 1, 0, mountHeight);
            stroke(strokeColor, strokeColor, strokeColor);
            rect(t * 100, windowHeight * 2/3 - y, 1, y);
        }
    }
};

function playTune() {
    isPlaying = true;
    const tune = document.getElementById("tune");
    tune.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    tune.play();
}

function stopTune() {
    isPlaying = false;
    document.getElementById("tune").pause();
}

function startAnimation() {
    isLoadForTheFirstTime = false;
    playTune();
}

function draw() {
    background(200);
    
    //sky
    fill(8, 10, 51);
    rect(0, 0, windowWidth, windowHeight * 2/3);

    if (isLoadForTheFirstTime) {
        // start btn
        startButton.position(windowWidth/2 - startButton.width/2, windowHeight/2 - startButton.height/2);
        startButton.mousePressed(startAnimation);
    } else {
        startButton.remove();
        button.position(windowWidth - 50, 10);
        button.mousePressed(isPlaying? stopTune : playTune);
    }

    //text
    stroke("white");
    fill("red");
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(30);
    text("Let It Snow", windowWidth/2, windowHeight * 1/6);
    textSize(40);
    text("Let It Snow", windowWidth/2, windowHeight * 1/6 + 70);
    textSize(50);
    text("Let It Snow", windowWidth/2, windowHeight * 1/6 + 150);

    // mountains
    drawMountains();

    //trees
    for (let i = 0; i < trees.length; i++) {
        const tree = new Tree(trees[i].x, trees[i].y, trees[i].size, trees[i].greenScale);
        tree.draw();
    }

    noStroke()

    // footer
    fill(170);
    textStyle(NORMAL)
    textAlign(CENTER);
    textSize(17);
    text("© 2021 Vadim Gierko", windowWidth/2, windowHeight - 30);

    letItSnow();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

