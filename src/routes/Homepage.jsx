import { Link } from "react-router-dom"
const Homepage = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
    {/* BreadCrumb*/}
    <div className="flex gap-4">
      <Link to="/">Home</Link>
      <span>.</span>
      <span className="text-blue-800">Blogs and Articales</span>
    </div>
         {/*Introduction */}
         <div className="flex items-center justify-between">
          {/* title */}
          <div>
            <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
            <p className="mt-8 text-md md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore in deleniti magni.</p>
          </div>
          {/* animated button */}
          <Link to="write">
          <svg 
              viewBox="0 0 200 200"
              width="200"
              height="200"
          >
            <path 
              id="circlePath"
              d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </svg>
          </Link>
         </div>
         {/*featured post */}
         {/* post*/}
    </div>
  )
}

export default Homepage