import { useState, useEffect } from "react";
import { Category, GameData, Player } from "./data";

const LOCAL_STORAGE_KEY = "jeopardy_boards";

export interface GameBoard extends GameData {
  boardName: string;
  categories: Category[];
  players: Player[];
}

export const useGameState = (
  data: GameData,
  setData: (data: GameData) => void
) => {
  const [savedBoards, setSavedBoards] = useState<GameBoard[]>([]);

  useEffect(() => {
    const storedBoards = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedBoards) {
      try {
        setSavedBoards(JSON.parse(storedBoards));
      } catch (err) {
        console.error("Failed to set saved boards: ", err);
      }
    }
  }, []);

  const saveBoard = (name: string) => {
    if (!data) return;
    const newBoard = JSON.parse(JSON.stringify({ ...data, boardName: name }));
    const updatedBoards = savedBoards.map((board) =>
      board.boardName === name ? newBoard : board
    );

    // If board doesn't exist, add it
    if (!savedBoards.some((board) => board.boardName === name)) {
      updatedBoards.push(newBoard);
    }

    setSavedBoards(updatedBoards);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBoards));
  };

  const loadBoard = (name: string) => {
    const board = savedBoards.find((board) => board.boardName === name);
    if (board) {
      setData(board);
    }
  };

  const deleteBoard = (name: string) => {
    const updatedBoards = savedBoards.filter(
      (board) => board.boardName !== name
    );
    setSavedBoards(updatedBoards);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBoards));
  };

  return {
    savedBoards,
    saveBoard,
    loadBoard,
    deleteBoard,
  };
};
