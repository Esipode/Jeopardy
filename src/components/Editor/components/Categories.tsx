import { DndProvider } from "react-dnd";
import { GameData } from "../../../utils/data";
import Category from "./Category";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  data: GameData;
  onUpdate: (data: GameData) => void;
};

const Categories = ({ data, onUpdate }: Props) => {
  const moveCategory = (fromIndex: number, toIndex: number) => {
    const updatedCategories = [...data.categories];
    const [movedCategories] = updatedCategories.splice(fromIndex, 1);
    updatedCategories.splice(toIndex, 0, movedCategories);
    onUpdate({ ...data, categories: updatedCategories });
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {data.categories.map((category, i) => {
          return (
            <Category
              key={category.name}
              data={data}
              category={category}
              categoryIndex={i}
              onUpdate={onUpdate}
              moveCategory={moveCategory}
            />
          );
        })}
      </DndProvider>
    </div>
  );
};

export default Categories;
