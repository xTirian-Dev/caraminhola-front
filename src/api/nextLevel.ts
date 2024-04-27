import axios from "axios";
import { GameState } from "../models/gamestate";
import getOptions from "./getOptions";

interface FetchNextLevelAPIResponse {
  life: number
  score: number;
  time: number;
  alreadySelectedWords: string[];
}

export const fetchNextLevelAPI = async (currentCardID: string, GameState: GameState) => {
  const updateStatus = await axios.post<FetchNextLevelAPIResponse>(`${import.meta.env.VITE_API_PATH}caraminhola/game`, {
    remainLife: GameState.life,
    score: GameState.score,
    remainTime: 30,
    selectedWordNow: currentCardID,
    alreadySelectedWordsIncome: GameState.alreadySelectedWords,
  });

  const nextWord = await getOptions(currentCardID)

  return {nextWord, updateStatus};
};