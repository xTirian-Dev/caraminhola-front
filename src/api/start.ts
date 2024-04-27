import axios from "axios";

export const start = async () => {
  console.log(import.meta.env.API_PATH)
  const response = await axios.post(
    `${import.meta.env.VITE_API_PATH}caraminhola/game`
  );
  return response.data;
};
