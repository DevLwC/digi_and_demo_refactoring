import React from "react"
import {useState, useEffect} from "react";
import "./Profile.css"
import {API_BASE_URL} from "../config.js";

// 1. Animal SVGs as components
const AnimalAvatars = {
    fox: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Fox avatar">
            <circle cx="32" cy="32" r="30" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <path d="M20 24c2-6 10-10 12-10s10 4 12 10c0 8-4 18-12 18S20 32 20 24z" fill="#f39c12" stroke="#d35400"
                  strokeWidth="2"/>
            <circle cx="26" cy="28" r="3" fill="#2c3e50"/>
            <circle cx="38" cy="28" r="3" fill="#2c3e50"/>
            <path d="M28 38c2 2 6 2 8 0" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round"/>
            <path d="M24 18l-6-6M40 18l6-6" stroke="#d35400" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),
    cat: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Cat avatar">
            <circle cx="32" cy="36" r="24" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="32" cy="44" rx="12" ry="8" fill="#f9d29d"/>
            <ellipse cx="24" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="40" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <path d="M32 48c2 2 6 2 8 0" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="16,24 24,12 28,28" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
            <polygon points="48,24 40,12 36,28" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
    dog: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Dog avatar">
            <ellipse cx="32" cy="36" rx="22" ry="20" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="24" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="40" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="32" cy="46" rx="6" ry="3" fill="#f9d29d"/>
            <ellipse cx="12" cy="24" rx="6" ry="12" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
            <ellipse cx="52" cy="24" rx="6" ry="12" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
    rabbit: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Rabbit avatar">
            <ellipse cx="32" cy="40" rx="18" ry="16" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="24" cy="44" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="40" cy="44" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="32" cy="52" rx="6" ry="3" fill="#f9d29d"/>
            <rect x="22" y="8" width="6" height="24" rx="3" fill="#fff7f0" stroke="#e67e22" strokeWidth="2"/>
            <rect x="36" y="8" width="6" height="24" rx="3" fill="#fff7f0" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
    bear: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Bear avatar">
            <ellipse cx="32" cy="36" rx="20" ry="18" fill="#f9d29d" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="20" cy="20" rx="6" ry="6" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
            <ellipse cx="44" cy="20" rx="6" ry="6" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
            <ellipse cx="26" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="38" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="32" cy="44" rx="5" ry="3" fill="#fff7f0"/>
        </svg>
    ),
    panda: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Panda avatar">
            <ellipse cx="32" cy="36" rx="20" ry="18" fill="#fff" stroke="#2c3e50" strokeWidth="3"/>
            <ellipse cx="18" cy="20" rx="7" ry="9" fill="#2c3e50"/>
            <ellipse cx="46" cy="20" rx="7" ry="9" fill="#2c3e50"/>
            <ellipse cx="24" cy="36" rx="5" ry="7" fill="#2c3e50"/>
            <ellipse cx="40" cy="36" rx="5" ry="7" fill="#2c3e50"/>
            <ellipse cx="32" cy="44" rx="5" ry="3" fill="#f9d29d"/>
        </svg>
    ),
    frog: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Frog avatar">
            <ellipse cx="32" cy="40" rx="18" ry="14" fill="#8fd18f" stroke="#355c35" strokeWidth="3"/>
            <ellipse cx="20" cy="28" rx="6" ry="6" fill="#8fd18f" stroke="#355c35" strokeWidth="2"/>
            <ellipse cx="44" cy="28" rx="6" ry="6" fill="#8fd18f" stroke="#355c35" strokeWidth="2"/>
            <circle cx="20" cy="28" r="2" fill="#2c3e50"/>
            <circle cx="44" cy="28" r="2" fill="#2c3e50"/>
            <ellipse cx="32" cy="48" rx="8" ry="3" fill="#fff7f0"/>
        </svg>
    ),
    owl: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="88" height="88" role="img"
             aria-label="Owl avatar">
            <ellipse cx="32" cy="40" rx="18" ry="16" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="24" cy="36" rx="5" ry="7" fill="#fff" stroke="#e67e22" strokeWidth="2"/>
            <ellipse cx="40" cy="36" rx="5" ry="7" fill="#fff" stroke="#e67e22" strokeWidth="2"/>
            <circle cx="24" cy="36" r="2" fill="#2c3e50"/>
            <circle cx="40" cy="36" r="2" fill="#2c3e50"/>
            <polygon points="32,44 28,52 36,52" fill="#e67e22"/>
            <polygon points="20,20 32,8 44,20" fill="#fff7f0" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
}

