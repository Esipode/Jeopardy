import { useState } from "react";
import { motion } from "framer-motion";

import "../../styles/Board.scss";
import { GameData } from "../../utils/data";
import QuestionTile from "./QuestionTile";
import QuestionModal from "./QuestionModal";

type BoardProps = {
  data: GameData;
  onShowAnswer: (catIndex: number, qIndex: number) => void;
};

const Board = ({ data, onShowAnswer }: BoardProps) => {
  const [selectedTile, setSelectedTile] = useState<{
    categoryIndex: number;
    questionIndex: number;
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const openQuestion = (categoryIndex: number, questionIndex: number) => {
    setSelectedTile({ categoryIndex, questionIndex });
    setShowAnswer(false);
  };

  const closeQuestion = () => {
    setSelectedTile(null);
    setShowAnswer(false);
  };

  return (
    <motion.div
      className="board"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {data.categories.map((category, catIndex) => (
        <div key={`category-${catIndex}`} className="category">
          <h3 className="category-header">{category.name}</h3>
          <div className="questions">
            {category.questions.map((q, qIndex) => (
              <QuestionTile
                key={`category-${catIndex}-question-${q.question}`}
                question={q}
                categoryIndex={catIndex}
                questionIndex={qIndex}
                isSelected={
                  selectedTile?.categoryIndex === catIndex &&
                  selectedTile.questionIndex === qIndex
                }
                onClick={() => {
                  openQuestion(catIndex, qIndex);
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <QuestionModal
        data={data}
        selectedTile={selectedTile}
        isOpen={selectedTile !== null}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        onShowAnswer={() =>
          selectedTile &&
          onShowAnswer(selectedTile.categoryIndex, selectedTile.questionIndex)
        }
        onClose={closeQuestion}
      />
    </motion.div>
  );
};

export default Board;
