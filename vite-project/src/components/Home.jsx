import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import PostCard from "./PostCard.jsx";

function HomePage() {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.userData);
  console.log("Posts: ", posts);

  return (
    <main className="bg-black text-white">
      <section className="block1 block">
        <div className="hero">
          <h1>Tridha Meditation</h1>
          <p>
            MEDITATION IS BEYOND THINKING. <br /> WE DEVELOP YOUR INSIGHT
          </p>
        </div>
      </section>

      {/* <!-- Blog Section --> */}

      {
        user ?
          <section className="block block2">
            <div className="container">
              <div id="first">
                <h2>Our Blogs</h2>
                <Link to={'/allPosts'}> View More </Link>
              </div>
              <div id="second">
                <div className="box-container">
                  {
                    posts?.slice(0, 3).map((post) => (
                      <PostCard post={post} />
                    ))
                  }
                </div>
              </div>

            </div>
          </section>
          :
          <section className="block block2">
            <div className="container text-center" >
              <p className="text-3xl">Login to read Posts</p>
            </div>
          </section>
      }


      <section className="block block4">
        <div className="container">
          <div className="circle">
            <img src="picture.jpg" alt="" />
          </div>
          <div className="info">
            <h2 className="">Pran Prakash Sharma</h2>
            <p className="">
              Pran Prakash Sharma is an accredited astrologer and
              spiritual healer, having experience of more than 30 years. If you
              want to know what your stars say, or stop your eyes on deceptions.
            </p>
            <p className="">
              Contact: 7983314136 (w), 9997532602 (m)
              <br />
              email: pranprakashsharma@gmail.com,
              <br />
              shivangi2020jyotish@gmail.com
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
