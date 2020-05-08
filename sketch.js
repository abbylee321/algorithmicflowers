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
  let popmax = 18; 
  let mutationRate = 0.08; 
  population = new Population(mutationRate, popmax);
  
  //RESET BUTTON 
  var resetButton = document.getElementById("reset-button");
  resetButton.onclick = function resetSketch(){
    population = new Population(mutationRate, popmax);  
    //function to reset the rectangles 
  console.log("its me hellos");
  }

  // EVOLVE BUTTON
  var evolveButton = document.getElementById("evolve-button");
  evolveButton.onclick = function nextGen() {
    population.selection();
    population.reproduction();
  }
}

function draw() {
  background(0);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  stroke(255);
}


