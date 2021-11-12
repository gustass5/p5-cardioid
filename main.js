const screen = 800;
const radius = screen / 2;
let points = 200;
let level = 2;
let additive = 0.01;

let colorWeight, color1, color2;

let playing = false;
const audio = document.querySelector("audio");

window.addEventListener("click", () => {
  if (playing) {
    audio.pause();
  } else {
    audio.play();
  }
  playing = !playing;
});

function setup() {
  createCanvas(screen, screen);
  color1 = color(255, 255, 255);
  color2 = color(random(255), random(255), random(255));
  colorWeight = 0;
}

function draw() {
  background(0);

  if (!playing) {
    textSize(32);
    fill(255);
    textAlign(CENTER);
    text("Press play", screen / 2, screen / 2);
    return;
  }

  stroke(lerpColor(color1, color2, colorWeight));

  colorWeight += 0.01;
  if (colorWeight >= 1) {
    colorWeight = 0.0;
    color1 = color2;
    color2 = color(random(255), random(255), random(255));
  }

  level += additive;
  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    let angle2 = map(i * level, 0, points, 0, TWO_PI);
    let x1 = radius * cos(angle + PI);
    let y1 = radius * sin(angle + PI);
    let x2 = radius * cos(angle2 + PI);
    let y2 = radius * sin(angle2 + PI);

    line(radius + x1, radius + y1, radius + x2, radius + y2);
  }
}
