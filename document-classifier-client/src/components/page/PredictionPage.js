import DragAndDrop from "./DragAndDrop/DragAndDrop"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const PredictionPage = () => {
    return(
        <div className="w-screen h-screen bg-body flex flex-col justify-start items-center">
            <Header/>
            <DragAndDrop/>
        </div>
    )
}

export default PredictionPage