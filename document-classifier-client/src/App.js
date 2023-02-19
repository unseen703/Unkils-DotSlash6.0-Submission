import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import PredictionPage from "./components/page/PredictionPage"
import ResultPage from "./components/page/ResultPage"
import IdCardPrediction from "./components/page/IdCardPrediction"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PredictionPage />}></Route>
        <Route path="/idcard" element={<IdCardPrediction />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
