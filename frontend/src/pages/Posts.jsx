import React, { useState } from 'react'

function Posts() {
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add logic to create a post (API call)
    setMessage('Post creation not implemented yet.')
    setContent('')
  }

  return (
    <>
      <div className="container mt-3">
        <h3>Posts</h3>
        <div id="posts" role="tabpanel">
          <form className="mb-2" onSubmit={handleSubmit}>
            <textarea
              className="form-control mb-2"
              placeholder="What's on your mind?"
              required
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button className="btn btn-primary w-100" type="submit">
              Create Post
            </button>
          </form>
          {message && <div className="alert alert-info mt-2">{message}</div>}
        </div>
      </div>
    </>
  )
}

export default Posts