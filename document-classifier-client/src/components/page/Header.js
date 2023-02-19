import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="md:p-3 bg-header w-full p-2 flex flex-row  justify-between items-center shadow-sm font-playfair text-white">
      <a href="/" className="md:text-2xl text-xl cursor-pointer ">
        DocORG.
      </a>
      <div className="flex-end flex">
        <Link
          to="/"
          className="md:text-sm text-white md:p-2 mx-2 p-1 px-2 rounded-md bg-button "
        >
          Home
        </Link>
      </div>
    </div>
  )
}

export default Header
