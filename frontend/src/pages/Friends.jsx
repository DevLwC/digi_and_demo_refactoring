import React, { useState } from 'react';
import './Friends.css';

function Friends() {
    const [activeTab, setActiveTab] = useState('chats');

    return (
        <div className="Friends">
            <div className="TabBar">
                <button
                    className={activeTab === 'chats' ? 'active' : ''}
                    onClick={() => setActiveTab('chats')}
                >
                    Chats
                </button>
                <button
                    className={activeTab === 'searches' ? 'active' : ''}
                    onClick={() => setActiveTab('searches')}
                >
                    Searches
                </button>
                <button
                    className={activeTab === 'requests' ? 'active' : ''}
                    onClick={() => setActiveTab('requests')}
                >
                    Friend Requests
                </button>
            </div>
            <div className="TabContent">
                {activeTab === 'chats' && <div>Chats content goes here.</div>}
                {activeTab === 'searches' && <div>Searches content goes here.</div>}
                {activeTab === 'requests' && <div>Pending incoming and outgoing friend requests go here.</div>}
            </div>
        </div>
    );
}

export default Friends;
