import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import QuestionPage from "./pages/QuestionPage";
import SummaryPage from "./pages/SummaryPage";
import LibraryPage from "./pages/LibraryPage";
import MindMapPage from "./pages/MindMapPage";

function App() {
  return (
    <BrowserRouter basename="/bunda-sehat">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/register"
          element={<RegisterPage></RegisterPage>}
        ></Route>
        <Route
          path="/question"
          element={<QuestionPage></QuestionPage>}
        ></Route>
        <Route
          path="/summary/:id"
          element={<SummaryPage></SummaryPage>}
        ></Route>
        <Route
          path="/library/:category"
          element={<LibraryPage></LibraryPage>}
        ></Route>
        <Route
          path="/library/:category/:id"
          element={<MindMapPage></MindMapPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
