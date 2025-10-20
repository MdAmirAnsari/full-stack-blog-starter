import { useState } from "react";
import IkImage from "./IkImage";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open,setOpen] = useState(false);

  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <IkImage src = "logo.png" alt = "lama logo" h={32} w={32}  />
        <span>lama log</span>
      </Link>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="cursor-pointer" onClick={() => setOpen(prev => !prev)}>
          {open ? <IkImage src="cross.png" alt="cross" h={32} w={32} /> : <IkImage src="menu.png" alt="menu" h={32} w={32} />}
        </div>

        {/* Mobile Link list */}
        <div className={`w-full mt-5 h-screen flex flex-col  items-center justify-center absolute top-16 transition-all ease-in-out ${
          open ? "right-0" : "right-[-100%]"
        } gap-6` }>
          <a href="">Home</a>
          <a href="">Trending</a>
          <a href="">Most popular</a>
          <a href="">About</a>
          <a href="">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 🖐</button>
          </a>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most popular</Link>
        <Link to="/">About</Link>
        <Link to="/">
          <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 🖐</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;