import React from "react"
import Navbar from "../components/Navbar.jsx"
import "./Profile.css"

export default function Profile() {
    // Replace with your real data / props
    const user = {
        name: "Niklas Stinkt",
        handle: "@niklasson",
        bio: "Blau macht schlau",
        location: "Hamburg, DE",
        link: "https://niklasson.com",
        joined: "Joined 2025",
        followers: 5000,
        following: 3,
        status: {label: "Seed", icon: "🌿"},
    };

    const tabs = [
        {key: "posts", label: "Posts"},
        {key: "bookmarks", label: "Bookmarks"},
        {key: "replies", label: "Replies"},
    ];

    const [active, setActive] = React.useState("posts");

    return (
        <main className="profile" role="main">
            {/* Header card */}
            <section className="card card--header" aria-label="Profile header">
                <div className="header__row">
                    <div className="header__left">
                        {/* Animal avatar (Fox) */}
                        <div className="avatar avatar--animal" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                width="88"
                                height="88"
                                role="img"
                                aria-label="Fox avatar"
                            >
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="30"
                                    fill="#fff7f0"
                                    stroke="#e67e22"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M20 24c2-6 10-10 12-10s10 4 12 10c0 8-4 18-12 18S20 32 20 24z"
                                    fill="#f39c12"
                                    stroke="#d35400"
                                    strokeWidth="2"
                                />
                                <circle cx="26" cy="28" r="3" fill="#2c3e50"/>
                                <circle cx="38" cy="28" r="3" fill="#2c3e50"/>
                                <path
                                    d="M28 38c2 2 6 2 8 0"
                                    stroke="#2c3e50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                {/* ears */}
                                <path
                                    d="M24 18l-6-6M40 18l6-6"
                                    stroke="#d35400"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div className="identity">
                            <h1 className="identity__name">{user.name}</h1>
                            <div className="identity__meta">
                                <span className="handle">{user.handle}</span>
                                <span
                                    className="badge"
                                    aria-label={`Status: ${user.status.label}`}
                                >
                          <span className="badge__icon" role="img" aria-hidden="true">
                            {user.status.icon}
                          </span>
                                    {user.status.label}
                        </span>
                            </div>
                        </div>
                    </div>

                    <div className="header__actions">
                        <button className="btn btn--ghost" type="button">Share</button>
                        <button className="btn btn--primary" type="button">Follow</button>
                    </div>
                </div>

                <p className="bio">{user.bio}</p>

                <ul className="facts" aria-label="Profile details">
                    <li>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                            <path
                                d="M12 2C8 2 4.6 4.8 4.1 8.7c-.5 3.7 1.6 6.2 3.4 8.1L12 21l4.5-4.2c1.8-1.9 3.9-4.4 3.4-8.1C19.4 4.8 16 2 12 2Z"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="1.6"
                            />
                        </svg>
                        {user.location}
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                            <path
                                d="M4 12a8 8 0 0 1 16 0c0 4.4-3.6 8-8 8-1.7 0-3.3-.5-4.6-1.4L4 21l1.4-3.4A7.9 7.9 0 0 1 4 12Z"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="1.6"
                            />
                        </svg>
                        <a href={user.link} target="_blank" rel="noreferrer">
                            {user.link.replace(/^https?:\/\//, "")}
                        </a>
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                            <path
                                d="M8 7V3m8 4V3M4 11h16M6 5h0m12 14H6a2 2 0 0 1-2-2V7h16v10a2 2 0 0 1-2 2Z"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="1.6"
                            />
                        </svg>
                        {user.joined}
                    </li>
                </ul>

                <div className="stats" role="group" aria-label="Follow stats">
                    <div className="stat">
                        <div className="stat__value">{user.followers}</div>
                        <div className="stat__label">Followers</div>
                    </div>
                    <div className="stat">
                        <div className="stat__value">{user.following}</div>
                        <div className="stat__label">Following</div>
                    </div>
                </div>

                <nav className="tabs" aria-label="Profile sections">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            className={`tab ${active === t.key ? "is-active" : ""}`}
                            aria-current={active === t.key ? "page" : undefined}
                            onClick={() => setActive(t.key)}
                            type="button"
                        >
                            {t.label}
                        </button>
                    ))}
                </nav>
            </section>

            {/* Content area */}
            <section className="content">
                {active === "posts" && (
                    <div className="grid">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <article key={i} className="post card">
                                <div className="post__media skeleton"/>
                                <div className="post__body">
                                    <div className="skeleton skeleton--line"/>
                                    <div className="skeleton skeleton--line w-70"/>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {active === "bookmarks" && (
                    <div className="empty">
                        <h3>No bookmarks yet</h3>
                        <p>Save posts to find them here later.</p>
                        <button className="btn btn--ghost" type="button">Explore</button>
                    </div>
                )}

                {active === "replies" && (
                    <div className="list">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card list__item">
                                <div className="skeleton skeleton--line"/>
                                <div className="skeleton skeleton--line w-80"/>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Navbar/>
        </main>
    );
}