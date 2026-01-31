// src/ui.js

let levelButtonRects = [];

// ===== GAME SCREEN UI =====

function drawHUD() {
  push();

  fill(255);
  noStroke();
  textSize(18);

  // Right side: stars + coins
  textAlign(RIGHT, TOP);
  text(`Stars: ${stars}`, width - 20, 20);
  text(`Coins: ${totalCoins}`, width - 20, 45);

  // Left side: moves + undo
  textAlign(LEFT, TOP);
  text(`Moves: ${moveCount}`, 20, 20);
  text(`Undo left: ${undoUsesLeft}`, 20, 45);

  pop();
}

function drawButtons() {
  push();

  // Add Empty Vial button
  fill(totalCoins >= 200 ? 80 : 50);
  rect(160, height - 60, 160, 40, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('+ EMPTY VIAL (200)', 160 + 80, height - 40);

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

function drawHamburgerButton() {
  push();

  fill(80);
  rect(20, 80, 40, 40, 8);

  stroke(255);
  strokeWeight(2);

  line(30, 92, 50, 92);
  line(30, 102, 50, 102);
  line(30, 112, 50, 112);

  pop();
}

// ===== LEVEL COMPLETE SCREEN =====

function drawLevelCompleteScreen() {
  push();

  // Overlay
  fill(0, 0, 0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(32);
  text('LEVEL COMPLETE', width / 2, height / 2 - 140);

  // Stars
  textSize(24);
  text(`Stars: ${stars}`, width / 2, height / 2 - 90);

  // Coins
  textSize(22);
  text(`You got +${coinsEarnedThisLevel} coins`, width / 2, height / 2 - 40);

  // Continue button
  fill(120, 60, 200);
  rect(width / 2 - 100, height / 2 + 40, 200, 50, 12);

  fill(255);
  textSize(20);
  text('CONTINUE', width / 2, height / 2 + 65);

  pop();
}

// ===== LEVEL SELECT SCREEN =====

function drawLevelSelectScreen() {
  push();

  background(230, 220, 240);

  fill(80);
  textAlign(CENTER, TOP);
  textSize(28);
  text('LEVELS', width / 2, 30);

  drawLevelButtons();
  drawBackButton();

  pop();
}

function drawLevelButtons() {
  levelButtonRects = [];

  const cols = 8;
  const size = 60;
  const startX = 80;
  const startY = 120;
  const gap = 20;

  for (let i = 0; i < TOTAL_LEVELS; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = startX + col * (size + gap);
    const y = startY + row * (size + gap);

    const progress = levelProgress[i];
    const unlocked = progress ? progress.unlocked : false;

    // Base button
    if (unlocked) {
      fill(255);
    } else {
      fill(180); // dimmed
    }

    stroke(150);
    rect(x, y, size, size, 10);

    // Level number
    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(i + 1, x + size / 2, y + size / 2);

    // Overlay for locked levels
    if (!unlocked) {
      fill(0, 0, 0, 100);
      rect(x, y, size, size, 10);
    }

    levelButtonRects.push({
      x,
      y,
      size,
      levelIndex: i,
      unlocked
    });
  }
}

function drawBackButton() {
  fill(80);
  rect(20, 20, 100, 40, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text('BACK', 70, 40);
}