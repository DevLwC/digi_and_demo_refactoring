import React, {useState, useEffect} from "react"
import "./Dashboard.css"
import "./Profile.css"
import {getCurrentUser} from "../api/auth.js"
import {API_BASE_URL} from "../config.js"

const activity = [
    {icon: "🌱", text: "You earned a new badge: Seedling"},
    {icon: "📝", text: "You posted: 'Decolonizing my mind daily...'"},
    {icon: "🤝", text: "You became friends with Alex"},
    {icon: "🔖", text: "Bookmarked 'Eco-conscious living tips'"},
]

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [avatarSvg, setAvatarSvg] = useState(null)
    const [posts, setPosts] = useState([])
    const [avatars, setAvatars] = useState({})
    const [authError, setAuthError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState({})
    const [showCommentsFor, setShowCommentsFor] = useState(null)
    const [newComment, setNewComment] = useState("")
    const [postingComment, setPostingComment] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCurrentUser()
            .then(userData => {
                if (!userData) {
                    throw new Error("No user data received")
                }

                setUser({
                    id: userData.id,
                    name: userData.username,
                    notifications: 3,
                    streak: userData.streakCount || 0,
                })

                if (userData.id) {
                    return fetch(`${API_BASE_URL}/api/users/${userData.id}/avatar`, {
                        credentials: 'include'
                    })
                        .then(res => res.text())
                        .then(svg => setAvatarSvg(svg))
                        .catch(err => {
                            console.error("Failed to fetch avatar:", err)
                            setAvatarSvg(null)
                        })
                }
            })
            .catch((error) => {
                console.error("Authentication error:", error)
                setAuthError(true)
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (user && user.name) {
            fetch(`${API_BASE_URL}/api/posts/feed?username=${user.name}`, { credentials: "include" })
                .then(res => res.json())
                .then(async postsData => {
                    try {
                        const avatarPromises = postsData.map(post =>
                            fetch(`${API_BASE_URL}/api/users/${post.author.id}/avatar`, { credentials: "include" })
                                .then(res => res.text())
                                .then(svg => ({ id: post.author.id, svg }))
                                .catch(() => ({ id: post.author.id, svg: null }))
                        )
                        const avatarResults = await Promise.all(avatarPromises)
                        const avatarMap = {}
                        avatarResults.forEach(a => { avatarMap[a.id] = a.svg })
                        setAvatars(avatarMap)
                        setPosts(postsData)
                        const commentPromises = postsData.map(post =>
                            fetch(`${API_BASE_URL}/api/posts/${post.id}/comments`, { credentials: "include" })
                                .then(res => res.json())
                                .then(comments => ({ postId: post.id, comments }))
                                .catch(() => ({ postId: post.id, comments: [] }))
                        );
                        const commentResults = await Promise.all(commentPromises);
                        const commentMap = {};
                        commentResults.forEach(c => { commentMap[c.postId] = c.comments });
                        setComments(commentMap);
                    } catch (err) {
                        console.error("Error processing posts data:", err)
                    }
                })
                .catch(err => console.error("Error fetching posts:", err))
        }
    }, [user])

    if (loading) {
        return (
            <div className="dashboard-bg">
                <div className="dashboard-center-container">
                    <div>Loading...</div>
                </div>
            </div>
        )
    }

    if (authError) {
        return (
            <div className="dashboard-bg">
                <div className="dashboard-center-container">
                    <div>
                        {error ? `Error: ${error}` : 'Please'} <a href="/login">login</a> to view your dashboard
                    </div>
                </div>
            </div>
        )
    }

    // Safety check - make sure user exists before rendering content
    if (!user) {
        return (
            <div className="dashboard-bg">
                <div className="dashboard-center-container">
                    <div>Unable to load user data. Please <a href="/login">login</a> again.</div>
                </div>
            </div>
        )
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
                                <span>🐾</span>
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

                    <section className="dashboard__feed">
                        <h3 style={{marginBottom: "12px", color: "var(--primary)"}}>Feed</h3>
                        <div className="grid">
                            {posts.length > 0 ? posts.map((post, i) => (
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
                                    <div className="post__actions" style={{
                                        display: "flex",
                                        gap: "18px",
                                        padding: "12px 16px 10px 16px",
                                        borderTop: "1px solid var(--primary-light)",
                                        alignItems: "center"
                                    }}>
                                        <button
                                            type="button"
                                            title="Comment"
                                            style={{background: "none", border: "none", cursor: "pointer"}}
                                            onClick={() => setShowCommentsFor(post.id)}
                                        >
                                            💬 <span style={{fontSize: "0.95em"}}>{comments[post.id]?.length || 0}</span>
                                        </button>
                                        {showCommentsFor && (
                                            <div className="modal-overlay" onClick={() => setShowCommentsFor(null)}>
                                                <div className="modal" onClick={e => e.stopPropagation()}>
                                                    <h3>Comments</h3>
                                                    <ul>
                                                        {comments[showCommentsFor]
                                                            ?.sort((a, b) => b.likeCount - a.likeCount)
                                                            .map((comment, idx) => (
                                                                <li key={idx}>
                                                                    <div>
                                                                        <strong>{comment.author.username}</strong>
                                                                        {" "}
                                                                        <button
                                                                            type="button"
                                                                            title="Like comment"
                                                                            style={{
                                                                                background: "none",
                                                                                border: "none",
                                                                                cursor: "pointer",
                                                                                color: "#e0245e",
                                                                                marginLeft: "8px"
                                                                            }}
                                                                            onClick={async () => {
                                                                                await fetch(`${API_BASE_URL}/api/posts/comments/${comment.id}/like?username=${user.name}`, {
                                                                                    method: "POST",
                                                                                    credentials: "include"
                                                                                });
                                                                                // Refresh comments for this post
                                                                                const res = await fetch(`${API_BASE_URL}/api/posts/${showCommentsFor}/comments`, { credentials: "include" });
                                                                                const updatedComments = await res.json();
                                                                                setComments(prev => ({ ...prev, [showCommentsFor]: updatedComments }));
                                                                            }}
                                                                        >
                                                                            ❤️
                                                                        </button>
                                                                        <span style={{marginLeft: "4px"}}>{comment.likeCount}</span>
                                                                    </div>
                                                                    <div>{comment.content}</div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>

                                                    <form
                                                        style={{marginTop: "16px"}}
                                                        onSubmit={async e => {
                                                            e.preventDefault();
                                                            if (!newComment.trim()) return;
                                                            setPostingComment(true);
                                                            await fetch(`${API_BASE_URL}/api/posts/${showCommentsFor}/comments`, {
                                                                method: "POST",
                                                                credentials: "include",
                                                                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                                                body: new URLSearchParams({
                                                                    authorUsername: user.name,
                                                                    content: newComment
                                                                })
                                                            });
                                                            // Refresh comments for this post
                                                            const res = await fetch(`${API_BASE_URL}/api/posts/${showCommentsFor}/comments`, { credentials: "include" });
                                                            const updatedComments = await res.json();
                                                            setComments(prev => ({ ...prev, [showCommentsFor]: updatedComments }));
                                                            setNewComment("");
                                                            setPostingComment(false);
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            value={newComment}
                                                            onChange={e => setNewComment(e.target.value)}
                                                            placeholder="Write a comment..."
                                                            style={{width: "80%", padding: "8px"}}
                                                            disabled={postingComment}
                                                        />
                                                        <button type="submit" disabled={postingComment || !newComment.trim()} style={{marginLeft: "8px"}}>
                                                            Post
                                                        </button>
                                                    </form>
                                                    <button onClick={() => setShowCommentsFor(null)} style={{marginTop: "12px"}}>Close</button>
                                                </div>
                                            </div>
                                        )}
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
                                                            )
                                                        }
                                                    })
                                                    .catch(err => console.error("Error liking post:", err))
                                            }}
                                        >
                                            ❤️ <span style={{fontSize: "0.95em"}}>{post.likeCount}</span>
                                        </button>
                                        <button type="button" title="Share"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            🔁
                                        </button>
                                        <button
                                            type="button"
                                            title="Bookmark"
                                            style={{background: "none", border: "none", cursor: "pointer"}}
                                            onClick={() => {
                                                fetch(`${API_BASE_URL}/api/users/bookmark`, {
                                                    method: "POST",
                                                    headers: { 'Content-Type': 'application/json' },
                                                    credentials: "include",
                                                    body: JSON.stringify({ postId: post.id })
                                                }).catch(err => console.error("Error bookmarking post:", err))
                                            }}
                                        >
                                            🔖
                                        </button>
                                    </div>
                                </article>
                            )) : (
                                <div className="post card">
                                    <p style={{padding: "16px"}}>No posts found in your feed.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
