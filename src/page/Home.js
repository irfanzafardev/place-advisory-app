import React from 'react'
import Header from '../component/Header'
import Menu from '../component/Menu'
// import Posts from '../component/Posts'

const Home = () => {
  return (
    <div className='layout container'>
      <Header />
      <Menu />
      {/* <Posts /> */}
    </div>
  )
}

export default Home