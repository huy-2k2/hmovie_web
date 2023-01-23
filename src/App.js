import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import GenrePage from "./pages/GenrePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/detail/:filmId" element={<DetailPage></DetailPage>}>
          <Route path=":commentId" element=<DetailPage></DetailPage>></Route>
        </Route>
        <Route
          path="/search/:searchValue"
          element={<SearchPage></SearchPage>}
        ></Route>
        <Route
          path="/genre/:genreId/:genreName"
          element={<GenrePage></GenrePage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
