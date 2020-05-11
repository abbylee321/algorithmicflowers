// The class for our "flower", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face
class Flower {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 150; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
  }

  // Display the flower
  display() {
    // We are using the flowers's DNA to pick properties for this face
    // such as: petal number, color, strokeWidth, angle
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let n = map(genes[0], 0, 1, 1, 10);
    let d = map(genes[1], 0, 1, 1, 10);
    let c = map(genes[2], 0, 1, 1, 360);
    let s = map(genes[3], 0, 1, 0, 3);

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);

    // Draw flower 
    let noiseMax = 1;
    let zoff = millis() / 4000;
    let k; 
    fill(c, 70, 100);
    stroke(0);
    strokeWeight(1); 
    
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

  // Increment fitness if mouse is rolling over flower
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}