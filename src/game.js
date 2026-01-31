// --- GAME CONSTANTS ---
const VIAL_CAPACITY = 4;
const VIAL_WIDTH = 70;
const VIAL_HEIGHT = 220;
const LAYER_HEIGHT = VIAL_HEIGHT / VIAL_CAPACITY;

// --- POTION COLORS ---
const POTION_COLORS = {
  RED: '#e74c3c',
  BLUE: '#3498db',
  GREEN: '#2ecc71',
  PURPLE: '#9b59b6',
  YELLOW: '#f1c40f'
};

class Vial {
  constructor(x, y, layers = [], type = 'normal') {
    this.x = x;
    this.y = y;
    this.layers = layers;
    this.type = type;
    this.sealed = false; // lid state
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
}



let vials = [];
let selectedVial = null;
let expectedMoves = 6; // per level for now
let stars = 3;
let levelCompleted = false;
let undoUsesLeft = 5;
let moveCount = 0;
let undoStack = [];

const MAX_UNDO = 5;
if (undoStack.length > MAX_UNDO) {
  undoStack.shift();
}



const BASE_Y = 450;

function createTestLevel() {
levelCompleted = false;
moveCount = 0;
undoUsesLeft = 5;
undoStack = [];
stars = 3;
vials = [
    new Vial(150, BASE_Y, [
      POTION_COLORS.RED,
      POTION_COLORS.BLUE,
      POTION_COLORS.RED,
      POTION_COLORS.RED
    ]),

    new Vial(250, BASE_Y, [
      POTION_COLORS.BLUE,
      POTION_COLORS.RED,
      POTION_COLORS.BLUE,
      POTION_COLORS.BLUE
    ]),

    new Vial(350, BASE_Y, [
      
  
]),

  ];
}



function drawVials() {
  for (let vial of vials) {
    drawVial(vial);
  }
}

// Draw all vials on the canvas
function drawVial(vial) {
  if (vial === selectedVial) {
    stroke(255, 215, 0);
    strokeWeight(3);
  } else {
    stroke(255);
    strokeWeight(1);
  }

  noFill();
  rect(vial.x, vial.y - VIAL_HEIGHT, VIAL_WIDTH, VIAL_HEIGHT, 10);

  // potion layers
  noStroke();
  for (let i = 0; i < vial.layers.length; i++) {
    fill(vial.layers[i]);
    rect(
      vial.x,
      vial.y - (i + 1) * LAYER_HEIGHT,
      VIAL_WIDTH,
      LAYER_HEIGHT
    );
  }

  // lid placeholder 
if (vial.sealed) {
  stroke(255, 215, 0);      // bright gold outline
  strokeWeight(5);
  fill(220, 170, 60);       // brighter gold fill

  rect(
    vial.x - 6,
    vial.y - VIAL_HEIGHT - 30,
    VIAL_WIDTH + 12,
    16,
    8
  );
}

line(
  vial.x,
  vial.y - VIAL_HEIGHT,
  vial.x + VIAL_WIDTH,
  vial.y - VIAL_HEIGHT
);

}




//hit detect 
function isMouseOverVial(vial) {
  return (
    mouseX > vial.x &&
    mouseX < vial.x + VIAL_WIDTH &&
    mouseY > vial.y - VIAL_HEIGHT &&
    mouseY < vial.y
  );
}

//click logic
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

//validate 
function tryPour(fromVial, toVial) {
  if (fromVial.isEmpty()) return;
  if (toVial.isFull()) return;
  if (fromVial.sealed || toVial.sealed) return;

  const movingColor = fromVial.topColor();

  if (
    toVial.isEmpty() ||
    toVial.topColor() === movingColor
  ) {
    saveState(); // save BEFORE change

    fromVial.layers.pop();
    toVial.layers.push(movingColor);

    moveCount++;

    updateCompletedVials();
    checkLevelComplete();

    console.log('Moves:', moveCount);
  }
}


//lid logic
function updateCompletedVials() {
  for (let vial of vials) {
    if (vial.isCompleted()) {
      vial.sealed = true;
    }
  }
}

//detect level completion
function checkLevelComplete() {
  for (let vial of vials) {
    if (!vial.isEmpty() && !vial.isCompleted()) {
      return;
    }
  }

  levelCompleted = true;
  calculateStars();

  console.log('LEVEL COMPLETE');
}



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








