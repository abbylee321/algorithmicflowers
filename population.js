// A class to describe a population of flowers


// Create the population
class Population {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    this.num = num;

    // make the population
    this.haveBabies(this.num);

  }

  // Set all the x and y values on a grid and display
  display() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].display();
    }
  }

  // Are we rolling over any of the flowers?
  rollover(mx, my) {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
    }
  }

  haveBabies(num) {
    let cols = floor(this.num / 3);
    let rows = floor(this.num / 5);
    console.log(cols)
    let colSpacing = windowWidth * 0.166;
    let rowSpacing = windowHeight * 0.3;
    console.log(windowHeight);
    for (var i = 0; i < cols; i++) {
      var x = colSpacing /2  + colSpacing * i;
      for (var j = 0; j < rows; j++) {
        var index = i * rows + j;
        var y = rowSpacing /2 + rowSpacing * j;
        this.population.push(new Flower(new DNA(), x, y));
      }
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      var n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      var m = floor(random(this.matingPool.length));
      var d = floor(random(this.matingPool.length));
      // Pick two parents
      var mom = this.matingPool[m];
      var dad = this.matingPool[d];
      // Get their genes
      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();
      // Mate their genes
      var child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      
      // Fill the new population with the new child
      this.population[i].dna = child;
      
    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  }
}