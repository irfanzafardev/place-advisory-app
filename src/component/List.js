import React, { useState, useEffect } from 'react'
import icon from '../asset/arrow-upright.png';
import { Link } from "react-router-dom";
import axios from 'axios';

const List = () => {
  // GET Request
  // const rootAPI = 'https://placeadvisory-dev.herokuapp.com/posts'
  // const rootAPI = 'https://one-press-blog-server.vercel.app'
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const { data } = await axios.get("https://one-press-blog-server.vercel.app/categories")
    setPlaces(data)
  }

  useEffect(() => {
    getPlaces()
  }, [])

  // Patch Request
  const onClickDeleteButtonHandler = async (id) => {
    await axios.patch(`https://placeadvisory-dev.herokuapp.com/posts/${id}`, { isDeleted: true });
    getPlaces();
  };

  // Search state
  const [query, setQuery] = useState('')

  return (
    <div>
      <div className="header mb-4">
        <nav className="navbar navbar-expand-lg mb-3">
          <div className="container-fluid ps-0">
            <div className="d-flex justify-content-between">
              <Link to="/"> Home </Link>
            </div>
            PlaceAdvisory (Published)
          </div>
        </nav>
        <h1 className="header-heading mt-5">All Posts</h1>
        <p>Here are the visited places!</p>
        <p>JSON server: <a target="_blank" rel="noreferrer" href="https://placeadvisory-dev.herokuapp.com/posts">placeadvisory-dev.herokuapp.com/posts</a> | <a target="_blank" rel="noreferrer" href="https://placeadvisory-dev.herokuapp.com/comments">placeadvisory-dev.herokuapp.com/comments</a></p>
        <hr />
      </div>
      <div className="list-wrapper mt-3">
        <input className='search' type="text" placeholder='search' onChange={(event) => setQuery(event.target.value)} />
        <div className="row mt-3">
          {places.map((item) => {
            return (
              <p>{item.data}</p>
            )
          })}
          {/* {places?.filter(item => item.siteName.toLowerCase().includes(query) || item.siteLocation.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)).map((item) => {
            return (
              <div className={`col-4 ${item.isDeleted ? "d-none" : ""} list-item-wrapper`} key={item.id}>
                <div className="list-item">
                  <div className="row">
                    <div className="col-10">
                      <h4 className="text">{item.siteName} by {item.name}</h4>
                      <div className="text">{item.siteLocation}</div>
                      <div className="text mt-2">{item.description}</div>
                    </div>
                    <div className="col-2">
                      <div className="icon">
                        <Link to={`/detail/${item.id}`} key={item.id}>
                          <img src={icon} alt="arrow" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="delete-button text-danger">
                    <div className='text-danger' onClick={() => onClickDeleteButtonHandler(item.id)}>
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            )
          })} */}
        </div>
      </div>
    </div>
  )
}

export default List