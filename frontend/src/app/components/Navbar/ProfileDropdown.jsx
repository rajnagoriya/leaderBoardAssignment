// app/components/Navbar/ProfileDropdown.js
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext/useAuth'; // Assuming you have an Auth context

export default function ProfileDropdown() {
  const { user, setUser} = useAuth();

  const logout = () =>{
    setUser(null);
    localStorage.removeItem("authToken");
  }

  return (
    <>
    {
     !user ? (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
        <Link href={"/login"}>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          Login
        </button>
        </Link>
        <hr className="my-2" />
        <Link href={"/signup"}>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
          signup
        </button>
        </Link>
      </div>
     ):(
    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 ">
      <div className="px-4 py-2 gap-6">
        <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
        <p className="text-sm text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-600">Points: {user?.Points}</p>
      </div>
      <hr className="my-2" />
      <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
        Logout
      </button>
    </div>
     )
}
    </>
  );
}
