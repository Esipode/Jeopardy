import { GameData, JeopardyCell } from "../../../utils/data";

type Props = {
  data: GameData;
  question: JeopardyCell;
  categoryIndex: number;
  questionIndex: number;
  onUpdate: (data: GameData) => void;
};

const Question = ({
  data,
  question,
  categoryIndex,
  questionIndex,
  onUpdate,
}: Props) => {
  const updateQuestion = (
    data: GameData,
    catIndex: number,
    qIndex: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newData = { ...data };
    newData.categories[catIndex].questions[qIndex][field] = value;
    onUpdate(newData);
  };

  return (
    <div className="input-group">
      <div
        className="input-wrapper"
        label-attr={`Question #${questionIndex + 1}`}
      >
        <input
          type="text"
          value={question.question}
          onChange={(e) =>
            updateQuestion(
              data,
              categoryIndex,
              questionIndex,
              "question",
              e.target.value
            )
          }
          placeholder="Question"
        />
      </div>
      <div
        className="input-wrapper"
        label-attr={`Answer #${questionIndex + 1}`}
      >
        <input
          type="text"
          value={question.answer}
          onChange={(e) =>
            updateQuestion(
              data,
              categoryIndex,
              questionIndex,
              "answer",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
};

export default Question;
