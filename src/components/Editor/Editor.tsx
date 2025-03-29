import "../../styles/Editor.scss";
import AddCategories from "./components/AddCategories";
import Categories from "./components/Categories";
import Players from "./components/Players";

import { DataProps } from "../../utils/data";
import SaveLoad from "./components/SaveLoad";

const Editor = ({ data, setData }: DataProps) => {
  return (
    <div className="editor">
      <h2>Editor</h2>
      <SaveLoad data={data} setData={setData} />
      <Players data={data} onUpdate={setData} />
      <hr className="editor-separator" />
      <AddCategories
        onUpdate={(newCat) =>
          setData({ ...data, categories: [...data.categories, newCat] })
        }
      />
      <Categories data={data} onUpdate={setData} />
    </div>
  );
};

export default Editor;
