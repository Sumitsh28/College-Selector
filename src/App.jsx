import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Carousel from "./pages/Carousel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
