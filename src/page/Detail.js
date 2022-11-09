import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import CommentForm from '../component/CommentForm';
// import { convertRoutesToDataRoutes } from '@remix-run/router/dist/utils';


const DetailPage = () => {
  const [detail, setDetail] = useState({})
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/posts/${id}`).then(res => {
        console.log(res)
        setDetail(res.data)
      })
    }
  }, [id])

  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(current => !current);
  }

  return (
    <div className='layout container'>
      <div className="header mb-4">
        <nav className="navbar navbar-expand-lg mb-3">
          <div className="container-fluid ps-0">
            <div className="d-flex justify-content-between">
              <Link to="/"> Home </Link>
            </div>
            PlaceAdvisory
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
        <div className="comment-button text-primary">
          Edit description
        </div>
      </div>
      <div onClick={handleClick} className="comment-button text-primary">
        Add comment
      </div>
      {isShown && <CommentForm />}
      <div className="comment-list-wrapper mt-3">
        <h4>All Comments</h4>
        <ul>
          {detail.comments?.map((item) => {
            return (
              <li key={item.id}>
                {item.name} <br />
                {item.comment}
                <button>Edit</button>
                <button>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default DetailPage
