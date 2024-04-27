import React from "react";
import { clearGameState } from "./assets/lib/localStorage";

interface GameOverProps {
  score: number;
  alreadySelectedWords: string[];
}

const GameOver: React.FC<GameOverProps> = ({ score, alreadySelectedWords }) => {
  const handlePlayAgain = () => {
    clearGameState()
    window.location.reload();
  };
  

  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      <p>Words you selected: {alreadySelectedWords.length}</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOver;
