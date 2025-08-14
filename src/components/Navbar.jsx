import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link to="/" className="text-green-400 ">
          NWS
        </Link>
      </div>
      <div className="space-x-4 relative z-10">
        {auth ? (
          <>
            <Link to="/dash" className="text-green-400 font-bold ">
              Dashboard
            </Link>
            <Link to="/" className="text-green-400 font-bold ">
              Notes
            </Link>

            <button onClick={handleLogout} className="text-green-400 font-bold">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-green-400 font-bold ">
              Login
            </Link>
            <Link to="/reg" className="text-green-400 font-bold ">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
