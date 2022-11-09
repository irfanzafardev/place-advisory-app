import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  let navigate = useNavigate();

  // POST Request
  const [name, setName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [description, setDescription] = useState('');

  const [nameErr, setNameErr] = useState(false);
  const handleChangeName = event => {
    setName(event.target.value)
  }

  const [siteNameErr, setSiteNameErr] = useState(false);
  const handleChangeSiteName = event => {
    setSiteName(event.target.value)
  }

  const [siteLocationErr, setSiteLocationErr] = useState(false);
  const handleChangeSiteLocation = event => {
    setSiteLocation(event.target.value)
  }

  const [descriptionErr, setDescriptionErr] = useState(false);
  const handleChangeDescription = event => {
    setDescription(event.target.value)
  }

  const createPost = async () => {
    await axios.post('http://localhost:5000/posts', { name, siteName, siteLocation, description, comments: [], isDeleted: false })
    setName('')
    setSiteName('')
    setSiteLocation('')
    setDescription('')
  }


  const handleSubmit = event => {
    event.preventDefault()
    if (name.length === 0) {
      setNameErr(true)
    } else if (siteName.length === 0) {
      setSiteNameErr(true)
    } else if (siteLocation.length === 0) {
      setSiteLocationErr(true)
    } else if (description.length === 0) {
      setDescriptionErr(true)
    }
    else {
      createPost()
      navigate('/post');
    }
  }

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
        <h1 className="header-heading">Form</h1>
        <p>Add your new place!</p>
      </div>
      <hr />
      <div className="form-wrapper">
        <form className="my-5" onSubmit={handleSubmit}>
          <div className="form">
            <div className="mb-3">
              <label className="form-label align-self-center">Name</label>
              <input type="text" className="form-control" placeholder='Enter your name' value={name} onChange={handleChangeName} focus />
              {nameErr ?
                <span className="form-text text-danger">
                  Please fill this field!
                </span> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="context" className="form-label align-self-center">Site</label>
              <input type="text" className="form-control" placeholder='siteName' value={siteName} onChange={handleChangeSiteName} />
              {siteNameErr ?
                <span className="form-text text-danger">
                  Please fill this field!
                </span> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="context" className="form-label align-self-center">Location</label>
              <input type="text" className="form-control" placeholder='siteLocation' value={siteLocation} onChange={handleChangeSiteLocation} />
              {siteLocationErr ?
                <span className="form-text text-danger">
                  Please fill this field!
                </span> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="context" className="form-label align-self-center">Description</label>
              {/* <input type="text" className="form-control" placeholder='description' value={description} onChange={handleChangeDescription} required /> */}
              <textarea type="text" className="form-control" placeholder='description' value={description} onChange={handleChangeDescription} />
              {descriptionErr ?
                <span className="form-text text-danger">
                  Please fill this field!
                </span> : ""}
            </div>
          </div>
          <div className="button">
            <button className="btn submit-button px-5" type='submit'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
