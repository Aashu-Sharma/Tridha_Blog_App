import React from 'react';
import databaseService from '../appwrite/post.config.js';
import {useNavigate} from 'react-router-dom';
import '../App.css'

function PostCard({ post }) {
  function truncate(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  }

  const navigate = useNavigate();

  return (

    <div className="box" id="fourth_block" onClick={() => navigate(`/post/${post.$id}`)}>
      <div className="imgBox">
        <img src={post.featured_image} alt={post.title} />
      </div>
      <div className="text-box">
        <h1>{truncate(post.title, 25)}</h1>
        <p>{truncate(post.content, 25)}</p>
      </div>
    </div>

  )
}

export default PostCard