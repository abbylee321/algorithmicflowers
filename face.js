// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for our "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face
class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    // stroke(this.color);
    this.wh = 150; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
  }

  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    //r is radius of face circle?
    // let r = map(genes[0], 0, 1, 0, 70);
    //try floor 
    let n = map(genes[0], 0, 1, 1, 10);
    let d = map(genes[1], 0, 1, 1, 10);
    let c = map(genes[2], 0, 1, 1, 360);
    // console.log(genes[2]); 
    let s = map(genes[3], 0, 1, 0, 3);
     // let eye_y = map(genes[4], 0, 1, 0, 5);
    // console.log("left eye is: " + eye_y);

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    // noStroke();

    // Draw flower 
    let noiseMax = 1;
    // let phase = 0;
    let zoff = millis() / 5000;
    let k; 
    fill(c, 70, 100);
    stroke(0);
    strokeWeight(1); 
    // strokeWeight(s);
    
    beginShape();
    for (let i = 0; i < 361; i++) {
      let xoff = map(cos(i), -1, 1, 0, noiseMax);
      let yoff = map(sin(i), -1, 1, 0, noiseMax);
      let k = i * d;
      let r = 100 * noise(xoff, yoff, zoff) * (sin(n * k));;
      let x = r * cos(k);
      let y = r * sin(k);
      vertex(x, y);
    }

    
    endShape();
    // phase += 0.01;
    zoff += 0.005;
    // noLoop(); 

    // Draw the bounding box
    stroke(30);
    if (this.rolloverOn) fill(360, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    fill(360, 0.75);
    text('' + floor(this.fitness), this.x, this.y + 70);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}