import { GameData } from "../../../utils/data";

type Props = {
  data: GameData;
  onUpdate: (data: GameData) => void;
};

const Players = ({ data, onUpdate }: Props) => {
  const addPlayer = () => {
    onUpdate({
      ...data,
      players: [
        ...data.players,
        { name: `Placeholder Player ${data.players.length + 1}`, score: 0 },
      ],
    });
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...data.players];
    newPlayers.splice(index, 1);
    onUpdate({ ...data, players: newPlayers });
  };

  return (
    <div className="inputs-wrapper">
      <h3>Players</h3>
      {data.players.map((player, i) => (
        <div key={`player-${i}`} className="input-group">
          <div className="input-wrapper" label-attr={`Player #${i + 1}`}>
            <input
              value={player.name}
              onChange={(e) => {
                const newPlayers = [...data.players];
                newPlayers[i].name = e.target.value;
                onUpdate({ ...data, players: newPlayers });
              }}
            />
            <button onClick={() => removePlayer(i)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="add-player-button" onClick={addPlayer}>
        Add Player
      </button>
    </div>
  );
};

export default Players;
