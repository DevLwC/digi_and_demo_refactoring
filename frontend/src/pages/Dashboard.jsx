import React from 'react'
import Navbar from '../components/Navbar.jsx'

function Dashboard() {
    return (
        <>
            <div className="container mt-3">
                <h3>Home</h3>
                <div className="row mt-4">
                    <div className="col-md-8">
                        <h4>Feed</h4>
                        {/* Feed logic goes here */}
                        <ul className="list-group" id="postFeed"></ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
