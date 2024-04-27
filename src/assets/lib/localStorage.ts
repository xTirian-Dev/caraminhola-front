import { GameState } from "../../models/gamestate";

// Salva o estado do jogo no localStorage
export const saveGameState = (state: GameState): void => {
  localStorage.setItem('gameState', JSON.stringify(state));
};

// Pega o estado do jogo do localStorage
export const getGameState = (): GameState | null => {
  const savedState = localStorage.getItem('gameState');
  return savedState ? JSON.parse(savedState) : null;
};

// Limpa o estado do jogo do localStorage
export const clearGameState = (): void => {
  localStorage.removeItem('gameState');
};

