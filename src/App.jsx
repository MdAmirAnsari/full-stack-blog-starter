import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64'>
     {/*Navbar */}
     <Navbar />
     {/* BreadCrumb*/}
     {/*Introduction */}
     {/*featured post */}
     {/* post*/}
   </div>
  )
}

export default App
       

