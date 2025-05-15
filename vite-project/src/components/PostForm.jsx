import React from 'react';
import { Input, Select, RTE, Button } from './index.js';
import { useForm } from 'react-hook-form';
import databaseService from '../appwrite/post.config.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("FormData: ", data);
    if (post) {
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
      console.log("file: ", file);
      if (file) {
        databaseService.deleteFile(post.featured_image);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featured_image: file || post.featured_image
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;
      console.log("Image coming from data: ",data.image[0]);
      console.log(file);
      if (file) {
        // const fileId = file.$id;
        data.featured_image = file;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        })
        if (dbPost) {
          console.log("DBPost: ", dbPost)
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  return (
    <div className="postFormContainer">
      <form onSubmit={handleSubmit(submit)} className='postForm'>
        <div className='RTEcontainer'>
          <Input
            label='title'
            placeholder="Enter Title"
            {...register("title", { required: true })}
          />
          <RTE label="Content :" className= "rte" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className='postFormRight'>
          <Input
            label="Featured Image :"
            type="file"
            className=""
            accept="image/png, image/jpg, image/jpeg, image/gif,"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="">
              <img
                src={post.featured_image}
                alt={post.title}
                className="rounded-lg w-1/3"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label='Status'
            className = "select"
            {...register("status", { required: true })}
          />

          <Button type='submit' >
            {post ? "Update" : "Submit"}
          </Button>

        </div>
      </form>
    </div>

  )
}

export default PostForm
