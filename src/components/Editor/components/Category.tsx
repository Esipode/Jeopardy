import { useDrag, useDrop } from "react-dnd";
import { Category as CategoryProps, GameData } from "../../../utils/data";
import Question from "./Question";

type Props = {
  data: GameData;
  category: CategoryProps;
  categoryIndex: number;
  moveCategory: Function;
  onUpdate: (data: GameData) => void;
};

const Category = ({
  data,
  category,
  categoryIndex,
  moveCategory,
  onUpdate,
}: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY",
    item: { categoryIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "CATEGORY",
    hover: (item: { index: number }) => {
      if (item.index !== categoryIndex) {
        moveCategory(item.index, categoryIndex);
        item.index = categoryIndex;
      }
    },
  });

  const removeCategory = (data: GameData, index: number) => {
    const newCategories = [...data.categories];
    newCategories.splice(index, 1);
    onUpdate({ ...data, categories: newCategories });
  };

  return (
    <div
      ref={(node) => drag(drop(node)) as any}
      className={`inputs-wrapper ${isDragging ? "dragging-opacity" : ""}`}
    >
      <div className="header-wrapper">
        <h3>
          <span className="drag-icon">{"\u2630"} </span>
          {category.name}
        </h3>
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
