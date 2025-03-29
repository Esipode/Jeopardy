import { GameData } from "../../../utils/data";
import Category from "./Category";

type Props = {
  data: GameData;
  onUpdate: (data: GameData) => void;
};

const Categories = ({ data, onUpdate }: Props) => {
  return (
    <div>
      {data.categories.map((category, i) => {
        return (
          <Category
            key={category.name}
            data={data}
            category={category}
            categoryIndex={i}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
};

export default Categories;
