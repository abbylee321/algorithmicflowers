// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;

function setup() {
  angleMode(DEGREES); 
  colorMode(HSB); 
  createCanvas(windowWidth, windowHeight);
  // colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  // let popmax = 20;
  let popmax = 16; 
  let mutationRate = 0.08; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);
  // population.haveBabies(popmax);
  // A simple button class
  button1 = createButton("evolve new generation");
  button1.mousePressed(nextGen);
  button1.position(windowWidth/2-40, windowHeight-20);
  info = createDiv('');
  info.position(20, 40);

  //reset button
  var resetButton = createButton("reset")
  resetButton.position(windowWidth/2-100, windowHeight-20)
  // resetButton.position(windowWidth/2+40, windowHeight-20);
  resetButton.mousePressed(resetSketch);
  
  function resetSketch() {
    console.log("this is working");
    population = new Population(mutationRate, popmax);
        
         
  }
}

function draw() {
  background(0);
  // translate(width / 2, height / 2); 
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  info.html("Generation #:" + population.getGenerations());
}

// If the button is clicked, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
}