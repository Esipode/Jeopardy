import { useState, useEffect } from "react";
import Board from "../components/Board";
import Editor from "../components/Editor";
import Scoreboard from "../components/Scoreboard";
import { defaultGameData } from "../utils/data";
import { saveGameState, loadGameState } from "../utils/storage";
import ResetAnswers from "../components/ResetAnswers";
import { useNavigate, useSearchParams } from "react-router-dom";

const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "editor";

  const switchMode = (newMode: "editor" | "play") => {
    const currentParams = new URLSearchParams(window.location.search);

    // Remove mode first to ensure order
    currentParams.delete("mode");

    // Manually reconstrust string with mode first
    const newParams = `mode=${newMode}&${currentParams.toString()}`;

    setSearchParams(new URLSearchParams(newParams), { replace: true });
  };

  const [gameState, setGameState] = useState(() => {
    return loadGameState() || defaultGameData;
  });

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleSelect = (catIndex: number, qIndex: number) => {
    const newData = JSON.parse(JSON.stringify(gameState));
    newData.categories[catIndex].questions[qIndex].revealed = true;
    setGameState(newData);
  };

  return (
    <div className="game">
      <div className="mode-buttons-container">
        <button
          className={`mode-switch-button ${
            mode === "editor" ? "play-button" : "edit-button"
          }`}
          onClick={() => switchMode(mode === "editor" ? "play" : "editor")}
        >
          {mode === "editor" ? "Play" : "Edit"}
        </button>
        {mode === "editor" ? (
          <ResetAnswers data={gameState} setData={setGameState} />
        ) : null}
      </div>
      {mode === "editor" ? (
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
