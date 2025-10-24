// src/utils/quizStorage.ts
export const STORAGE_KEY = (token: string) => `quiz_progress_${token}`;

export const loadProgress = (token: string) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY(token));
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("loadProgress error", err);
    return null;
  }
};

export const saveProgress = (token: string, data: any) => {
  try {
    localStorage.setItem(STORAGE_KEY(token), JSON.stringify(data));
  } catch (err) {
    console.error("saveProgress error", err);
  }
};

export const clearProgress = (token: string) => {
  try {
    localStorage.removeItem(STORAGE_KEY(token));
  } catch (err) {
    console.error("clearProgress error", err);
  }
};
