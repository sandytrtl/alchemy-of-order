function setup() {
  createCanvas(1100, 700);
  createTestLevel();
}

function draw() {
  background(60, 40, 80);
  drawVials();
  drawHUD();
  drawButtons();



  if (levelCompleted) {
    drawLevelComplete();
  }
}

function drawHUD() {
  push();

  fill(255);
  noStroke();
  textSize(18);
  textAlign(LEFT, TOP);
    // Stars (placeholder)
  textAlign(RIGHT, TOP);
  text(`Stars: ${stars}`, width - 20, 20);
  text(`Moves: ${moveCount}`, 90, 20);
  text(`Undo left: ${undoUsesLeft}`, 109, 45);

  pop();
}

function drawButtons() {
  push();

  // Undo button
  fill(80);
  rect(20, height - 60, 120, 40, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text('UNDO', 20 + 60, height - 40);

  // Restart button
  fill(80);
  rect(width - 140, height - 60, 120, 40, 8);
  fill(255);
  text('RESTART', width - 80, height - 40);

  pop();
}



function drawLevelComplete() {
  push(); // save drawing state

  fill(255);        // force white text
  noStroke();       // text should not have stroke
  textAlign(CENTER, CENTER);

  textSize(36);
  text('LEVEL COMPLETE', width / 2, height / 2 - 30);

  textSize(22);
  text(`Stars: ${stars}`, width / 2, height / 2 + 20);

  pop(); // restore previous drawing state
}


function mousePressed() {
  if (levelCompleted) return;

  // Undo button
  if (
    mouseX > 20 &&
    mouseX < 140 &&
    mouseY > height - 60 &&
    mouseY < height - 20
  ) {
    undoMove();
    return;
  }

  // Restart button
  if (
    mouseX > width - 140 &&
    mouseX < width - 20 &&
    mouseY > height - 60 &&
    mouseY < height - 20
  ) {
    createTestLevel();
    return;
  }

  // Vial clicks
  for (let vial of vials) {
    if (isMouseOverVial(vial)) {
      handleVialClick(vial);
      break;
    }
  }
}




function keyPressed() {
  if (key === 'Z' || key === 'z') {
    undoMove();
    console.log('Undo used');
  }
}


