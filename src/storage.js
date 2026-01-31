// src/storage.js

function saveProgress() {
  const saveData = {
    totalCoins,
    levelProgress,
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  console.log('Progress saved');
}

function loadProgress() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);

    if (data.totalCoins !== undefined) {
      totalCoins = data.totalCoins;
    }

    if (Array.isArray(data.levelProgress)) {
      levelProgress = data.levelProgress;
    }

    console.log('Progress loaded');
  } catch (e) {
    console.warn('Save data corrupted, ignoring');
  }
}