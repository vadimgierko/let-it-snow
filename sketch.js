function preload() {
    // Load the image and create a p5.Image object.
    bg_img = loadImage('zima__winter_267_snieg__domy__swiatla__noc__gory.jpg');
    // img source: https://www.tapeteos.pl/details.php?image_id=67262&big=1
}

//=============================== CONSTS ===================================//
const H_RATIO = 0.5625;
const W_RATIO = 1.77;

function showBgImg() {
    if (windowWidth <= windowHeight * W_RATIO) {
        return image(
            bg_img,
            // x
            windowWidth / 2 - windowHeight * W_RATIO / 2,
            // y
            0,
            // img width
            windowHeight * W_RATIO,
            // img height
            windowHeight);
    }

    image(
        bg_img,
        // x
        0,
        // y
        windowHeight / 2 - windowWidth * H_RATIO / 2,
        // img width
        windowWidth,
        // img height
        windowWidth * H_RATIO);
}

function showLetItSnowText() {
    stroke("red");
    fill("white");
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(30);
    text("Let It Snow", windowWidth / 2, windowHeight * 1 / 6);
    textSize(40);
    text("Let It Snow", windowWidth / 2, windowHeight * 1 / 6 + 70);
    textSize(50);
    text("Let It Snow", windowWidth / 2, windowHeight * 1 / 6 + 150);
}

//============================ INIT VARIABLES: =============================//

let repoLink;
let footerP;
// SNOW

// bigger / closer snow / 1000
let xs = [];
let ys = [];
// middle snow / 1000
let xs2 = [];
let ys2 = [];
// smaller background snow / 1000
let xs3 = [];
let ys3 = [];

let isLoadForTheFirstTime = true;
let isPlaying = false;
let startButton, playPauseButton;

function createStartButton() {
    startButton = createButton("▶");

    startButton.style("background-color", color("red"));
    startButton.style("color", color("white"));
    startButton.style("width", "70px");
    startButton.style("height", "70px");
    startButton.style("font-size", "50px");
}

function removeStartButton() {
    startButton.remove();
}

function showPlayPauseButton() {
    playPauseButton = createButton(isPlaying ? "⏸" : "▶");

    playPauseButton.style("background-color", color("red"));
    playPauseButton.style("color", color("white"));

    playPauseButton.position(50, 10);
    playPauseButton.mousePressed(isPlaying ? stopTune : playTune);
}

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

    createStartButton();

    footerP = createP(`<span style="color: white">© 2021-2024 Vadim Gierko | </span><a style="color: white" href="https://github.com/vadimgierko/let-it-snow" target="_blank">see the code</a>`)
}

function showFooter() {
    noStroke();

    fill("white");
    textStyle(NORMAL);
    textAlign(CENTER);
    textSize(17);
    footerP.position(windowWidth / 2, 0)
    footerP.center("horizontal");
    text("background image source: https://www.tapeteos.pl/details.php?image_id=67262&big=1", windowWidth / 2, windowHeight - 30);
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

function playTune() {
    isPlaying = true;
    const tune = document.getElementById("tune");
    tune.addEventListener('ended', function () {
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
    showBgImg();

    if (isLoadForTheFirstTime) {
        // show & position start btn in the center:
        startButton.position(windowWidth / 2 - startButton.width / 2, windowHeight / 2 - startButton.height / 2);
        // listen to startButton clicked to start animation:
        startButton.mousePressed(startAnimation);
    } else {
        removeStartButton();
        showPlayPauseButton();
    }

    showLetItSnowText();

    showFooter();

    letItSnow();
}

// Always resize the canvas to fill the browser window.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}