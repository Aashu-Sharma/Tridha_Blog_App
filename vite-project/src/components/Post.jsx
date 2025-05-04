import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/post.config.js";
import { Button } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../store/postSlice";

export default function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const post = useSelector((state) => state.posts.post);
  console.log("posts:", post)

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dispatch(fetchPostById(slug));
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featured_image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div id="postContainer">
      <div id="postImage">
        <img
          src={post.featured_image}
          alt={post.title}
        />
      </div>
      <div id="textContent">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {isAuthor && (
          <div>
            <Link to={`/editPost/${post.$id}`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={deletePost}>Delete</Button>
          </div>
        )}
      </div>
    </div>
  ) : null;
}