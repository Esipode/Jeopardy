export type JeopardyCell = {
  question: string;
  answer: string;
  value: number;
  revealed: boolean;
};

export type Category = {
  name: string;
  questions: JeopardyCell[];
};

export type Player = {
  name: string;
  score: number;
};

export type GameData = {
  categories: Category[];
  players: Player[];
};

export type DataProps = {
  data: GameData;
  setData: (data: GameData) => void;
};

export const defaultGameData: GameData = {
  categories: [],
  players: [{ name: "Placeholder Player 1", score: 0 }],
};
