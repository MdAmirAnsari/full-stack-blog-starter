import IkImage from "./IKImage"
import { Link } from "react-router-dom"
const PostListItem = () => {
  return (
   <div className="flex flex-col xl:flex-row gap-8 ">
    <div className='md:hidden xl:block xl:h-1/3'>
        <IkImage src={"postImg.jpeg"} className={"rounded-2xl object-cover"} w={"735"} />
    </div>
     {/*details */}
    <div className="flex flex-col gap-4 xl:h-2/3">
        <Link to="/test" className="text-4xl font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">John Doe</Link>
            <span>on</span>
            <Link className="text-blue-800">Web Design</Link>
            <span>2 days ago</span>
        </div>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Ut, amet laborum sint architecto consectetur, odio rerum,
            corrupti labore nam minima fugit inventore consequuntur explicabo
            ab! Necessitatibus eius laboriosam porro ipsum?
        </p>
        <Link to="/test" className="underline text-blue-800">Read More</Link>
    </div>
   </div>
    
    
    
  )
}

export default PostListItem