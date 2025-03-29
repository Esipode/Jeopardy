import { motion, AnimatePresence } from "framer-motion";

import "../../styles/QuestionModal.scss";
import { GameData } from "../../utils/data";
import { useEffect } from "react";

type QuestionModalProps = {
  data: GameData;
  selectedTile: {
    categoryIndex: number;
    questionIndex: number;
  } | null;
  isOpen: boolean;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  onShowAnswer: () => void;
  onClose: () => void;
};

const QuestionModal = ({
  data,
  selectedTile,
  isOpen,
  showAnswer,
  setShowAnswer,
  onShowAnswer,
  onClose,
}: QuestionModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && selectedTile && (
        <motion.div
          className="fullscreenTile"
          layoutId={`${selectedTile?.categoryIndex}-${selectedTile?.questionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="fullscreenContent"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <p className="questionText">
              {
                data.categories[selectedTile.categoryIndex].questions[
                  selectedTile.questionIndex
                ].question
              }
            </p>
          </motion.div>
          {!showAnswer ? (
            <button
              className="revealButton"
              onClick={(e) => {
                e.stopPropagation();
                setShowAnswer(true);
                onShowAnswer();
              }}
            >
              Reveal Answer
            </button>
          ) : (
            <motion.p
              className="answerText"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {
                data.categories[selectedTile.categoryIndex].questions[
                  selectedTile.questionIndex
                ].answer
              }
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionModal;
