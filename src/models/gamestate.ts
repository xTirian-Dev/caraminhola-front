import { CardModel } from "./card";

export type GameState = {
  level: number;
  life: number;
  score: number;
  card: CardModel;
  cardsOptions: CardModel[];
  time: number;
  alreadySelectedWords: string[];
};