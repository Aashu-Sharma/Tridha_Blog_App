import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {PostForm} from '../components/index.js';
import {fetchPostById} from '../store/postSlice.js';

function EditPost() {
  const {slug} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    if(slug){
      dispatch(fetchPostById(slug));
    } else navigate("/");
  }, [slug, navigate])

  return (
    <div>
       <PostForm post={post}/>
    </div>
  )
}

export default EditPost


// function EditPost() {
//   const [post, setPost] = useState(null)
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//       if(slug){
//           databaseService.getPost(slug)
//           .then((post) => {
//               if(post) setPost(post);
//               else navigate("/");
//           })
//       }
//   }, [slug, navigate])
//   return post ? (
//       <div className='py-8'>
//           <Container>
//               <PostForm post={post}/>
//           </Container>
//       </div>
//   ) : null;
// }

// export default EditPost