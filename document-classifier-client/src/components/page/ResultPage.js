import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { saveFiles } from "../../features/files_manager/files_manager_slice"
import { savePics } from "../../features/files_manager/text_manager_slice"
import { Button } from "../component/BasicComponents"
import Header from "./Header"

const ResultPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const files = useSelector((state) => state.filesManager.files)
  const type = useSelector((state) => state.filesManager.type)

  useEffect(() => {
    console.log(type)
    if (files.length <= 0) {
      navigate("/")
    }
  })

  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-playfair">
      <Header />
      <h1 className="mt-10 text-lg">
        Click here to download categorized files{" "}
      </h1>
      <Button
        text="Download"
        callback={() =>
          type === "files" ? dispatch(saveFiles()) : dispatch(savePics())
        }
      ></Button>

      <div className="p-4 fixed left-0 bottom-0 w-full mt-20 flex flex-col justify-center items-center bg-footer">
        <table className="md:w-1/3 w-full mt-10 flex flex-col justify-between">
          <tr className="flex mt-2 justify-between">
            <td className="text-xl"></td>
            <td className="text"></td>
          </tr>
          <tr className="flex mt-2 justify-between items-center">
            <td>
              <a
                href="https://github.com/mayuras7685/Unkils-DotSlash6.0-Submission"
                className="text-blue-400"
              >
                Unkils
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default ResultPage
