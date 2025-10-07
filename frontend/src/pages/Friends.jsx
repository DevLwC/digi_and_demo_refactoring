import React, {useState, useEffect, useRef} from 'react';
import './Friends.css';
import { API_BASE_URL } from '../config.js';

export async function searchUsers(username) {
    const res = await fetch(`${API_BASE_URL}/api/users/search?username=${encodeURIComponent(username)}`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to search users');
    return await res.json();
}


export async function sendChatMessage(receiver, message) {
    const res = await fetch(`${API_BASE_URL}/api/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiver, message })
    });
    if (!res.ok) throw new Error('Failed to send message');
    return await res.json();
}

export async function getChatMessages(user) {
    const res = await fetch(`${API_BASE_URL}/api/chat/messages?user=${encodeURIComponent(user)}`);
    if (!res.ok) throw new Error('Failed to get chat messages');
    return await res.json();
}

export async function sendFriendRequest(senderUsername, receiverUsername) {
    const res = await fetch(`${API_BASE_URL}/api/friends/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderUsername, receiverUsername })
    });
    if (!res.ok) throw new Error('Failed to send friend request');
    return await res.json();
}

export async function getPendingRequests(receiverUsername) {
    const res = await fetch(`${API_BASE_URL}/api/friends/requests?receiverUsername=${encodeURIComponent(receiverUsername)}`);
    if (!res.ok) throw new Error('Failed to get pending requests');
    return await res.json();
}
export async function respondToFriendRequest(requestId, status) {
    const res = await fetch(`${API_BASE_URL}/api/friends/respond?requestId=${requestId}&status=${status}`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to respond to request');
    return await res.json();
}


// TODO: make an api call to get the profile pricture for the displaying
function getAvatar(avatarUrl, username) {
    if (avatarUrl) {
        return <img src={avatarUrl} alt={username} className="RequestAvatar" />;
    }
    // Placeholder: use emoji or a default image
    return (
        <div className="RequestAvatar" style={{ fontSize: 32 }}>
            🧑‍🦱
        </div>
    );
}

function Friends() {
    const [activeTab, setActiveTab] = useState('chats');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');

    const [receiver, setReceiver] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [chatError, setChatError] = useState('');

    const [friendUsername, setFriendUsername] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [requestError, setRequestError] = useState('');
    const [sendRequestStatus, setSendRequestStatus] = useState('');

    const tabs = [
        { key: 'chats', label: 'Chats' },
        { key: 'searches', label: 'Searches' },
        { key: 'requests', label: 'Friend Requests' }
    ];

    // Fetch pending requests when "requests" tab is active
    useEffect(() => {
        if (activeTab === 'requests') {
            setRequestError('');
            const username = localStorage.getItem('username');
            getPendingRequests(username) //should be my username from auth context
                .then(data => setPendingRequests(data))
                .catch(err => setRequestError(err.message));
        }
    }, [activeTab]);

    // Handlers for API calls
    const handleSearch = async () => {
        setSearchError('');
        try {
            const data = await searchUsers(searchTerm);
            setSearchResults(data);
        } catch (err) {
            setSearchError(err.message);
        }
    };

    const handleShowChat = async () => {
        setChatError('');
        try {
            const data = await getChatMessages(receiver);
            setChatMessages(data);
        } catch (err) {
            setChatError(err.message);
        }
    };

    const handleSendFriendRequest = async () => {
        setSendRequestStatus('');
        setRequestError('');
        try {
            const currentUser = "1234";
            await sendFriendRequest(currentUser, friendUsername);
            setSendRequestStatus('Request sent!');
        } catch (err) {
            setRequestError(err.message);
        }
    };

    // In Friends component
    const handleRespondToRequest = async (requestId, status) => {
        try {
            await respondToFriendRequest(requestId, status);
            // Refresh requests
            const updated = await getPendingRequests(localStorage.getItem('username'));
            setPendingRequests(updated);
        } catch (err) {
            setRequestError('Failed to respond to request');
        }
    };
    const searchTimeout = useRef();

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearchError('');
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            if (value.trim()) {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        }, 300); // 300ms debounce
    };

    return (
        <div className="Friends">
            <nav className="tabs" aria-label="Friends sections">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`tab${activeTab === tab.key ? ' is-active' : ''}`}
                        aria-current={activeTab === tab.key ? 'page' : undefined}
                        onClick={() => setActiveTab(tab.key)}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="TabContent">
                {activeTab === 'chats' && (
                    <div>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Receiver username"
                            value={receiver}
                            onChange={e => setReceiver(e.target.value)}
                        />
                        <button className="btn btn-primary mb-2" onClick={handleShowChat}>
                            Get Chat Messages
                        </button>
                        {chatError && <div style={{ color: 'red' }}>{chatError}</div>}
                        <ul className="list-group mb-4">
                            {chatMessages.map((msg, idx) => (
                                <li key={idx} className="list-group-item">{msg.text || JSON.stringify(msg)}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'searches' && (
                    <div>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Search username"
                            value={searchTerm}
                            onChange={handleSearchInput}
                        />
                        {searchError && <div style={{ color: 'red' }}>{searchError}</div>}
                        <ul className="list-group mb-4">
                            {searchResults.map((user, idx) => (
                                <div className="SearchResultCard">
                                    <div className="SearchResultAvatar">
                                        {/* Avatar image or emoji */}
                                        <img src={getAvatar(user.username)} alt={user.username} />
                                    </div>
                                    <div className="SearchResultInfo">
                                        <div className="SearchResultName">{user.username}</div>
                                    </div>
                                    {user.isFriend ? (
                                        <div className="SearchResultStatus">✓ Friend</div>
                                    ) : (
                                        <button className="SearchResultBtn">
                                            <span role="img" aria-label="add">👥</span> Add
                                        </button>
                                    )}
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'requests' && (
                    <div>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Friend's username"
                            value={friendUsername}
                            onChange={e => setFriendUsername(e.target.value)}
                        />
                        <button className="btn btn-primary mb-2" onClick={handleSendFriendRequest}>
                            Send Friend Request
                        </button>
                        {sendRequestStatus && <div style={{ color: 'green' }}>{sendRequestStatus}</div>}
                        {requestError && <div style={{ color: 'red' }}>{requestError}</div>}
                        <div>
                            {pendingRequests.map((req, idx) => (
                                <div key={idx} className="RequestCard">
                                    {getAvatar(req.avatarUrl, req.username)}
                                    <div className="RequestInfo">
                                        <div className="RequestName">{req.username}</div>
                                        <div className="RequestUsername">{req.email}</div>
                                        <div className="RequestTime">{req.time ? timeAgo(req.time) : "just now"}</div>
                                    </div>
                                    <div className="RequestActions">
                                        <button
                                            className="RequestBtn"
                                            title="Accept"
                                            onClick={() => handleRespondToRequest(req.id, "ACCEPTED")}
                                        >&#10003;</button>
                                        <button
                                            className="RequestBtn decline"
                                            title="Decline"
                                            onClick={() => handleRespondToRequest(req.id, "DECLINED")}
                                        >&#10005;</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Friends;