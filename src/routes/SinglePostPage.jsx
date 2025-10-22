import IKImage from "../components/IKImage"

const SinglePostPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
        
         </div>
        <div className="hidden lg:block w-2/5">
          <IKImage src="postImg.jpeg"/>
        </div>
      </div>
      {/* content */}
      <div className=""></div>
    </div>
  )
}

export default SinglePostPage