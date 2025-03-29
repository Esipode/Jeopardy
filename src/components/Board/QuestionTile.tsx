import { motion } from "framer-motion";
import { JeopardyCell } from "../../utils/data";

import "../../styles/QuestionTile.scss";

type QuestionTileProps = {
  question: JeopardyCell;
  isSelected: boolean;
  categoryIndex: number;
  questionIndex: number;
  onClick: (catIndex: number, qIndex: number) => void;
};

const QuestionTile = ({
  question,
  isSelected,
  categoryIndex,
  questionIndex,
  onClick,
}: QuestionTileProps) => {
  return (
    <motion.div
      key={`${categoryIndex}-${questionIndex}-tile`}
      className={`question-tile ${isSelected ? "active-tile" : ""} ${
        question.revealed ? "answered-tile" : ""
      }`}
      layoutId={`${categoryIndex}-${questionIndex}`}
      initial={{ opacity: question.revealed ? 0.5 : 1 }}
      animate={{ opacity: question.revealed ? 0.5 : 1 }}
      transition={{ duration: 0.1 }}
      onClick={() => onClick(categoryIndex, questionIndex)}
    >
      {`$${question.value}`}
    </motion.div>
  );
};

export default QuestionTile;
