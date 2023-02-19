export const Button = (props) => {
  const { text, callback } = props
  return (
    <>
      <input
        type="button"
        value={text}
        onClick={callback}
        className="w-32 h-14 m-2 hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded cursor-pointer"
      />
    </>
  )
}
