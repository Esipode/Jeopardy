import { DataProps } from "../utils/data";

import "../styles/Scoreboard.scss";

const Scoreboard = ({ data, setData }: DataProps) => {
  const updateScore = (
    index: number,
    amount: number,
    mode: "increment" | "set" = "increment"
  ) => {
    if (!isNaN(amount)) {
      const newPlayers = [...data.players];
      if (mode === "increment") {
        newPlayers[index].score += amount;
      } else if (mode === "set") {
        newPlayers[index].score = amount;
      }

      const maxScorePossible = data.categories.length * 1500;

      // Don't allow score to be negative
      if (newPlayers[index].score < 0) {
        newPlayers[index].score = 0;
      } else if (newPlayers[index].score > maxScorePossible) {
        newPlayers[index].score = maxScorePossible;
      }
      setData({ ...data, players: newPlayers });
    }
  };

  return (
    <div className="scoreboard">
      {data.players.map((player, i) => (
        <div key={i} className="player-score-container">
          <div className="score-content-wrapper">
            <span className="player-name">{player.name}</span>
            <div className="score-wrapper">
              <button
                className="score-adjust-button increment"
                onClick={() => updateScore(i, 100)}
              >
                +
              </button>

              <input
                className="score"
                type="number"
                value={player.score}
                onChange={(e) =>
                  updateScore(i, parseInt(e.target.value), "set")
                }
              />
              <button
                className="score-adjust-button decrement"
                onClick={() => updateScore(i, -100)}
                disabled={!player.score}
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
