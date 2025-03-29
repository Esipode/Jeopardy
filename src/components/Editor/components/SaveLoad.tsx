import { useMemo, useState } from "react";
import { isEqual } from "lodash";
import { DataProps } from "../../../utils/data";
import { useGameState } from "../../../utils/useGameState";

import "../../../styles/SaveLoad.scss";

const SaveLoad = ({ data, setData }: DataProps) => {
  const { savedBoards, saveBoard, loadBoard, deleteBoard } = useGameState(
    data,
    setData
  );

  const [boardName, setBoardName] = useState("");
  const [selectedLoadChoice, setSelectedLoadChoice] = useState("");

  // const isUnsaved = useMemo(() => {
  //   return !savedBoards.find((saved) => isEqual(saved, data));
  // }, [data]);
  // console.log(isUnsaved);
  return (
    <>
      <div className="saveContainer">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
        />
        <button onClick={() => saveBoard(boardName)} disabled={!boardName}>
          Save Board
        </button>
      </div>

      {savedBoards.length > 0 && (
        <div className="loadContainer">
          <select
            onChange={(e) => {
              loadBoard(e.target.value);
              setBoardName(e.target.value);
              setSelectedLoadChoice(e.target.value);
            }}
          >
            <option value="">Load a board...</option>
            {savedBoards.map((board) => (
              <option key={board.boardName} value={board.boardName}>
                {board.boardName}
              </option>
            ))}
          </select>
          {selectedLoadChoice ? (
            <button onClick={() => deleteBoard(boardName)}>Delete</button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default SaveLoad;
