import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Game from "./pages/Game";

import "./styles/global.scss";

const App = () => {
  return (
    <Router basename="/Jeopardy">
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
