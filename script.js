var cargando = document.getElementById('cargando');
var intro = document.getElementById('intro');
var disc = document.getElementById('disc');
var catalogue = document.getElementById('catalogue');
var xmas = document.getElementById('11');
var dans = document.getElementById('12');
var gnos = document.getElementById('13');
var ness = document.getElementById('14');
var sand = document.getElementById('21');
var hall = document.getElementById('22');
var pump = document.getElementById('23');
var hagg = document.getElementById('24');
var btn = document.getElementById('play');
var ui = document.getElementById('ui');
var existence = false;
var playable = false;
var christmas;
var danse;
var metallica;
var satie;
var halloween;
var minecraft;
var pavarotti;
var pumpit;
var base;
var song;
var amp;
var vol;
var r;

var volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    playable = false;
    ui.src = 'imagenes/play.png';
  } else {
    playable = true;
    ui.src = 'imagenes/pause.png';
  }
  play();
}

function play(){
  if (playable) {
    song.play();
  } else {
    if (song.isPlaying()) {
      song.pause();
    }
  }
}

// Parar cuando oprime espacio
document.addEventListener('keydown', () => {
  if (event == 32){
    toggleSong();
  }}, false)

btn.addEventListener('click', toggleSong);

disc.addEventListener('click', ()=> {
  catalogue.style.zIndex = 7;
  intro.style.zIndex = -1;
})

xmas.addEventListener('click', () => {
  song = christmas;
  existence = true;
  catalogue.style.zIndex = -1;
});

dans.addEventListener('click', () => {
  song = danse;
  existence = true;
  catalogue.style.zIndex = -1;
  console.log('danse');
});

gnos.addEventListener('click', () => {
  song = satie;
  existence = true;
  catalogue.style.zIndex = -1;
});

ness.addEventListener('click', () => {
  song = pavarotti;
  existence = true;
  catalogue.style.zIndex = -1;
});

sand.addEventListener('click', () => {
  song = metallica;
  existence = true;
  catalogue.style.zIndex = -1;
});

hall.addEventListener('click', () => {
  song = halloween;
  existence = true;
  catalogue.style.zIndex = -1;
});

pump.addEventListener('click', () => {
  song = pumpit;
  existence = true;
  catalogue.style.zIndex = -1;
});

hagg.addEventListener('click', () => {
  song = minecraft;
  existence = true;
  catalogue.style.zIndex = -1;
});



function preload() {
  christmas = loadSound('sound/Christmas.mp3');
  danse = loadSound('sound/Danse macabre.mp3');
  metallica = loadSound('sound/Enter sandman.mp3');
  satie = loadSound('sound/Gnossiene.mp3');
  halloween = loadSound('sound/Halloween.mp3');
  minecraft = loadSound('sound/Haggstrom.mp3');
  pavarotti = loadSound('sound/Nessun dorma.mp3');
  pumpit = loadSound('sound/Pump it.mp3');
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  amp = new p5.Amplitude();
  cargando.style.zIndex = '-1'
  intro.style.zIndex = '6'
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

function calc() {
  if (vol<=0.1){
    r = vol*900;
  } else {
    r = 0.7517*950*vol;
  }
}

function draw() {
  console.log(existence)
  if (existence && song!==undefined){
    var opacity = 75;
    base = 25;
    vol = amp.getLevel();
    volhistory.push(vol);
    background(0);
    stroke(255);
    strokeWeight(2);
    noFill();
    translate(310, 100);
    if (song.isPlaying()) {
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


      translate(100, 100)

      stroke(255);
      strokeWeight(2);
      shape();

      stroke(150, 255, 155, opacity)
      strokeWeight(5);
      shape();
    }
  }
}
