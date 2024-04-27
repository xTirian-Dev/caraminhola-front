import axios from "axios";
import { CardModel } from "../models/card";

const addNewWordApi = async (word: string, currendCardId: string): Promise<CardModel> => {
  const response = await axios.post(`${import.meta.env.VITE_API_PATH}caraminhola/new-word`, { newWord: word, currentWordId: currendCardId});
  return response.data;
}

export default addNewWordApi;