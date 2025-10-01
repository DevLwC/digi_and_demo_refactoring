import React from 'react'

function Profile() {
  // Placeholder data; replace with real user data as needed
  const user = {
    username: 'NiklasStinkt',
    followersCount: 420,
    followingCount: 69,
    avatar: '/images/avatar-placeholder.png',
    status: 'Seed',
    statusIcon: '🌱'
  }

  return (
    <>
      <div className="container mt-3">
        <h3>Profile</h3>
        <div className="text-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            width="100"
          />
          <h3>{user.username}</h3>
          <p>
            {user.status} <span className="badge bg-success">{user.statusIcon}</span>
          </p>
          <div className="d-flex justify-content-center">
            <div className="me-3">
              <p className="mb-0">Followers</p>
              <h5>{user.followersCount}</h5>
            </div>
            <div>
              <p className="mb-0">Following</p>
              <h5>{user.followingCount}</h5>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-outline-secondary me-2">Posts</button>
            <button className="btn btn-outline-secondary me-2">Bookmarks</button>
            <button className="btn btn-outline-secondary">Friends</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile