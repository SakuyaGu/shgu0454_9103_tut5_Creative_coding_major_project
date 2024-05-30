//group of all center positions
let centerXs = [70,  490,  320, 430, 240,  -20 ];
let centerYs = [70, 490,  130, 240,  430, 370];
let circle1Xs = [210, 540,  130];
let circle1Ys = [20,  350,  320];
let circle2Xs = [350, 480, 280, 20];
let circle2Ys = [540, 100, 280, 215];
let circle3Xs = [175, 385, 370,  90];
let circle3Ys = [175, 385, -15, 470];

let song;
let fft;
let numBins = 128;
let smoothing = 0.8;


function minWindowSize(){
  return min(windowWidth,windowHeight);
}

function preload() {
  song = loadSound('assets/Storyteller.flac');
}



function setup() {
  let Size = minWindowSize();
  createCanvas(Size, Size);
  
  fft = new p5.FFT(smoothing, numBins);
  song.connect(fft);

  colorMode(HSB, 255);

  background(0, 84, 121);
  
  noLoop();
}


function circleRing(centerX, centerY, freqEnergy){
  let radius = 35;
  let numRects = 20; 
  let rectWidth = 5;
  let rectHeight = 7;
  let cornerRadius = 8;
  let layerNum = freqEnergy / 30;
  let s = 5/layerNum;
  fill(freqEnergy * colorInt, freqEnergy, 255);
  stroke(0,0);
  for(let a = 0; a < layerNum; a++){

    for (let i = 0; i < numRects; i++) {
      let angle = TWO_PI / numRects * i;
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;
     
      push();
      translate(x, y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, rectWidth*s, rectHeight*s, cornerRadius);
      pop();
  }
   radius = radius + 32/layerNum;
   numRects = numRects +3;
  }
  
}

function mouseMoved() {
  // map the mouseY to a volume value between 0 and 1
  volume = map(mouseY, 0, height, 1, 0);
  song.setVolume(volume);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
    loop();
  }
}



function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles, freqEnergy) {
  let step = maxDiameter / numCircles;
  let e = freqEnergy * colorInt;
  for (let i = 0; i < numCircles; i++) {
    let diameter = maxDiameter - i * step;
    let offsetX = random(-1, 1);
    let offsetY = random(-1, 1);
    if(i<6){
      fill(e, e * 2, e * 3);
    }
     else{
      fill(e / 2 , e * 2, e * 3);
     } 
     stroke(freqEnergy * colorInt * 0.3, freqEnergy, freqEnergy);
     strokeWeight(1);
    ellipse(centerX + offsetX, centerY + offsetY, diameter, diameter);
  }
}

//draw line and dots for circle1 & 2
function drawCircleDots(centerX, centerY, radius, numDots, dot, freqEnergy) {
  let angleStep = TWO_PI / numDots;
  fill(freqEnergy * colorInt * random(), 255, 255);
  noStroke();
  for (let i = 0; i < numDots; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, dot, dot); 
  }
}

function drawCircleLines(centerX, centerY, startRadius, numLines, lineLength, freqEnergy) {
  strokeWeight(1);
  for (let i = 0; i < numLines; i++) {
    let angle = TWO_PI / numLines * i;
    stroke(freqEnergy * colorInt * 10, freqEnergy * colorInt * 5, freqEnergy * colorInt * 3);
    let xStart = centerX + cos(angle) * startRadius; 
    let yStart = centerY + sin(angle) * startRadius; 
    let xEnd = centerX + cos(angle) * (startRadius + lineLength); 
    let yEnd = centerY + sin(angle) * (startRadius + lineLength); 
    line(xStart, yStart, xEnd, yEnd); 
  }
}


// circle of lines
function Circle1(centerX, centerY, freqEnergy){
  
  let baseRadius = map(freqEnergy, 0, 255, 100, 140) / 4;
  let radiusIncrement = 5;
  let numLayers = 4; 
 //circle out side
  fill(freqEnergy * colorInt * 0.25, 204, 255);
  noStroke();
  circle(centerX, centerY, map(freqEnergy, 0, 255, 100, 140));

  // circle inside
  fill(freqEnergy * colorInt  , 255 / colorInt, 255 / colorInt);
  noStroke();
  circle(centerX, centerY, map(freqEnergy, 0, 255, 100, 140) / 2);


  for (let i = 0; i < numLayers; i++) {
    drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5, freqEnergy);
    drawCircleLines(centerX, centerY, 30 + numLayers * radiusIncrement, 200, 20, freqEnergy);
  }
}

//circle of dots
function Circle2(centerX, centerY, freqEnergy) {
  let numLayers = 10;
  let initialRadius = map(freqEnergy, 0, 255, 100, 140) / 4;
  let radiusStep = 4;
  let initialNumDots = 40;
  let dotsIncrement = 6;
  fill(freqEnergy * colorInt * 3, 255, 255);
  noStroke();
  circle(centerX, centerY, map(freqEnergy, 0, 255, 100, 140) / 2);
  fill(freqEnergy * colorInt * 2, 255, 255);
  ellipse(centerX, centerY, initialRadius, initialRadius);
  for (let i = 0; i < numLayers; i++) {
    let radius = initialRadius + i * radiusStep;  
    let numDots = initialNumDots + i * dotsIncrement;  
    drawCircleDots(centerX, centerY, radius, numDots, 3, freqEnergy);
  }
}

