import { useState, useEffect } from "react";
import Board from "../components/Board";
import Editor from "../components/Editor";
import Scoreboard from "../components/Scoreboard";
import { defaultGameData } from "../utils/data";
import { saveGameState, loadGameState } from "../utils/storage";
import ResetAnswers from "../components/ResetAnswers";

const Game = () => {
  const [gameState, setGameState] = useState(() => {
    return loadGameState() || defaultGameData;
  });
  const [showEditor, setShowEditor] = useState(true);

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleSelect = (catIndex: number, qIndex: number) => {
    const newData = { ...gameState };
    newData.categories[catIndex].questions[qIndex].revealed = true;
    setGameState(newData);
  };

  return (
    <div className="game">
      <div className="mode-buttons-container">
        <button
          className={`mode-switch-button ${
            showEditor ? "play-button" : "edit-button"
          }`}
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? "Play" : "Edit"}
        </button>
        {showEditor ? (
          <ResetAnswers data={gameState} setData={setGameState} />
        ) : null}
      </div>
      {showEditor ? (
        <Editor data={gameState} setData={setGameState} />
      ) : (
        <>
          <Scoreboard data={gameState} setData={setGameState} />
          <Board data={gameState} onShowAnswer={handleSelect} />
        </>
      )}
    </div>
  );
};

export default Game;
