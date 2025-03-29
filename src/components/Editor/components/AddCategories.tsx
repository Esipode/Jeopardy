import { useState } from "react";
import { Category } from "../../../utils/data";

type Props = {
  onUpdate: (data: Category) => void;
};

const AddCategories = ({ onUpdate }: Props) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const newCat: Category = {
      name: newCategory,
      questions: new Array(5).fill(null).map((_, i) => ({
        question: `Placeholder Question ${i + 1}`,
        answer: `Placeholder Answer ${i + 1}`,
        value: (i + 1) * 100,
        revealed: false,
      })),
    };
    onUpdate(newCat);
    setNewCategory("");
  };

  return (
    <div className="category-inputs">
      <input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={addCategory} disabled={!newCategory}>
        Add Category
      </button>
    </div>
  );
};

export default AddCategories;
