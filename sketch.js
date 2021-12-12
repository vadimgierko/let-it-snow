// bigger / closer snow / 1000
let xs = [];
let ys = [];
// middle snow / 1000
let xs2 = [];
let ys2 = [];
// smaller background snow / 1000
let xs3 = [];
let ys3 = [];

class Tree {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size * 1.5;
    this.color = color;
  }
  draw() {
    fill(this.color);
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

    startButton = createButton("Press to let it snow!");
    startButton.style("background-color", color("red"));
    startButton.style("color", color("white"));
    startButton.style("width", "200px");
    startButton.style("font-size", "20px");

    // play button
    button = createButton(isPlaying ? "||" : '>');
    button.style("background-color", color("red"));
    button.style("color", color("white"));

    console.log(windowWidth);
    console.log(windowHeight);
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
    noStroke()

    // //first group
    // fill("green");
    // triangle(60, windowHeight * 2/3 + 5, 88, windowHeight * 2/3 - 40, 116, windowHeight * 2/3 + 5);
    // fill("darkgreen");
    // triangle(90, windowHeight * 2/3 + 30, 115, windowHeight * 2/3 - 20, 140, windowHeight * 2/3 + 30);
    // fill("green");
    // triangle(200, windowHeight * 2/3 + 50, 230, windowHeight * 2/3 - 10, 260, windowHeight * 2/3 + 50);

    // // second group of trees
    // fill("green");
    // triangle(windowWidth/2 - 30, windowHeight * 2/3 + 10, windowWidth/2, windowHeight * 2/3 - 40, windowWidth/2 + 30, windowHeight * 2/3 + 10);
    // fill("darkgreen");
    // triangle(windowWidth/2 - 60, windowHeight * 2/3 + 30, windowWidth/2 - 30, windowHeight * 2/3 - 20, windowWidth/2, windowHeight * 2/3 + 30);
    
    // // third group of trees
    // fill("green");
    // triangle(windowWidth - 100, windowHeight * 2/3 + 10, windowWidth - 70, windowHeight * 2/3 - 40, windowWidth - 40, windowHeight * 2/3 + 10);
    // fill("darkgreen");
    // triangle(windowWidth - 200, windowHeight * 2/3 + 30, windowWidth - 160, windowHeight * 2/3 - 20, windowWidth - 120, windowHeight * 2/3 + 30);
    // fill("green");
    // triangle(windowWidth - 240, windowHeight * 2/3 + 50, windowWidth - 200, windowHeight * 2/3 - 10, windowWidth - 160, windowHeight * 2/3 + 50);

    for (let i = 0; i < 15; i++) {
        const x = random(30, windowWidth - 30);
        const y = random(windowHeight * 2/3, windowHeight - 30);
        let size;
        if (y < windowHeight * 2/3 + (windowHeight * 1/3) * 1/3) {
            size = 3;
        } else if (y < windowHeight * 2/3 + (windowHeight * 1/3) * 2/3) {
            size = 5;
        } else {
            size = 7;
        }
        const tree = new Tree(x, y, size, "green");
        tree.draw();
    }
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

