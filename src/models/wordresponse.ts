export interface WordResponse {
  life: number;
  score: number;
  word: {
    id: string;
    content: string;
    label?: string;
    description?: string;
    type: string;

  };

}