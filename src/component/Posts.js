import React, { useEffect, useState } from 'react'
import axios from "axios";

const Posts = () => {
  // GET Request
  const [places, setPlaces] = useState([]);
  const getPlaces = async () => {
    const { data } = await axios.get('https://placeadvisory-dev.herokuapp.com/posts')
    console.log(data)
    setPlaces(data)
  }

  useEffect(() => {
    getPlaces()
  }, [])

  // POST Request
  const [name, setName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeName = event => {
    setName(event.target.value)
  }

  const handleChangeSiteName = event => {
    setSiteName(event.target.value)
  }

  const handleChangeSiteLocation = event => {
    setSiteLocation(event.target.value)
  }

  const handleChangeDescription = event => {
    setDescription(event.target.value)
  }

  const createPost = async () => {
    await axios.post('https://placeadvisory-dev.herokuapp.com/posts', { name, siteName, siteLocation, description, comments: [] })
    getPlaces()
    setName('')
    setSiteName('')
    setSiteLocation('')
    setDescription('')
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!name) return
    createPost()
  }
}

export default Posts
