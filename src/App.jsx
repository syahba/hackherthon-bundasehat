import { BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterHome";
import QuestionPage from "./pages/QuestionPage";
import SummaryPage from "./pages/SummaryPage";
import LibraryPage from "./pages/LibraryPage";
import MindMapPage from "./pages/MindMapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Routes path="/" element={<HomePage></HomePage>}></Routes>
        <Routes
          path="/register"
          element={<RegisterPage></RegisterPage>}
        ></Routes>
        <Routes
          path="/question/:id"
          element={<QuestionPage></QuestionPage>}
        ></Routes>
        <Routes
          path="/summary/:id"
          element={<SummaryPage></SummaryPage>}
        ></Routes>
        <Routes
          path="/library/:category"
          element={<LibraryPage></LibraryPage>}
        ></Routes>
        <Routes
          path="/library/:category/:id"
          element={<MindMapPage></MindMapPage>}
        ></Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
