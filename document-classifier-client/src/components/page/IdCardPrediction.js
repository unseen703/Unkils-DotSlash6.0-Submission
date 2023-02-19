import IdCardOrganizer from "./IdCardOrganizer"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const IdCardPrediction = () => {
  return (
    <div className="w-screen h-screen bg-body flex flex-col justify-start items-center">
      <Header />
      <IdCardOrganizer />
    </div>
  )
}

export default IdCardPrediction
