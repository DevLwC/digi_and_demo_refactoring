import React from 'react'

function Friends() {
  return (
    <>
      <div className="container mt-3">
        <h3>Friends</h3>

        {/* User Search */}
        <form className="mb-2">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search username" required />
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </form>
        <ul className="list-group mb-4" id="userResults"></ul>

        {/* Chat Section */}
        <h5>Chat</h5>
        <form className="mb-2">
          <input type="text" className="form-control mb-2" placeholder="Receiver username" required />
          <input type="text" className="form-control mb-2" placeholder="Message" required />
          <button className="btn btn-primary w-100" type="submit">Send Message</button>
        </form>
        <form className="mb-2">
          <input type="text" className="form-control mb-2" placeholder="User 2" required />
          <button className="btn btn-secondary w-100" type="submit">Show Chat</button>
        </form>
        <ul className="list-group mb-4" id="chatMessages"></ul>

        {/* Friends Section */}
        <h5>Friend Requests</h5>
        <form className="mb-2">
          <input type="text" className="form-control mb-2" placeholder="Friend's username" required />
          <button className="btn btn-primary w-100" type="submit">Send Friend Request</button>
        </form>
        <form className="mb-2">
          <button className="btn btn-secondary w-100" type="submit">Show Pending Requests</button>
        </form>
        <ul className="list-group" id="pendingRequests"></ul>
      </div>
    </>
  )
}

export default Friends