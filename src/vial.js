// src/vial.js

class Vial {
  constructor(x, y, layers = [], type = 'normal') {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.type = type;
    this.sealed = false; 
    this.coinRewarded = false;
  }

  isEmpty() {
    return this.layers.length === 0;
  }

  isFull() {
    return this.layers.length === VIAL_CAPACITY;
  }

  topColor() {
    if (this.isEmpty()) return null;
    return this.layers[this.layers.length - 1];
  }

  isCompleted() {
    if (this.layers.length !== VIAL_CAPACITY) return false;

    const firstColor = this.layers[0];
    return this.layers.every(color => color === firstColor);
  }

  // Draw this vial on the canvas
  draw(isSelected = false) {
    // Border
    if (isSelected) {
      stroke(255, 215, 0);
      strokeWeight(3);
    } else {
      stroke(255);
      strokeWeight(1);
    }

    noFill();
    rect(this.x, this.y - VIAL_HEIGHT, VIAL_WIDTH, VIAL_HEIGHT, 10);

    // Potion layers
    noStroke();
    for (let i = 0; i < this.layers.length; i++) {
      fill(this.layers[i]);
      rect(
        this.x,
        this.y - (i + 1) * LAYER_HEIGHT,
        VIAL_WIDTH,
        LAYER_HEIGHT
      );
    }

    // Sealed lid
    if (this.sealed) {
      stroke(255, 215, 0);
      strokeWeight(5);
      fill(220, 170, 60);

      rect(
        this.x - 6,
        this.y - VIAL_HEIGHT - 30,
        VIAL_WIDTH + 12,
        16,
        8
      );
    }

    // Top line
    stroke(255);
    strokeWeight(1);
    line(
      this.x,
      this.y - VIAL_HEIGHT,
      this.x + VIAL_WIDTH,
      this.y - VIAL_HEIGHT
    );
  }

  // Check if mouse is over this vial
  isMouseOver() {
    return (
      mouseX > this.x &&
      mouseX < this.x + VIAL_WIDTH &&
      mouseY > this.y - VIAL_HEIGHT &&
      mouseY < this.y
    );
  }
}