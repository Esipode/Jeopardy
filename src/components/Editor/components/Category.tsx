import { Category as CategoryProps, GameData } from "../../../utils/data";
import Question from "./Question";

type Props = {
  data: GameData;
  category: CategoryProps;
  categoryIndex: number;
  onUpdate: (data: GameData) => void;
};

const Category = ({ data, category, categoryIndex, onUpdate }: Props) => {
  const removeCategory = (data: GameData, index: number) => {
    const newCategories = [...data.categories];
    newCategories.splice(index, 1);
    onUpdate({ ...data, categories: newCategories });
  };

  return (
    <div className="inputs-wrapper">
      <div className="header-wrapper">
        <h3>{category.name}</h3>
        <button
          className="remove-button"
          onClick={() => removeCategory(data, categoryIndex)}
        >
          Remove
        </button>
      </div>
      {category.questions.map((question, questionIndex) => (
        <Question
          key={question.question}
          data={data}
          question={question}
          categoryIndex={categoryIndex}
          questionIndex={questionIndex}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default Category;
