import React from "react";
import { useAuth } from "../context/authContext"; // Import useAuth hook

const Navbar = ({ onLogout }) => {
  const { isAuth, logout } = useAuth(); // Use context to access authentication state

  return (
    <nav>
      <div>
        {isAuth ? (
          <button onClick={onLogout}></button> // Trigger logout from props
        ) : (
          <button></button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
