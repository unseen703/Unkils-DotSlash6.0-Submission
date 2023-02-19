import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import JSZip from "jszip"
import { Button } from "../../component/BasicComponents"
import FileSlot from "./FileSlot"
import Loading from "../../component/Loading"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  updateStatus,
  addFiles,
  updateClasses,
} from "../../../features/files_manager/files_manager_slice"
import Tesseract from "tesseract.js"

const DragAndDrop = () => {
  // zip file object
  const zip = new JSZip()
  // all classes
  const class_list = [
    "Art & Science",
    "Finance",
    "Goverment & Politics",
    "Health",
    "Science & Technology",
  ]
  // zip folder related to classes
  const classes = [
    zip.folder("Art & Science"),
    zip.folder("Finance"),
    zip.folder("Goverment & Politics"),
    zip.folder("Health"),
    zip.folder("Science & Technology"),
  ]

  const api_loc = process.env.REACT_APP_SERVER

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const files = useSelector((state) => state.filesManager.files)
  // const [files, addFile] = useState([])
  const [fileError, fileErrorFun] = useState(false)
  const [fileSizeError, fileSizeErrorUpdate] = useState(false)
  const [loadingState, updateLoading] = useState(false)
  const [loadingMsg, updateLoadingMsg] = useState("Please wait...")

  const onDrop = useCallback((f) => {
    f = f.map((file) => {
      if (file.size * 0.001 >= 10000) {
        fileSizeErrorUpdate(true)
      }
      if (file.type == "application/pdf") return file
      else fileErrorFun(true)
    })
    // addFile(old_files => [...old_files, ...f])
    dispatch(addFiles(f))
  })

  const upload = async () => {
    updateLoading(true)
    const output = []
    let i = 1

    // manually idenify which book which output from server

    await files.map(async (d) => {
      const data = new FormData()
      data.append(d.path, d)

      await fetch(api_loc + "/predict", {
        method: "post",
        body: data,
      }).then(async (res) => {
        if (res.status == "200") {
          const p = await res.json()
          console.log(p[0])
          output.push({
            file: d,
            class: p[0],
          })
          dispatch(
            updateStatus(
              "Processing " +
                String(d.path) +
                " " +
                String(i) +
                " out of " +
                String(files.length) +
                " remaining"
            )
          )
          i += 1

          if (i > files.length) {
            dispatch(updateClasses(output))
            updateLoading(false)
            navigate("/result")
          }
        } else {
          updateLoading(false)
          alert("There is something wrong with the documents...")
        }
      })
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      {files.length == 0 && (
        <div className="w-full m-10 flex flex-col flex-wrap justify-center items-center font-playfair">
          <h1 className="font-bold text-2xl">Documents Classifier</h1>
          <h1 className="text-sm italic">
            Get organised with books and papers.
          </h1>
        </div>
      )}
      <div className="mt-5 flex flex-row justify-center items-center w-full h-20">
        <div
          {...getRootProps()}
          className="md:w-1/3 m-2 px-7 h-16 w-4/6 border-2 border-blue-200 border-dashed rounded cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <p>Click or Drop PDF files here </p>
        </div>
        <Button text="Upload" callback={upload} />
      </div>
      {fileSizeError == true && (
        <h1 className="flex justify-start text-sm text-red-400">
          File size >10 MB will take a while.
        </h1>
      )}
      {fileError == true && (
        <h1 className="flex justify-start text-sm text-red-400">
          pdf files only
        </h1>
      )}
      {files.length > 0 && (
        <div className="md:w-1/2 m-10 w-4/5 h-1/2 overflow-y-auto bg-header border-2 opacity-50 rounded">
          {files.map((file) => {
            return (
              <FileSlot
                f_name={file.path.split(".pdf")[0].substring(0, 30) + ".pdf"}
                f_size={(file.size * 0.001).toFixed(1) + String(" KB")}
              />
            )
          })}
        </div>
      )}
      {files.length == 0 && (
        <div className="md:h-1/5 md:py-32 md:w-3/5 mx-2 mt-10 flex flex-col justify-center items-start bg-header border-2 border-black-200 p-5 rounded-md font-playfair">
          <h1 className="md:text-4xl text-xl text-white">
            Ever wonder how you can get organized with tons of books and
            articles you have?
          </h1>
          <h1 className="md:text-xl text-md mt-5 text-white">
            We got your back,
          </h1>
          <h1 className="md:text-xl text-md text-white">
            Using Machine Learning Algorithms, we will identify which category
            each of your items belongs.
          </h1>
        </div>
      )}
      {loadingState == true && <Loading loadingMsg={loadingMsg} />}
    </>
  )
}

export default DragAndDrop
