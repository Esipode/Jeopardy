import { useMemo, useState } from "react";
import { isEqual } from "lodash";
import { DataProps, defaultGameData } from "../../../utils/data";
import useGameState from "../../../utils/useGameState";

import "../../../styles/SaveLoad.scss";

const SaveLoad = ({ data, setData }: DataProps) => {
  const { savedBoards, saveBoard, loadBoard, deleteBoard } = useGameState(
    JSON.parse(JSON.stringify(data)),
    setData
  );

  const [boardName, setBoardName] = useState(data?.boardName || "");
  const [selectedLoadChoice, setSelectedLoadChoice] = useState("");

  const isUnsaved = useMemo(() => {
    if (isEqual(data, defaultGameData)) {
      return false;
    } else {
      const matchingBoardByName = savedBoards.find(
        (saved) => saved.boardName === boardName
      );
      const dataDoesNotMatch =
        !boardName || !isEqual(matchingBoardByName, data);

      return dataDoesNotMatch;
    }
  }, [data, boardName, savedBoards]);

  return (
    <>
      <div className="saveContainer">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
        />
        <button
          onClick={() => saveBoard(boardName)}
          disabled={!boardName || !isUnsaved}
        >
          Save Board
        </button>
      </div>
      {isUnsaved ? (
        <div className="unsaved-disclaimer">There are unsaved changes</div>
      ) : null}
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
