let canvasWidth, canvasHeight;
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
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    fill(color);
    triangle(x, y, x + w/2, y - h, x + w, y);
  }
}

let isLoadForTheFirstTime = true;
let isPlaying = false;
let startButton;

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);

    // populate snow arrays with xs & ys
    for (let i = 0; i < 1000; i++) {
        xs.push(random(canvasWidth));
        ys.push(random(-canvasHeight, 0));
        xs2.push(random(canvasWidth));
        ys2.push(random(-canvasHeight, 0));
        xs3.push(random(canvasWidth));
        ys3.push(random(-canvasHeight, 0));
    }

    startButton = createButton("Press to let it snow!");
    startButton.style("background-color", color("red"));
    startButton.style("color", color("white"));
    startButton.style("width", "200px");
    startButton.style("font-size", "20px");
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
        if (ys3[n] < canvasHeight) {
            if (isPlaying) {
              ys3[n]++;
              if (xs3[n] < canvasWidth) {
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
        if (ys2[n] < canvasHeight) {
            if (isPlaying) {
                ys2[n] += 2;
                if (xs2[n] < canvasWidth) {
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
        if (ys[n] < canvasHeight) {
            if (isPlaying) {
                ys[n] += 3;
                if (xs[n] < canvasWidth) {
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
    background(220);
    
    //sky
    fill("navy");
    rect(0, 0, canvasWidth, canvasHeight * 2/3);

    if (isLoadForTheFirstTime) {
        // start btn
        startButton.position(canvasWidth/2 - startButton.width/2, canvasHeight/2 - startButton.height/2);
        startButton.mousePressed(startAnimation);
    } else {
        startButton.remove();
        // play button
        let button = createButton(isPlaying ? "||" : '>');
        button.position(canvasWidth - 50, 10);
        button.style("background-color", color("red"));
        button.style("color", color("white"));
        button.mousePressed(isPlaying? stopTune : playTune);
    }

    //text
    stroke("white");
    fill("red");
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(30);
    text("Let It Snow", canvasWidth/2, canvasHeight * 1/6);
    textSize(40);
    text("Let It Snow", canvasWidth/2, canvasHeight * 1/6 + 70);
    textSize(50);
    text("Let It Snow", canvasWidth/2, canvasHeight * 1/6 + 150);

    //trees
    noStroke()

    //first group
    fill("green");
    triangle(60, canvasHeight * 2/3 + 5, 88, canvasHeight * 2/3 - 40, 116, canvasHeight * 2/3 + 5);
    fill("darkgreen");
    triangle(90, canvasHeight * 2/3 + 30, 115, canvasHeight * 2/3 - 20, 140, canvasHeight * 2/3 + 30);
    fill("green");
    triangle(200, canvasHeight * 2/3 + 50, 230, canvasHeight * 2/3 - 10, 260, canvasHeight * 2/3 + 50);

    // second group of trees
    fill("green");
    triangle(canvasWidth/2 - 30, canvasHeight * 2/3 + 10, canvasWidth/2, canvasHeight * 2/3 - 40, canvasWidth/2 + 30, canvasHeight * 2/3 + 10);
    fill("darkgreen");
    triangle(canvasWidth/2 - 60, canvasHeight * 2/3 + 30, canvasWidth/2 - 30, canvasHeight * 2/3 - 20, canvasWidth/2, canvasHeight * 2/3 + 30);
    
    // third group of trees
    fill("green");
    triangle(canvasWidth - 100, canvasHeight * 2/3 + 10, canvasWidth - 70, canvasHeight * 2/3 - 40, canvasWidth - 40, canvasHeight * 2/3 + 10);
    fill("darkgreen");
    triangle(canvasWidth - 200, canvasHeight * 2/3 + 30, canvasWidth - 160, canvasHeight * 2/3 - 20, canvasWidth - 120, canvasHeight * 2/3 + 30);
    fill("green");
    triangle(canvasWidth - 240, canvasHeight * 2/3 + 50, canvasWidth - 200, canvasHeight * 2/3 - 10, canvasWidth - 160, canvasHeight * 2/3 + 50);

    // footer
    fill(170);
    textStyle(NORMAL)
    textAlign(CENTER);
    textSize(17);
    text("© 2021 Vadim Gierko", canvasWidth/2, canvasHeight - 30);

    letItSnow();
}