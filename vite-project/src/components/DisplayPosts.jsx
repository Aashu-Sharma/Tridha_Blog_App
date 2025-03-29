import React from 'react';
import { PostCard } from './index.js';
import { useSelector } from 'react-redux';
import '../App.css'

function DisplayPosts() {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div id="second">
      {
        posts?.map((post) => (
          <PostCard post={post} />
        ))
      }
    </div>
  )
}

export default DisplayPosts