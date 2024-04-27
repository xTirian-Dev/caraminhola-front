import axios from "axios";

const getOptions = async (id: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_PATH}caraminhola/new-level`, { id });
  return response.data;

}

export default getOptions;