function handleLogout() {
    localStorage.clear();
    fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    }).finally(() => {
        window.location.href = '/login';
    });
}

// 2. Add avatarAnimal to user
export default function Profile() {
    const [bio, setBio] = useState(localStorage.getItem('bio') || "No bio set");
    const [location, setLocation] = useState(localStorage.getItem('location') || "");
    const [active, setActive] = useState("posts");
    const [posts, setPosts] = useState([]);

    const handleLocationChange = async (e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        localStorage.setItem('location', newLocation);
        try {
            await fetch(`${API_BASE_URL}/api/users/updateLocation`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({location: newLocation}),
                credentials: 'include'
            });
        } catch (err) {
            console.error('Failed to update location on server:', err);
        }
    };

    const handleBioChange = async (e) => {
        const newBio = e.target.value;
        setBio(newBio);
        localStorage.setItem('bio', newBio);
        try {
            await fetch(`${API_BASE_URL}/api/users/updateBio`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({bio: newBio}),
                credentials: 'include'
            });
        } catch (err) {
            console.error('Failed to update bio on server:', err);
        }
    }
    const user = {
        name: localStorage.getItem('username'),
        handle: localStorage.getItem('email'),
        link: "https://niklasson.com",
        joined: localStorage.getItem('createdAt'),
        followers: localStorage.getItem('followersCount'),
        following: localStorage.getItem('followingCount'),
        status: {label: "Seed", icon: "🌿"},
        avatarAnimal: "dog", // Change to any of: fox, cat, dog, rabbit, bear, panda, frog, owl
    };

    const tabs = [
        {key: "posts", label: "Posts"},
        {key: "bookmarks", label: "Bookmarks"},
        {key: "replies", label: "Replies"},
    ];

    useEffect(() => {
        if (active === "posts") {
            fetch(`${API_BASE_URL}/api/posts/ownPosts?username=${user.name}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => {setPosts([]);
                    console.error('Error fetching posts:', err)
                });
        }
    }, [active, user.name]);

    return (
        <div className="profile-bg">
            <div className="profile-center-container">
                <main className="profile" role="main">
                    {/* Header card */}
                    <section className="card card--header" aria-label="Profile header">
                        <div className="header__row">
                            <div className="header__left">
                                {/* Animal avatar */}
                                <div className="avatar avatar--animal" aria-hidden="true">
                                    {AnimalAvatars[user.avatarAnimal]}
                                </div>
                                <div className="identity">
                                    <h1 className="identity__name">{user.name}</h1>
                                    <div className="identity__meta">
                                        <span className="handle">{user.handle}</span>
                                        <span
                                            className="badge"
                                            aria-label={`Status: ${user.status.label}`}
                                        >
                                                                        <span className="badge__icon" role="img"
                                                                              aria-hidden="true">
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
                        <div>
                            <textarea
                                className="bio"
                                value={bio}
                                onChange={handleBioChange}
                                rows={3}
                                style={{width: "100%"}}
                            />
                        </div>
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
                                <input
                                    type="text"
                                    value={location}
                                    onChange={handleLocationChange}
                                    className="location-input"
                                />
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
                        <button className="btn btn--ghost" type="button" onClick={handleLogout}>Log out</button>
                    </section>
                    {/* Content area */}
                    <section className="content">
                        {active === "posts" && (
                            <div className="grid">
                                {posts.length === 0 ? (
                                    // Skeletons or empty state
                                    [1, 2, 3, 4, 5, 6].map((i) => (
                                        <article key={i} className="post card">
                                            <div className="post__media skeleton"/>
                                            <div className="post__body">
                                                <div className="skeleton skeleton--line"/>
                                                <div className="skeleton skeleton--line w-70"/>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    posts.map((post) => (
                                        <article key={post.id} className="post card">
                                            {post.imageData && (
                                                <img
                                                    src={`data:image/png;base64,${post.imageData}`}
                                                    alt="Post"
                                                    className="post__media"
                                                    style={{maxWidth: "100%", borderRadius: "12px", marginBottom: "8px"}}
                                                />
                                            )}
                                            <div className="post__body">
                                                <div><strong>{post.author.username}</strong></div>
                                                <div>{post.content}</div>
                                                <div style={{fontSize: "0.8em", color: "#888"}}>{post.createdAt}</div>
                                            </div>
                                        </article>
                                    ))
                                )}
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
                </main>
            </div>
        </div>
    );
}
