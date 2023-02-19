const FileSlot = (props) => {
  const { f_name, f_size } = props

  return (
    <div className="flex flex-row rounded justify-between bg-body shadow m-2 p-2 text-black">
      <h1>{f_name}</h1>
      <h1>{f_size}</h1>
    </div>
  )
}

export default FileSlot
