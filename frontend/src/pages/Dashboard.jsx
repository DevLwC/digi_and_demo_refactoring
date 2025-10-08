import React from "react"
import "./Dashboard.css"
import "./Profile.css" // For card and layout styles

// Reuse animal avatars from Profile.jsx
const AnimalAvatars = {
    dog: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img"
             aria-label="Dog avatar">
            <ellipse cx="32" cy="36" rx="22" ry="20" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="24" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="40" cy="36" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="32" cy="46" rx="6" ry="3" fill="#f9d29d"/>
            <ellipse cx="12" cy="24" rx="6" ry="12" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
            <ellipse cx="52" cy="24" rx="6" ry="12" fill="#f9d29d" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
    // Add other animals if needed
    cat: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img"
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
    fox: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img"
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
    rabbit: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img"
             aria-label="Rabbit avatar">
            <ellipse cx="32" cy="40" rx="18" ry="16" fill="#fff7f0" stroke="#e67e22" strokeWidth="3"/>
            <ellipse cx="24" cy="44" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="40" cy="44" rx="3" ry="4" fill="#2c3e50"/>
            <ellipse cx="32" cy="52" rx="6" ry="3" fill="#f9d29d"/>
            <rect x="22" y="8" width="6" height="24" rx="3" fill="#fff7f0" stroke="#e67e22" strokeWidth="2"/>
            <rect x="36" y="8" width="6" height="24" rx="3" fill="#fff7f0" stroke="#e67e22" strokeWidth="2"/>
        </svg>
    ),
    owl: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img"
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

const user = {
    name: localStorage.getItem('username'),
    avatarAnimal: "dog",
    notifications: 3,
    streak: localStorage.getItem('streakCount'),
}

const activity = [
    {icon: "🌱", text: "You earned a new badge: Seedling"},
    {icon: "📝", text: "You posted: 'Decolonizing my mind daily...'"},
    {icon: "🤝", text: "You became friends with Alex"},
    {icon: "🔖", text: "Bookmarked 'Eco-conscious living tips'"},
]

// Placeholder posts feed
const posts = [
    {
        user: {name: "Alex", avatarAnimal: "cat"},
        content: "Just planted my first tomato! 🍅🌱",
        time: "2h ago"
    },
    {
        user: {name: "Samira", avatarAnimal: "fox"},
        content: "Eco-market this weekend was amazing. Got some local honey! 🦊🍯",
        time: "4h ago"
    },
    {
        user: {name: "Jordan", avatarAnimal: "rabbit"},
        content: "Reading about radical softness. Anyone got book recs? 🐇📚",
        time: "6h ago"
    },
    {
        user: {name: "Maya", avatarAnimal: "owl"},
        content: "Shared a new post: 'Decolonizing my mind daily...' 🦉",
        time: "8h ago"
    },
]

export default function Dashboard() {
    return (
        <div className="dashboard-bg">
            <div className="dashboard-center-container">
                <main className="dashboard" role="main">
                    <section className="card dashboard__welcome">
                        <div className="dashboard__avatar avatar avatar--animal">
                            {AnimalAvatars[user.avatarAnimal]}
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
                                            {AnimalAvatars[post.user.avatarAnimal] || <span>🐾</span>}
                                        </div>
                                        <div>
                                            <div style={{fontWeight: 600, color: "var(--text)"}}>{post.user.name}</div>
                                            <div style={{fontSize: "0.95rem", color: "var(--muted)"}}>{post.time}</div>
                                        </div>
                                    </div>
                                    <div className="post__body" style={{paddingTop: 0}}>
                                        {post.content}
                                    </div>
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
                                        <button type="button" title="Like"
                                                style={{background: "none", border: "none", cursor: "pointer"}}>
                                            ❤️ <span style={{fontSize: "0.95em"}}>0</span>
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