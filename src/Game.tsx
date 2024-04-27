import { useState, useEffect, useCallback } from "react";
import { start } from "./api/start";
import Carousel from "./assets/component/Carousel";
import getOptions from "./api/getOptions";
import "./game.css";
import { GameState } from "./models/gamestate";
import { WordResponse } from "./models/wordresponse";
import { fetchNextLevelAPI } from "./api/nextLevel";
import { CardModel } from "./models/card";
import GameOver from "./GameOver";
import Loading from "./Loading";
import AddWordButton from "./assets/component/AddNewWordModal";
import { getGameState, saveGameState } from "./assets/lib/localStorage";

const Game = () => {
  const [state, setState] = useState<GameState>({
    level: 0,
    life: 0,
    score: 0,
    time: 0,
    card: { id: "", content: "", type: "" },
    cardsOptions: [],
    alreadySelectedWords: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStart = useCallback(async () => {
    const savedState = getGameState();
    if (savedState) {
      console.log("setting state from local storage");
      console.log(savedState);
      setState(savedState);
      setIsLoading(false);
    } else {
      const response: WordResponse = await start();
      setState((prevState) => ({
        ...prevState,
        life: response.life,
        score: response.score,
        card: {
          id: response.word.id,
          content: response.word.content,
          label: response.word.label,
          description: response.word.description,
          type: response.word.type,
        },
      }));
    }
  }, []);

  const fetchCardsOptions = useCallback(async (cardId: string) => {
    const response = await getOptions(cardId);
    if (response.caraminhola) {
      setState((prevState) => ({
        ...prevState,
        cardsOptions: response.caraminhola.Caraminhola_relation,
      }));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCardClick = useCallback(
    async (card: CardModel) => {
      setIsLoading(true);
      const response = await fetchNextLevelAPI(card.id, state);
      const { updateStatus, nextWord } = response;

      setState((prevState) => ({
        ...prevState,
        level: prevState.level + 1,
        card: card,
        life: updateStatus.data.life,
        score: updateStatus.data.score,
        alreadySelectedWords: updateStatus.data.alreadySelectedWords,
        cardsOptions: nextWord.caraminhola.Caraminhola_relation,
      }));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [fetchNextLevelAPI, state]
  );

  useEffect(() => {
    fetchStart();
  }, [fetchStart]);

  useEffect(() => {
    if (state.card.id) {
      fetchCardsOptions(state.card.id);
    }
  }, [state.card.id, fetchCardsOptions]);

  useEffect(() => {
    if (state.life > 0) {
      saveGameState(state);
    }
  }, [state]);

  if (isLoading) {
    return <Loading />;
  }

  if (state.life === 0) {
    return (
      <GameOver
        score={state.score}
        alreadySelectedWords={state.alreadySelectedWords}
      />
    );
  }

  return (
    <div className="game">
      <div>Level: {state.level || 0}</div>
      <div>
        {[...Array(3)].map((_, index) => (
          <span
            key={index}
            style={{ color: index < state.life ? "red" : "black" }}
          >
            &#9829;
          </span>
        ))}
      </div>

      <div>Score: {state.score}</div>
      <div>Id: {state.card.id}</div>
      <div>Type: {state.card.type}</div>
      <div>
        <h1 style={{ textTransform: "capitalize" }}>{state.card.content}</h1>
        <span>Qual é a primeira palavra que vem a sua mente</span>
      </div>
      {state.card.label && <div>CardLabel: {state.card.label}</div>}
      {state.card.description && (
        <div>CardDescription: {state.card.description}</div>
      )}
      <Carousel cards={state.cardsOptions} onCardClick={handleCardClick} />
      <AddWordButton
        setIsLoading={setIsLoading}
        onAddNewWord={handleCardClick}
        currentCardId={state.card.id}
      />
    </div>
  );
};

export default Game;
