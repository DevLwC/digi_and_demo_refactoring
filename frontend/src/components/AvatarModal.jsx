import React, {useState, useEffect} from 'react';
import {API_BASE_URL} from '../config.js';

export default function AvatarModal({currentAvatar, onAvatarChange, onClose}) {
    const [avatars, setAvatars] = useState({});
    const [selectedAnimal, setSelectedAnimal] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/avatars/full`, {credentials: 'include'})
            .then(res => res.json())
            .then(data => setAvatars(data))
            .catch(() => setAvatars({}));
    }, []);

    const handleSave = async () => {
        if (selectedAnimal && avatars[selectedAnimal]) {
            try {
                await fetch(`${API_BASE_URL}/api/users/updateAvatar`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({avatarAnimal: selectedAnimal}),
                    credentials: 'include'
                });
                onAvatarChange(avatars[selectedAnimal]);
            } catch (error) {
                console.error('Failed to update avatar:', error);
            }
        }
    };

    return (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Choose Your Avatar</h2>
                <button className="modal-close" onClick={onClose}>&times;</button>
            </div>

            <div className="current-avatar">
                <div className="current-avatar-display">
                    {currentAvatar ? (
                        <span dangerouslySetInnerHTML={{__html: currentAvatar}}/>
                    ) : (
                        <span>🐾</span>
                    )}
                </div>
                <div className="current-avatar-label">Current Avatar</div>
            </div>

            <div className="avatar-grid">
                {Object.entries(avatars).map(([animal, svg]) => (
                    <div
                        key={animal}
                        className={`avatar-option ${selectedAnimal === animal ? 'selected' : ''}`}
                        onClick={() => setSelectedAnimal(animal)}
                    >
                        <div className="avatar-option-icon">
                            <span dangerouslySetInnerHTML={{__html: svg}}/>
                        </div>
                        <div className="avatar-option-name">{animal}</div>
                    </div>
                ))}
            </div>

            <div className="modal-actions">
                <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
                <button
                    className="btn btn--primary"
                    onClick={handleSave}
                    disabled={!selectedAnimal}
                >
                    Save Avatar
                </button>
            </div>
        </div>
    );
}