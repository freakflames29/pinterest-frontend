import React from "react";
import { Link, Outlet } from "react-router-dom";

function Nav() {
  return (
    <div>
      <h1>Nav bar</h1>

      <li>
        <Link to="auth/">Auth</Link>
      </li>
      <Outlet />
    </div>
  );
}

export default Nav;
