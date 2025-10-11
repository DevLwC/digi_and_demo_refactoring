import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config.js";

export default function AvatarModal({ selectedAvatar, onSelect, onClose }) {
    const [avatars, setAvatars] = useState({});
    const avatarOptions = Object.keys(avatars);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/users/avatars/full`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setAvatars(data))
            .catch(() => setAvatars({}));
    }, []);

    return (
        <div className="modal-overlay" style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div className="modal" style={{
                background: "#fff", padding: "24px", borderRadius: "12px", minWidth: "300px"
            }}>
                <h2>Choose your avatar</h2>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {avatarOptions.map(animal => (
                        <button
                            key={animal}
                            style={{
                                border: selectedAvatar === animal ? "2px solid #007bff" : "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "8px",
                                background: "#f9f9f9",
                                cursor: "pointer"
                            }}
                            onClick={() => onSelect(animal)}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: avatars[animal] || "<span>Loading...</span>" }}
                                style={{ width: "48px", height: "48px", display: "block" }}
                            />
                            <div style={{ textAlign: "center" }}>{animal}</div>
                        </button>
                    ))}
                </div>
                <button
                    className="btn btn--ghost"
                    style={{ marginTop: "16px" }}
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