//circle of vertex
function Circle3(centerX, centerY, freqEnergy){
  let innerRadius = map(freqEnergy, 0, 255, 50, 80) / 2;
  let outerRadius = map(freqEnergy, 0, 255, 50, 80);
  let numPoints = 120; 
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let angle = TWO_PI / numPoints * i;
    if (i % 2 == 0) {
      let x = centerX + cos(angle) * innerRadius;
      let y = centerY + sin(angle) * innerRadius;
      points.push(createVector(x, y));
    } else {
      let x = centerX + cos(angle) * outerRadius;
      let y = centerY + sin(angle) * outerRadius;
      points.push(createVector(x, y));
    }
  }
  strokeWeight(1);
  stroke(freqEnergy * colorInt * 2, freqEnergy * colorInt * 2, freqEnergy * colorInt * 3);
  noFill();
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

//pink curve
function drawPinkCurve(centerX, centerY, radius) {
  let angle = random(TWO_PI);
  let x1 = centerX + cos(angle) * radius;
  let y1 = centerY + sin(angle) * radius;
  let cp1x = centerX + cos(angle + PI / 4) * radius / 2;
  let cp1y = centerY + sin(angle + PI / 4) * radius / 2;
  stroke(255, 105, 180);
  strokeWeight(3);
  noFill();
  bezier(centerX, centerY, cp1x, cp1y, cp1x, cp1y, x1, y1);
}

function drawChain(centerX, centerY, chainRadius, numLinks) {
  let angleStep = TWO_PI / numLinks;
  for (let i = 0; i < numLinks; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * chainRadius;
    let y = centerY + sin(angle) * chainRadius;
    fill(255, 0, 255);
    stroke(0);
    strokeWeight(2.5);
    ellipse(x+1, y+1, 6, 6); 
  }
}

let colorInt = 0;
let colorCount = 0;
let flag=true;
window.setInterval(function() {  
  if(flag){
    colorCount++;
    colorInt=colorCount/255;    
  } else {
    colorCount--;
    colorInt=colorCount/255;
  }
  if(colorCount>=255){
    flag=false;
  } else if(colorCount<=0){
    flag = true
  }
    
},10)



function draw() {
  background(142.375, 215,  150);
  let Size = minWindowSize();
  scale(Size/500);
  let spectrum = fft.analyze();  
  
  for(let i = 0; i < centerXs.length; i++){
    let x = centerXs[i];
    let y = centerYs[i];
    let freqEnergy = spectrum[i % spectrum.length];      
     
    fill(freqEnergy , freqEnergy, freqEnergy);
    stroke(freqEnergy, 255, 255); 

    strokeWeight(freqEnergy * colorInt / 20);
    circle(x, y, map(freqEnergy, 0, 255, 100, 140));
  
    drawChain(x, y, map(freqEnergy, 0, 255, 50, 80), 20); 
    drawConcentricCircles(x, y, map(freqEnergy, 0, 255, 40, 60), 8, freqEnergy);
    circleRing(x, y, freqEnergy);
     
    // if (freqEnergy) {
    //   drawPinkCurve(x, y, 75);

    // }
  }

  for(let i = 0; i < circle1Xs.length; i++){
    let freqEnergy = spectrum[i % spectrum.length];
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    Circle1(x, y, freqEnergy);
    drawChain(x, y, map(freqEnergy, 0, 255, 50, 80), 15);

    // if (freqEnergy) {
    //   drawPinkCurve(x, y, map(freqEnergy, 0, 255, 50, 80));
    // }
  }

  for(let i = 0; i < circle2Xs.length; i++){
    let freqEnergy = spectrum[i % spectrum.length];
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x, y, freqEnergy);
    drawChain(x, y, map(freqEnergy, 0, 255, 50, 80), 20);

    // if (freqEnergy) {
    //   drawPinkCurve(x, y, 75);
    // }
  }

  for (let i = 0; i < circle3Xs.length; i++) {
    let freqEnergy = spectrum[i % spectrum.length];
    let x = circle3Xs[i];
    let y = circle3Ys[i];
    fill(freqEnergy * colorInt * 0.25, 255, 255);
    circle(x, y, map(freqEnergy, 0, 255, 50, 80) * 2);
    Circle3(x, y, freqEnergy);
    drawConcentricCircles(x, y, map(freqEnergy, 0, 255, 50, 80), 5, freqEnergy);

    // if (freqEnergy) {
    //   drawPinkCurve(x, y, map(freqEnergy, 0, 255, 50, 80));
    // }
  }
}

function windowResized(){
  let Size = minWindowSize();
  resizeCanvas(Size, Size);
}
