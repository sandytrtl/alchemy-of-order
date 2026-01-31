// src/sketch.js

function preload() {
  // Load level data before setup
  loadLevelsData();
}

function setup() {
  createCanvas(1100, 700);
  
  initializeGame();
  loadProgress();
  loadLevel(0);
}

function draw() {
  background(60, 40, 80);

  if (currentScreen === SCREEN.GAME) {
    drawGameScreen();
  } else if (currentScreen === SCREEN.LEVEL_COMPLETE) {
    drawLevelCompleteScreen();
  } else if (currentScreen === SCREEN.LEVEL_SELECT) {
    drawLevelSelectScreen();
  }
}

function drawGameScreen() {
  // Draw all vials
  for (let vial of vials) {
    vial.draw(vial === selectedVial);
  }

  drawHUD();
  drawButtons();
  drawHamburgerButton();
}

// ===== MOUSE HANDLING =====

function mousePressed() {
  // LEVEL SELECT SCREEN
  if (currentScreen === SCREEN.LEVEL_SELECT) {
    handleLevelSelectClick();
    return;
  }

  // LEVEL COMPLETE SCREEN
  if (currentScreen === SCREEN.LEVEL_COMPLETE) {
    handleLevelCompleteClick();
    return;
  }

  // GAME SCREEN
  if (currentScreen === SCREEN.GAME) {
    handleGameClick();
  }
}

function handleGameClick() {
  if (levelCompleted) return;

  // Hamburger button
  if (mouseX > 20 && mouseX < 60 && mouseY > 80 && mouseY < 120) {
    currentScreen = SCREEN.LEVEL_SELECT;
    return;
  }

  // Add Empty Vial button
  if (mouseX > 160 && mouseX < 320 && mouseY > height - 60 && mouseY < height - 20) {
    buyEmptyVial();
    return;
  }

  // Undo button
  if (mouseX > 20 && mouseX < 140 && mouseY > height - 60 && mouseY < height - 20) {
    undoMove();
    return;
  }

  // Restart button
  if (mouseX > width - 140 && mouseX < width - 20 && mouseY > height - 60 && mouseY < height - 20) {
    loadLevel(currentLevelIndex);
    return;
  }

  // Vial clicks
  for (let vial of vials) {
    if (vial.isMouseOver()) {
      handleVialClick(vial);
      break;
    }
  }
}

function handleLevelCompleteClick() {
  // Continue button
  if (
    mouseX > width / 2 - 100 &&
    mouseX < width / 2 + 100 &&
    mouseY > height / 2 + 40 &&
    mouseY < height / 2 + 90
  ) {
    saveProgress();
    loadLevel(currentLevelIndex + 1);
    currentScreen = SCREEN.GAME;
  }
}

function handleLevelSelectClick() {
  // Back button
  if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 60) {
    currentScreen = SCREEN.GAME;
    return;
  }

  // Level buttons
  for (let btn of levelButtonRects) {
    if (
      btn.unlocked &&
      btn.levelIndex < LEVELS.length &&
      mouseX > btn.x &&
      mouseX < btn.x + btn.size &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.size
    ) {
      loadLevel(btn.levelIndex);
      currentScreen = SCREEN.GAME;
      return;
    }
  }
}

// ===== KEYBOARD HANDLING =====

function keyPressed() {
  // Z for undo
  if (key === 'Z' || key === 'z') {
    undoMove();
  }

  // R to reset save data (for testing)
  if (key === 'R') {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
}