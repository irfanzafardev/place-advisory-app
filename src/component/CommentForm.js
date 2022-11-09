import React from 'react'

const CommentForm = () => {
  return (
    
      <div className="form-wrapper mt-3">
        <h4>Add Comment Here</h4>
        <form className="mb-5">
          <div className="form">
            <div className="mb-3">
              <label className="form-label align-self-center">Name</label>
              <input type="text" className="form-control" placeholder='Enter your name' />
            </div>
            <div className="mb-3">
              <label htmlFor="context" className="form-label align-self-center">Comment</label>
              <textarea type="text" className="form-control" placeholder='Add your commment' />
            </div>
          </div>
          <div className="button">
            <button className="btn submit-button px-5" type='submit'>Add</button>
          </div>
        </form>
      </div>
      
    
  )
}

export default CommentForm
