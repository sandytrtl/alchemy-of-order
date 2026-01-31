// src/game.js

// ===== GAME STATE VARIABLES =====

let currentLevelIndex = 0;
let vials = [];
let selectedVial = null;
let expectedMoves = 6;
let stars = 3;
let levelCompleted = false;
let undoUsesLeft = 5;
let moveCount = 0;
let undoStack = [];
let totalCoins = 0;
let coinsEarnedThisLevel = 0;
let levelProgress = [];
let currentScreen = SCREEN.GAME;

// ===== INITIALIZATION =====

function initializeGame() {
  // Initialize level progress for all 100 levels
  levelProgress = [];
  for (let i = 0; i < TOTAL_LEVELS; i++) {
    levelProgress.push({
      unlocked: i === 0, // Only level 1 unlocked at start
      stars: 0
    });
  }
}

// ===== VIAL INTERACTION =====

function handleVialClick(vial) {
  if (selectedVial === null) {
    // First click: select source vial
    if (!vial.isEmpty()) {
      selectedVial = vial;
    }
  } else {
    // Second click: try to pour
    if (vial !== selectedVial) {
      tryPour(selectedVial, vial);
    }
    selectedVial = null;
  }
}

function tryPour(fromVial, toVial) {
  if (fromVial.isEmpty()) return;
  if (toVial.isFull()) return;
  if (fromVial.sealed || toVial.sealed) return;

  const color = fromVial.topColor();

  // Target must be empty or same color
  if (!toVial.isEmpty() && toVial.topColor() !== color) return;

  // Count how many same-color layers on top
  let count = 0;
  for (let i = fromVial.layers.length - 1; i >= 0; i--) {
    if (fromVial.layers[i] === color) count++;
    else break;
  }

  const freeSpace = VIAL_CAPACITY - toVial.layers.length;
  const pourAmount = Math.min(count, freeSpace);

  if (pourAmount <= 0) return;

  saveState();

  for (let i = 0; i < pourAmount; i++) {
    fromVial.layers.pop();
    toVial.layers.push(color);
  }

  moveCount++;

  updateCompletedVials();
  checkLevelComplete();
}

// ===== UNDO SYSTEM =====

function saveState() {
  const state = vials.map(vial => ({
    layers: [...vial.layers],
    sealed: vial.sealed
  }));

  undoStack.push(state);
}

function undoMove() {
  if (undoStack.length === 0) return;
  if (undoUsesLeft <= 0) return;

  const previousState = undoStack.pop();

  for (let i = 0; i < vials.length; i++) {
    vials[i].layers = [...previousState[i].layers];
    vials[i].sealed = previousState[i].sealed;
  }

  undoUsesLeft--;
  moveCount = Math.max(0, moveCount - 1);

  console.log('Undo left:', undoUsesLeft);
}

// ===== LEVEL COMPLETION =====

function updateCompletedVials() {
  for (let vial of vials) {
    if (vial.isCompleted() && !vial.sealed) {
      vial.sealed = true;

      if (!vial.coinRewarded) {
        totalCoins += COINS_PER_VIAL;
        coinsEarnedThisLevel += COINS_PER_VIAL;
        vial.coinRewarded = true;

        console.log('+', COINS_PER_VIAL, 'coins');
      }
    }
  }
}

function checkLevelComplete() {
  for (let vial of vials) {
    if (!vial.isEmpty() && !vial.isCompleted()) {
      return;
    }
  }

  levelCompleted = true;

  calculateStars();

  // Update level progress
  if (levelProgress[currentLevelIndex]) {
    if (stars > levelProgress[currentLevelIndex].stars) {
      levelProgress[currentLevelIndex].stars = stars;
    }
  }

  // Unlock next level
  if (currentLevelIndex + 1 < TOTAL_LEVELS) {
    levelProgress[currentLevelIndex + 1].unlocked = true;
  }

  currentScreen = SCREEN.LEVEL_COMPLETE;

  console.log('LEVEL COMPLETE');
  console.log('Coins earned:', coinsEarnedThisLevel);
}

function calculateStars() {
  if (moveCount <= expectedMoves) {
    stars = 3;
  } else if (moveCount <= expectedMoves + 2) {
    stars = 2;
  } else {
    stars = 1;
  }

  console.log('Stars earned:', stars);
}

// ===== SHOP ACTIONS =====

function buyEmptyVial() {
  if (totalCoins >= 200) {
    totalCoins -= 200;

    const x = 150 + vials.length * 100;
    vials.push(new Vial(x, BASE_Y, []));

    saveProgress();
    console.log('Bought empty vial');
  }
}