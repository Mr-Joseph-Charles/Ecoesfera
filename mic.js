const on = document.getElementById('on');
const off = document.getElementById('off');
const button = document.getElementById('button');
var opened = false;
var soundOn;
var soundOff;
var base;
var mic;
var vol;
var r;

var volhistory = [];

circleState();

function preload() {
  soundOn = loadSound('on.mp3');
  soundOff = loadSound('off.mp3');
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
}

button.addEventListener('click', () => {
  if (!opened) {
    opened = true;
    soundOn.play();
    console.log('on')
  } else {
    opened = false;
    soundOff.play();
  }
  circleState();
  console.log(opened);
})

function circleState() {
  if (opened) {
    on.style.border = '#22BAFF 2px solid';
    on.style.fontStyle = 'italic';
    off.style.fontStyle = 'none';
    off.style.border = 'none';
  } else {
    on.style.border = 'none';
    on.style.fontStyle = 'none';
    off.style.fontStyle = 'italic';
    off.style.border = '#950BF2 2px solid';
  }
}

function calc() {
  if (vol<=0.1){
    r = vol*900;
  } else {
    r = 0.7517*950*vol;
  }
}

function shape(){
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i]*1.37, 0, 1, 10, 100) + 113;
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
}

function draw() {
  var opacity = 100;
  base = 25;
  vol = mic.getLevel([0.5]);
  volhistory.push(vol);

  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  translate(310, 100);
  if (opened) {
    calc();
    ellipse(100, 100, base + r, base + r);

    stroke(149, 11, 242, opacity);
    strokeWeight(5);
    ellipse(100, 100, base + r, base + r);


    translate(100, 100)

    stroke(255);
    strokeWeight(2);
    shape();

    stroke(150, 255, 155, opacity)
    strokeWeight(5);
    shape();
  } else {
    ellipse(100, 100, base, base);
    
    stroke(149, 11, 242, opacity);
    strokeWeight(5);
    ellipse(100, 100, base, base);
  }
}