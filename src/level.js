// src/level.js

let LEVELS = [];

// Load levels from JSON file
async function loadLevelsData() {
  try {
    const response = await fetch('../levels/levels.json');
    LEVELS = await response.json();
    console.log('Levels loaded:', LEVELS.length);
  } catch (error) {
    console.error('Failed to load levels:', error);
    // Fallback to hardcoded levels if JSON fails
    LEVELS = [
      {
        id: 1,
        expectedMoves: 6,
        vials: [
          ['RED', 'BLUE', 'RED', 'RED'],
          ['BLUE', 'RED', 'BLUE', 'BLUE'],
          [],
        ],
      },
      {
        id: 2,
        expectedMoves: 7,
        vials: [
          ['GREEN', 'RED', 'GREEN', 'BLUE'],
          ['BLUE', 'GREEN', 'RED', 'GREEN'],
          [],
        ],
      },
    ];
  }
}

// Load a specific level
function loadLevel(levelIndex) {
  if (levelIndex >= LEVELS.length) {
    console.warn('No more levels!');
    return;
  }

  const level = LEVELS[levelIndex];

  currentLevelIndex = levelIndex;
  expectedMoves = level.expectedMoves;
  moveCount = 0;
  undoUsesLeft = 5;
  undoStack = [];
  stars = 3;
  levelCompleted = false;
  coinsEarnedThisLevel = 0;

  vials = [];

  const startX = 150;
  const gap = 100;

  for (let i = 0; i < level.vials.length; i++) {
    const layers = level.vials[i].map(
      color => POTION_COLORS[color]
    );

    vials.push(
      new Vial(startX + i * gap, BASE_Y, layers)
    );
  }

  console.log('Level', levelIndex + 1, 'loaded');
}