import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostForm = () => {
  const { id } = useParams();
  const [description, setDesc] = useState('');

  const handleChangeDesc = event => {
    setDesc(event.target.value)
  }
  const addPost = async () => {
    const a = await axios.patch(`https://placeadvisory-dev.herokuapp.com/posts/${id}`, { description })
    console.log(a)
    setDesc('')
  }

  const handleSubmit = () => {
    addPost()
    alert('Item has been updated!')
  }
  return (
    <div className="form-wrapper mt-3">
      <h4>Add Description Here</h4>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="form">
          <div className="mb-3">
            <label className="form-label align-self-center">Description</label>
            <input type="text" className="form-control" placeholder='change description'
              required value={description} onChange={handleChangeDesc} />
          </div>
        </div>
        <div className="button">
          <button className="btn submit-button px-5" type='submit'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
