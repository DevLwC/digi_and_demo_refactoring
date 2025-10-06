import React, { useState, useEffect } from 'react';
import './Friends.css';
import { API_BASE_URL } from '../config.js';

// API functions (already implemented)
export async function searchUsers(username) {
    const res = await fetch(`${API_BASE_URL}/api/users/search?username=${encodeURIComponent(username)}`);
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
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary mb-2" onClick={handleSearch}>
                            Search Users
                        </button>
                        {searchError && <div style={{ color: 'red' }}>{searchError}</div>}
                        <ul className="list-group mb-4">
                            {searchResults.map((user, idx) => (
                                <li key={idx} className="list-group-item">{user.username || JSON.stringify(user)}</li>
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
                        <ul className="list-group">
                            {pendingRequests.map((req, idx) => (
                                <li key={idx} className="list-group-item">{req.username || JSON.stringify(req)}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Friends;