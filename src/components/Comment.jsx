import IkImage from "./IKImage"

const Comment = () => {
  return (
    <div className='bg-slate-50 rounded-xl mb-8'>
      <div className="flex items-center gap-4">
        <IkImage src={"userImg.jpeg"} className={"w-10 h-10 rounded-full object-cover "} w={"40"} />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Quis placeat debitis doloribus laudantium sapiente ipsum blanditiis,
          tenetur tempore totam, incidunt enim! Praesentium ipsum animi provident et.
          Quaerat ullam tempore magni?
        </p>
      </div>
    </div>
  )
}

export default Comment