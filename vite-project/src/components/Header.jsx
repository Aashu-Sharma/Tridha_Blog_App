import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutBtn from "./LogOutBtn";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const isAdmin = userData?.isAdmin;
  console.log(isAdmin)
  console.log("user logged in: ", authStatus);
  let navLinks = document.getElementById("nav-links");
  function showMenu() {
    navLinks.style.right = "0";
  }
  function hideMenu() {
    navLinks.style.right = "-200px";
  }

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

    // {
    //   name: 'Ebooks',
    //   slug: "/",
    //   active: true
    // },

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

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();
//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//   ]

//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px' />

//             </Link>
//           </div>
//           <ul className='flex ml-auto'>
// {navItems.map((item) =>
//   item.active ? (
//     <li key={item.name}>
//       <button
//         onClick={() => navigate(item.slug)}
//         className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//       >{item.name}</button>
//     </li>
//   ) : null
// )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   )
// }