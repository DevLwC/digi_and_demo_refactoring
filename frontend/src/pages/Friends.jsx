import React, {useState, useEffect, useRef} from "react";
import "./Friends.css";

const AnimalAvatars = {
    dog: <span style={{fontSize: 32}}>🐶</span>,
    cat: <span style={{fontSize: 32}}>🐱</span>,
    fox: <span style={{fontSize: 32}}>🦊</span>,
    rabbit: <span style={{fontSize: 32}}>🐰</span>,
    owl: <span style={{fontSize: 32}}>🦉</span>,
};

const mockChats = [
    {user: "Alex", avatar: "cat", messages: ["Hey!", "How are you?"]},
    {user: "Samira", avatar: "fox", messages: ["Let's meet at the eco-market!"]},
];

const mockSearchResults = [
    {username: "Jordan", avatar: "rabbit", isFriend: false},
    {username: "Maya", avatar: "owl", isFriend: true},
];

const mockRequests = [
    {id: 1, username: "Lena", avatar: "cat", email: "lena@mail.com", time: "2h ago"},
    {id: 2, username: "Chris", avatar: "dog", email: "chris@mail.com", time: "5h ago"},
];

export default function Friends() {
    const [activeTab, setActiveTab] = useState("chats");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(mockSearchResults);
    const [chatUser, setChatUser] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [friendUsername, setFriendUsername] = useState("");
    const [pendingRequests, setPendingRequests] = useState(mockRequests);

    // Simulate chat selection
    useEffect(() => {
        if (chatUser) {
            const chat = mockChats.find(c => c.user === chatUser);
            setChatMessages(chat ? chat.messages : []);
        } else {
            setChatMessages([]);
        }
    }, [chatUser]);

    // Simulate search
    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim()) {
            setSearchResults(mockSearchResults.filter(u =>
                u.username.toLowerCase().includes(e.target.value.toLowerCase())
            ));
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="friends-bg">
            <main className="friends" role="main">
                <nav className="tabs" aria-label="Friends sections">
                    {["chats", "searches", "requests"].map(tab => (
                        <button
                            key={tab}
                            className={`tab${activeTab === tab ? " is-active" : ""}`}
                            aria-current={activeTab === tab ? "page" : undefined}
                            onClick={() => setActiveTab(tab)}
                            type="button"
                        >
                            {tab === "chats" ? "Chats" : tab === "searches" ? "Search" : "Requests"}
                        </button>
                    ))}
                </nav>
                <section className="content">
                    {activeTab === "chats" && (
                        <div className="card">
                            <h3 style={{marginBottom: 16, color: "var(--primary)"}}>Chats</h3>
                            <select
                                className="form-control"
                                value={chatUser}
                                onChange={e => setChatUser(e.target.value)}
                            >
                                <option value="">Select user</option>
                                {mockChats.map((c, i) => (
                                    <option key={i} value={c.user}>{c.user}</option>
                                ))}
                            </select>
                            <ul style={{marginTop: 16}}>
                                {chatMessages.map((msg, idx) => (
                                    <li key={idx} style={{marginBottom: 8}}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === "searches" && (
                        <div className="card">
                            <h3 style={{marginBottom: 16, color: "var(--primary)"}}>Search Users</h3>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search username"
                                value={searchTerm}
                                onChange={handleSearchInput}
                            />
                            <div>
                                {searchResults.map((user, idx) => (
                                    <div className="SearchResultCard" key={idx}>
                                        <div className="SearchResultAvatar">
                                            {AnimalAvatars[user.avatar] || <span>🐾</span>}
                                        </div>
                                        <div className="SearchResultName">{user.username}</div>
                                        {user.isFriend ? (
                                            <div className="SearchResultStatus">✓ Friend</div>
                                        ) : (
                                            <button className="SearchResultBtn">
                                                <span role="img" aria-label="add">👥</span> Add
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === "requests" && (
                        <div className="card">
                            <h3 style={{marginBottom: 16, color: "var(--primary)"}}>Friend Requests</h3>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Friend's username"
                                value={friendUsername}
                                onChange={e => setFriendUsername(e.target.value)}
                            />
                            <div style={{marginTop: 16}}>
                                {pendingRequests.map((req, idx) => (
                                    <div key={idx} className="RequestCard">
                                        <div className="RequestAvatar">
                                            {AnimalAvatars[req.avatar] || <span>🧑‍🦱</span>}
                                        </div>
                                        <div className="RequestInfo">
                                            <div className="RequestName">{req.username}</div>
                                            <div className="RequestUsername">{req.email}</div>
                                            <div className="RequestTime">{req.time}</div>
                                        </div>
                                        <div className="RequestActions">
                                            <button className="RequestBtn" title="Accept">&#10003;</button>
                                            <button className="RequestBtn decline" title="Decline">&#10005;</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}