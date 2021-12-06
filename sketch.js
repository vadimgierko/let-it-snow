let canvasWidth;
let canvasHeight;
let xs = [];
let ys = [];
let isPlaying = false;

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < 1000; i++) {
        xs.push(random(canvasWidth));
    }

    for (let n = 0; n < 1000; n++) {
        ys.push(random(-canvasHeight, 0));
    }
}

function letItSnow() {
    //snow
    for (let i = 0; i < 1000; i++) {
        fill("white");
        noStroke();
        ellipse(xs[i], ys[i], 5, 5);
    }

    for (let n = 0; n < 1000; n++) {
        if (ys[n] < canvasHeight) {
        ys[n]++;
        } else {
        ys[n] = 0;
        }
    }
}

function playTune() {
    isPlaying = true;
    document.getElementById("tune").play();
}

function stopTune() {
    isPlaying = false;
    document.getElementById("tune").pause();
}

function draw() {
    background(220);
    
    //sky
    fill("navy");
    rect(0, 0, canvasWidth, canvasHeight * 2/3);
    
    // play button
    button = createButton(isPlaying ? "||" : '>');
    button.position(canvasWidth - 50, 10);
    button.mousePressed(isPlaying? stopTune : playTune);

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

    //snow
    for (let i = 0; i < 1000; i++) {
        fill("white");
        noStroke();
        ellipse(xs[i], ys[i], 5, 5);
    }

    for (let n = 0; n < 1000; n++) {
        if (ys[n] < canvasHeight) {
            if (isPlaying) {
                ys[n]++;
            }
        } else {
            ys[n] = 0;
        }
    }

    // footer
    fill(170);
    textStyle(NORMAL)
    textAlign(CENTER);
    textSize(17);
    text("created by Vadim Gierko | 2021", canvasWidth/2, canvasHeight - 30);
}