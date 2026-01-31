// src/constants.js

// Save/Storage
const SAVE_KEY = 'alchemy_of_order_save_v1';

// Vial dimensions
const VIAL_CAPACITY = 4;
const VIAL_WIDTH = 70;
const VIAL_HEIGHT = 220;
const LAYER_HEIGHT = VIAL_HEIGHT / VIAL_CAPACITY;
const BASE_Y = 450;

// UI
const TOTAL_LEVELS = 100;
const COINS_PER_VIAL = 5;

// Potion colors
const POTION_COLORS = {
  RED: '#e74c3c',
  BLUE: '#3498db',
  GREEN: '#2ecc71',
  PURPLE: '#9b59b6',
  YELLOW: '#f1c40f',
  ORANGE: '#e67e22',    // NEW
  PINK: '#ff69b4',       // NEW
  CYAN: '#00bcd4',       // NEW
  LIME: '#cddc39',       // NEW
  MAGENTA: '#e91e63'     // NEW
};

// Screen states
const SCREEN = {
  GAME: 'game',
  LEVEL_COMPLETE: 'level_complete',
  LEVEL_SELECT: 'level_select',
};