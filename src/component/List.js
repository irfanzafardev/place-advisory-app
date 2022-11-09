import React, { useState, useEffect } from 'react'
import icon from '../asset/arrow-upright.png';
import { Link } from "react-router-dom";
import axios from 'axios';

const List = () => {
  // GET Request
  const rootAPI = 'http://localhost:5000/posts'
  const [places, setPlaces] = useState([]);
  const getPlaces = async () => {
    const { data } = await axios.get(rootAPI)
    console.log(data)
    setPlaces(data)
  }

  // const onClickDeleteButtonHandler = (id) => {
  //   axios.delete(`http://localhost:3001/posts/${id}`);
  //   getPlaces();
  // };

  const onClickDeleteButtonHandler = (id) => {
    axios.patch(`http://localhost:5000/posts/${id}`, { isDeleted: true });
    getPlaces();
  };

  useEffect(() => {
    getPlaces()
  }, [])
  return (
    <div>
      <div className="header mb-4">
        <nav className="navbar navbar-expand-lg mb-3">
          <div className="container-fluid ps-0">
            <div className="d-flex justify-content-between">
              <Link to="/"> Home </Link>
            </div>
            PlaceAdvisory
          </div>
        </nav>
        <h1 className="header-heading mt-5">All Posts</h1>
        <p>Here are the visited places!</p>
        <hr />
      </div>
      <div className="list-wrapper mt-5">
        <div className="row">
          {places?.map((item) => {
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
          })}
        </div>
      </div>
    </div>
  )
}

export default List