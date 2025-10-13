import React from "react"
import {useState, useEffect} from "react";
import "./Profile.css"
import {API_BASE_URL} from "../config.js";
import AvatarModal from "../components/AvatarModal.jsx";

function handleLogout() {
    localStorage.clear();
    fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    }).finally(() => {
        window.location.href = '/login';
    });
}

export default function Profile() {
    const [bio, setBio] = useState(localStorage.getItem('bio') || "No bio set");
    const [location, setLocation] = useState(localStorage.getItem('location') || "");
    const [active, setActive] = useState("posts");
    const [posts, setPosts] = useState([]);
    const [avatarSvg, setAvatarSvg] = useState(null);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);

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
    };

    const tabs = [
        {key: "posts", label: "Posts"},
        {key: "bookmarks", label: "Bookmarks"},
        {key: "replies", label: "Replies"},
    ];

    useEffect(() => {
        // Fetch current user info to ensure session and localStorage are up-to-date
        fetch(`${API_BASE_URL}/api/auth/me`, {credentials: 'include'})
            .then(res => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then(userData => {
                localStorage.setItem('userId', userData.id);
                localStorage.setItem('username', userData.username);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('createdAt', userData.createdAt);
                localStorage.setItem('followersCount', userData.followersCount);
                localStorage.setItem('followingCount', userData.followingCount);
                // Now fetch avatar
                if (userData.id) {
                    fetch(`${API_BASE_URL}/api/users/${userData.id}/avatar`, {
                        credentials: 'include'
                    })
                        .then(res => res.text())
                        .then(svg => setAvatarSvg(svg))
                        .catch(() => setAvatarSvg(null));
                }
            })
            .catch(() => setAvatarSvg(null));
    }, []);


    useEffect(() => {
        if (active === "posts") {
            fetch(`${API_BASE_URL}/api/posts/ownPosts?username=${user.name}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => {
                    setPosts([]);
                    console.error('Error fetching posts:', err)
                });
        }
    }, [active, user.name]);

    useEffect(() => {
        if (active === "bookmarks") {
            const userId = localStorage.getItem('userId');
            fetch(`${API_BASE_URL}/api/users/${userId}/bookmarks`, { credentials: 'include' })
                .then(res => res.json())
                .then(data => setBookmarks(data))
                .catch(err => {
                    setBookmarks([]);
                    console.error('Error fetching bookmarks:', err)
                });
        }
    }, [active]);

    const handleAvatarSelect = async (animal) => {
        const userId = localStorage.getItem('userId');
        await fetch(`${API_BASE_URL}/api/users/updateAvatar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarAnimal: animal }),
            credentials: 'include'
        });
        // Fetch and update avatar SVG
        fetch(`${API_BASE_URL}/api/users/${userId}/avatar`, { credentials: 'include' })
            .then(res => res.text())
            .then(svg => setAvatarSvg(svg))
            .catch(() => setAvatarSvg(null));
        setShowAvatarModal(false);
    };

    return (
        <div className="profile-bg">
            <div className="profile-center-container">
                <main className="profile" role="main">
                    {/* Header card */}
                    <section className="card card--header" aria-label="Profile header">
                        <div className="header__row">
                            <div className="header__left">
                                {/* Animal avatar */}
                                <div
                                    className="avatar avatar--animal"
                                    aria-hidden="true"
                                    style={{cursor: "pointer"}}
                                    onClick={() => setShowAvatarModal(true)}
                                >
                                    {avatarSvg ? (
                                        <span dangerouslySetInnerHTML={{__html: avatarSvg}}/>
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                </div>

                                {showAvatarModal && (
                                    <AvatarModal
                                        onSelect={handleAvatarSelect}
                                        onClose={() => setShowAvatarModal(false)}
                                    />
                                )}
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
                                                    style={{
                                                        maxWidth: "100%",
                                                        borderRadius: "12px",
                                                        marginBottom: "8px"
                                                    }}
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
                            <div className="grid">
                                {bookmarks.length === 0 ? (
                                    <div className="empty">
                                        <h3>No bookmarks yet</h3>
                                        <p>Save posts to find them here later.</p>
                                        <button className="btn btn--ghost" type="button">Explore</button>
                                    </div>
                                ) : (
                                    bookmarks.map((post) => (
                                        <article key={post.id} className="post card">
                                            {post.imageData && (
                                                <img
                                                    src={`data:image/png;base64,${post.imageData}`}
                                                    alt="Post"
                                                    className="post__media"
                                                    style={{
                                                        maxWidth: "100%",
                                                        borderRadius: "12px",
                                                        marginBottom: "8px"
                                                }}
                                                />
                                            )}
                                            <div className="post__body">
                                                <div><strong>{post.author.username}</strong></div>
                                                <div>{post.content}</div>
                                                <div style={{fontSize: "0.8em", color: "#888"}}>
                                                    {post.createdAt}
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
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
