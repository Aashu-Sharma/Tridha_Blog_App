import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutBtn from "./LogOutBtn";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const tl = gsap.timeline();

  const isAdmin = userData?.isAdmin;
  console.log(isAdmin)
  console.log("user logged in: ", authStatus);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },

    {
      name: 'Blogs',
      slug: "/allPosts",
      active: true
    },

    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },

    {
      name: 'SignUp',
      slug: "/signup",
      active: !authStatus
    },

    {
      name: 'Add-Post',
      slug: "/addPost",
      active: isAdmin,
    },

    {
      name: 'Add-Ebooks',
      slug: "/addEbooks",
      active: isAdmin,
    },
  ]

  return (
    <header className="header">
      <nav>
        <div className="title">
          <h3>Tridha <br />Meditation</h3>
        </div>
        <div className={`navbar ${menuOpen ? "open" : ""}`} id="nav-links">
          <i class="fa-solid fa-xmark" onClick={() => setMenuOpen(false)}></i>
          <ul>
            {
              navItems.map((item) => item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ) : null)
            }
          </ul>

          {authStatus && (
            <div className="login">
              <LogOutBtn />
            </div>)}
        </div>
        <i class="fa-solid fa-bars" onClick={() => setMenuOpen(true)}></i>
      </nav>

    </header>
  );
}

export default Header;
