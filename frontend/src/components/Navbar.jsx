import React from 'react'
            import { Link } from 'react-router-dom'

            function Navbar() {
              return (
                <nav className="navbar fixed-bottom bg-light border-top d-flex justify-content-center" style={{ height: '60px' }}>
                  <ul className="nav d-flex flex-row w-100 justify-content-between align-items-center px-3" style={{ fontSize: '1.5rem' }}>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/dashboard">
                        <i className="bi bi-house"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/friends">
                        <i className="bi bi-people"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-primary" to="/posts">
                        <i className="bi bi-plus-circle-fill"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/store">
                        <i className="bi bi-shop"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/profile">
                        <i className="bi bi-person"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )
            }

            export default Navbar