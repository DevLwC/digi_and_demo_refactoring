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
            fetch(`${API_BASE_URL}/api/users/${userId}/bookmarks`, {credentials: 'include'})
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({avatarAnimal: animal}),
            credentials: 'include'
        });
        // Fetch and update avatar SVG
        fetch(`${API_BASE_URL}/api/users/${userId}/avatar`, {credentials: 'include'})
            .then(res => res.text())
            .then(svg => setAvatarSvg(svg))
            .catch(() => setAvatarSvg(null));
        setShowAvatarModal(false);
    };

    return (
        <div className="profile-bg">
            <div className="profile-center-container">
                <main className={`profile ${showAvatarModal ? 'modal-active' : ''}`} role="main">
                    <section className="card card--header">
                        <div className="header__row">
                            <div className="header__left">
                                <div className="avatar avatar--animal" onClick={() => setShowAvatarModal(true)}
                                     style={{cursor: 'pointer'}}>
                                    {avatarSvg ? (
                                        <span dangerouslySetInnerHTML={{__html: avatarSvg}}/>
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                </div>
                                <div>
                                    <h1 className="identity__name">{user.name}</h1>
                                    <div className="identity__meta">
                                        <span className="handle">@{user.handle}</span>
                                        <span className="badge">
                                            <span className="badge__icon">🌱</span>
                                            Eco-champion
                                        </span>
                                    </div>
                                    <div className="stats">
                                        <div>
                                            <div className="stat__value">{user.following}</div>
                                            <div className="stat__label">Following</div>
                                        </div>
                                        <div>
                                            <div className="stat__value">{user.followers}</div>
                                            <div className="stat__label">Followers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header__actions">
                                <button className="btn btn--ghost">Edit profile</button>
                                <button className="btn btn--primary">Message</button>
                            </div>
                        </div>
                        <textarea
                            className="bio"
                            value={bio}
                            onChange={handleBioChange}
                            placeholder="Tell us about yourself..."
                            style={{
                                width: '100%',
                                minHeight: '60px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                lineHeight: '1.4',
                                boxSizing: 'border-box'
                            }}
                        />
                        <ul className="facts">
                            <li>
                                <span role="img" aria-label="Calendar">📅</span>
                                Joined {user.joined}
                            </li>
                            <li>
                                <span role="img" aria-label="Location">📍</span>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={handleLocationChange}
                                    placeholder="Add your location"
                                    className="location-input"
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: 'inherit',
                                        fontSize: 'inherit',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        width: '200px'
                                    }}
                                />
                            </li>
                        </ul>
                        <nav className="tabs" aria-label="Profile sections">
                            {tabs.map(tab => (
                                <button
                                    key={tab.key}
                                    className={`tab${active === tab.key ? " is-active" : ""}`}
                                    aria-current={active === tab.key ? "page" : undefined}
                                    onClick={() => setActive(tab.key)}
                                    type="button"
                                >
                                    {tab.label}
                                </button>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="btn btn--logout"
                                style={{marginLeft: 'auto'}}
                            >
                                Logout
                            </button>
                        </nav>
                    </section>

                    <section className="content">
                        {active === "posts" && (
                            <div className="grid">
                                {posts.length > 0 ? (
                                    posts.map((post, i) => (
                                        <article key={i} className="card post">
                                            {post.imageData && (
                                                <img
                                                    className="post__media"
                                                    src={`data:image/png;base64,${post.imageData}`}
                                                    alt="Post"
                                                    style={{width: "100%", height: "150px", objectFit: "cover"}}
                                                />
                                            )}
                                            <div className="post__body">
                                                <p>{post.content}</p>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="empty">
                                        <p>No posts yet. Share something with the world!</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {active === "bookmarks" && (
                            <div className="grid">
                                {bookmarks.length > 0 ? (
                                    bookmarks.map((bookmark, i) => (
                                        <article key={i} className="card post">
                                            {bookmark.imageData && (
                                                <img
                                                    className="post__media"
                                                    src={`data:image/png;base64,${bookmark.imageData}`}
                                                    alt="Post"
                                                    style={{width: "100%", height: "150px", objectFit: "cover"}}
                                                />
                                            )}
                                            <div className="post__body">
                                                <p>{bookmark.content}</p>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="empty">
                                        <p>No bookmarks yet. Start saving posts you love!</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {active === "replies" && (
                            <div className="empty">
                                <p>No replies yet. Join the conversation!</p>
                            </div>
                        )}
                    </section>
                </main>

                {showAvatarModal && (
                    <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
                        <AvatarModal
                            currentAvatar={avatarSvg}
                            onAvatarChange={(newAvatar) => {
                                setAvatarSvg(newAvatar);
                                setShowAvatarModal(false);
                            }}
                            onClose={() => setShowAvatarModal(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
