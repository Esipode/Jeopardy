import { useMemo } from "react";
import { DataProps } from "../utils/data";

const ResetAnswers = ({ data, setData }: DataProps) => {
  const hasAnsweredQuestions = useMemo(() => {
    return data.categories.find((category) =>
      category.questions.find((question) => question.revealed)
    );
  }, [data]);

  const resetAnsweredQuestions = () => {
    const newData = {
      ...data,
      categories: data.categories.map((category) => ({
        ...category,
        questions: category.questions.map((question) => ({
          ...question,
          revealed: false,
        })),
      })),
      players: data.players.map((player) => ({
        ...player,
        score: 0,
      })),
    };

    setData(newData);
  };

  return hasAnsweredQuestions ? (
    <button className="reset-answers-button" onClick={resetAnsweredQuestions}>
      Reset Answered Questions
    </button>
  ) : null;
};

export default ResetAnswers;
