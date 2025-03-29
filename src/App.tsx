import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";

import "./styles/global.scss";

const App = () => {
  return (
    <Router
      basename={import.meta.env.MODE === "development" ? "/" : "/Jeopardy"}
    >
      <Routes>
        <Route path="/Jeopardy" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
