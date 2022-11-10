import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import CommentForm from '../component/CommentForm';
import PostForm from '../component/PostForm';
// import { convertRoutesToDataRoutes } from '@remix-run/router/dist/utils';


const DetailPage = () => {
  const [detail, setDetail] = useState({})
  const { id } = useParams()

  const [comments, setComments] = useState([])

  const getPost = async () => {
    const { data } = await axios.get(`https://placeadvisory-dev.herokuapp.com/posts/${id}`)
    setDetail(data)
  }

  const getComments = async () => {
    const { data } = await axios.get(`https://placeadvisory-dev.herokuapp.com/comments`)
    setComments(data)
  }

  useEffect(() => {
    getPost()
    getComments()
  }, [id])

  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  }
  const handleClick2 = event => {
    setIsShown2(current => !current);
  }

  const [commentEditStatus, setCommentEditStatus] = useState(false)
  const [commentTargetId, setCommentTargetId] = useState(0)
  const [newComment, setNewComment] = useState('')
  const handleEdit = (x) => {
    setCommentTargetId(x)
    setCommentEditStatus(current => !current)
  }
  const handleNewComment = event => {
    setNewComment(event.target.value)
  }
  const patchComment = async () => {
    // await axios.patch(`http://localhost:3001/comments/${commentTargetId}`,{ comment: newComment })
    await axios.patch(`https://placeadvisory-dev.herokuapp.com/comments/${commentTargetId}`, { comment: newComment })
    getComments()
    getPost()
  }
  const handlePatch = event => {
    event.preventDefault()
    if (!newComment || !commentTargetId) return
    patchComment()
    setCommentEditStatus(current => !current)
  };

  const deleteComment = (x) => {
    // axios.delete(`http://localhost:3001/comments/${x}`);
    axios.delete(`https://placeadvisory-dev.herokuapp.com/comments/${x}`);
    getPost()
    getComments()
  };

  return (
    <div className='layout container'>
      <div className="header mb-4">
        <nav className="navbar navbar-expand-lg mb-3">
          <div className="container-fluid ps-0">
            <div className="d-flex justify-content-between">
              <Link to="/post"> Back to the List </Link>
            </div>
            PlaceAdvisory (Published)
          </div>
        </nav>
        <h1 className="header-heading mt-5">{detail.siteName} ({detail.siteLocation})</h1>
        <p>by {detail.name}</p>
        <hr />
      </div>
      <div className="list-item">
        <h5>Description</h5>
        <p>{detail.description}</p>
        <hr />
        <div onClick={handleClick2} className="comment-button text-primary">
          Edit description
        </div>
        {isShown2 && <PostForm />}
      </div>
      <div onClick={handleClick} className="comment-button text-primary">
        Add comment
      </div>
      {isShown && <CommentForm />}
      <div className="comment-list-wrapper mt-3">
        <h4>All Comments</h4>
        <ul>
          {comments?.map((item) => {
            if (item.idPost == id) {
              if (commentEditStatus == true && item.id == commentTargetId) {
                return (
                  <form onSubmit={handlePatch}>
                    {item.name}
                    <input className='ms-3' required value={newComment} onChange={handleNewComment} />
                    {/* if  selectedId or newTitle is not set, this button will be disabled*/}
                    <button className='btn btn-primary ms-2 mb-1' type='submit'>
                      Submit
                    </button>
                  </form>
                )
              } else {
                return (
                  <li key={item.id}>
                    <div className="">
                      <h5>{item.name}</h5>
                      <p>{item.comment}</p>
                    </div>
                    <div className="d-flex my-3">
                      <div className='comment-button text-primary me-3' onClick={() => handleEdit(item.id)}>Edit</div>
                      <div className='comment-button text-danger' onClick={() => deleteComment(item.id)}>Delete</div>
                    </div>
                  </li>
                )
              }
            } else {
              return null
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default DetailPage
