import React, {useState, useEffect} from "react"
import "./Dashboard.css"
import "./Profile.css"
import {getCurrentUser} from "../api/auth.js";
import {API_BASE_URL} from "../config.js"; // For card and layout styles


const activity = [
    {icon: "🌱", text: "You earned a new badge: Seedling"},
    {icon: "📝", text: "You posted: 'Decolonizing my mind daily...'"},
    {icon: "🤝", text: "You became friends with Alex"},
    {icon: "🔖", text: "Bookmarked 'Eco-conscious living tips'"},
]


export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [avatarSvg, setAvatarSvg] = useState(null);

    const [posts, setPosts] = useState([]);
    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        getCurrentUser()
            .then(userData => {
                setUser({
                    id: userData.id,
                    name: userData.username,
                    notifications: 3,
                    streak: userData.streakCount,
                });
                if (userData.id) {
                    fetch(`${API_BASE_URL}/api/users/${userData.id}/avatar`, {
                        credentials: 'include'
                    })
                        .then(res => res.text())
                        .then(svg => setAvatarSvg(svg))
                        .catch(() => setAvatarSvg(null));
                }
                // could update the local storage too if needed
            })
            .catch(() => {
                window.location.href="/login";
            });
    }, []);

    useEffect(() => {
        if (user && user.name) {
            fetch(`${API_BASE_URL}/api/posts/feed?username=${user.name}`, { credentials: "include" })
                .then(res => res.json())
                .then(async postsData => {
                    // Fetch avatars for each post author
                    const avatarPromises = postsData.map(post =>
                        fetch(`${API_BASE_URL}/api/users/${post.author.id}/avatar`, { credentials: "include" })
                            .then(res => res.text())
                            .then(svg => ({ id: post.author.id, svg }))
                    );
                    const avatarResults = await Promise.all(avatarPromises);
                    const avatarMap = {};
                    avatarResults.forEach(a => { avatarMap[a.id] = a.svg; });
                    setAvatars(avatarMap);
                    setPosts(postsData);
                });
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>; // or a spinner
    }
    return (
        <div className="dashboard-bg">
            <div className="dashboard-center-container">
                <main className="dashboard" role="main">
                    <section className="card dashboard__welcome">
                        <div className="dashboard__avatar avatar avatar--animal">
                            {avatarSvg ? (
                                <span dangerouslySetInnerHTML={{ __html: avatarSvg }} />
                            ) : (
                                <span>Loading...</span>
                            )}
                        </div>
                        <div>
                            <h2 className="dashboard__greeting">Welcome back, <span
                                className="dashboard__name">{user.name}</span>!</h2>
                            <div className="dashboard__streak">
                                <span role="img" aria-label="Streak">🔥</span> {user.streak} day streak
                            </div>
                        </div>
                        <div className="dashboard__notifications">
                            <span className="badge">{user.notifications} new</span>
                        </div>
                    </section>

                    <section className="card dashboard__activity">
                        <h3>Recent Activity</h3>
                        <ul>
                            {activity.map((a, i) => (
                                <li key={i}><span className="dashboard__activity-icon">{a.icon}</span> {a.text}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Posts feed */}
                    <section className="dashboard__feed">
                        <h3 style={{marginBottom: "12px", color: "var(--primary)"}}>Feed</h3>
                        <div className="grid">
                            {posts.map((post, i) => (
                                <article key={i} className="post card">
                                    <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "16px"}}>
                                        <div className="avatar avatar--animal" style={{width: 48, height: 48}}>
                                            {avatars[post.author.id] ?
                                                <span dangerouslySetInnerHTML={{ __html: avatars[post.author.id] }} /> :
                                                <span>🐾</span>
                                            }
                                        </div>
                                        <div>
                                            <div style={{fontWeight: 600, color: "var(--text)"}}>{post.author.username}</div>
                                            <div style={{fontSize: "0.95rem", color: "var(--muted)"}}>
                                                {new Date(post.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post__body" style={{paddingTop: 0}}>
                                        {post.content}
                                        {post.imageData &&
                                            <img
                                                src={`data:image/png;base64,${post.imageData}`}
                                                alt="Post"
                                                style={{maxWidth: "100%", marginTop: "12px"}}
                                            />
                                        }
                                    </div>
                                    {/* Actions can stay unchanged */}
                                    <div className="post__actions" style={{
                                        display: "flex",
                                        gap: "18px",
                                        padding: "12px 16px 10px 16px",
                                        borderTop: "1px solid var(--primary-light)",
                                        alignItems: "center"
                                    }}>
                                        <button type="button" title="Comment"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            💬 <span style={{fontSize: "0.95em"}}>0</span>
                                        </button>
                                        <button
                                            type="button"
                                            title="Like"
                                            style={{background: "none", border: "none", cursor: "pointer"}}
                                            onClick={() => {
                                                fetch(`${API_BASE_URL}/api/posts/${post.id}/like?username=${user.name}`, {
                                                    method: "POST",
                                                    credentials: "include"
                                                })
                                                    .then(res => {
                                                        if (res.ok) {
                                                            setPosts(prevPosts =>
                                                                prevPosts.map(p =>
                                                                    p.id === post.id
                                                                        ? { ...p, likeCount: p.likeCount + 1 }
                                                                        : p
                                                                )
                                                            );
                                                        }
                                                    });
                                            }}
                                        >
                                            ❤️ <span style={{fontSize: "0.95em"}}>{post.likeCount}</span>
                                        </button>
                                        <button type="button" title="Share"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            🔁
                                        </button>
                                        <button type="button" title="Upvote"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            👍 <span style={{fontSize: "0.95em"}}>0</span>
                                        </button>
                                        <button type="button" title="Downvote"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            👎 <span style={{fontSize: "0.95em"}}>0</span>
                                        </button>
                                        <button type="button" title="Bookmark"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            🔖
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}