import React from "react";
                import Navbar from "../components/Navbar"; // Adjust the path if needed
                import './Profile.css';

                function Profile() {
                    const user = {
                        username: "NiklasStinkt",
                        displayName: "Niklas Stinkt",
                        followersCount: 129,
                        followingCount: 94,
                        status: "Seed",
                    };

                    return (
                        <div className="profile-container">
                            {/* Top navigation bar */}
                            <div className="profile-navbar d-flex align-items-center justify-content-between px-3 py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="brand-icon">
                                        <span role="img" aria-label="leaf">🌿</span>
                                    </div>
                                    <span className="brand-text">Nexus</span>
                                </div>
                                <button className="icon-circle btn btn-light p-0" aria-label="Settings">
                                    {/* settings icon */}
                                </button>
                            </div>

                            {/* Profile header with background */}
                            <div className="profile-header-bg">
                                <div className="avatar-outline profile-avatar">
                                    {/* avatar svg or image */}
                                </div>
                            </div>

                            {/* Profile info card */}
                            <div className="profile-info-card">
                                <div className="profile-displayname">{user.displayName}</div>
                                <div className="profile-username">@{user.username}</div>
                                <div className="profile-status-row">
                                    <span className="text-muted">{user.status}</span>
                                    <span className="status-badge d-inline-flex align-items-center justify-content-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10Z" stroke="#5a845c" strokeWidth="2"/>
                                        </svg>
                                    </span>
                                </div>
                                <div className="profile-stats-row">
                                    <div className="profile-stat">
                                        <div className="profile-stat-value">{user.followersCount}</div>
                                        <div className="profile-stat-label">Followers</div>
                                    </div>
                                    <div className="profile-stat">
                                        <div className="profile-stat-value">{user.followingCount}</div>
                                        <div className="profile-stat-label">Following</div>
                                    </div>
                                </div>
                                <button className="edit-profile-btn">Edit Profile</button>
                            </div>

                            {/* Tabs */}
                            <div className="d-flex justify-content-center gap-5 mt-4 mb-2">
                                <button className="tab-icon active" aria-label="Grid">
                                    {/* grid icon */}
                                </button>
                                <button className="tab-icon" aria-label="Bookmarks">
                                    {/* bookmark icon */}
                                </button>
                                <button className="tab-icon" aria-label="Messages">
                                    {/* message icon */}
                                </button>
                            </div>
                            <div className="border-top mb-3" />
                            <div className="d-flex flex-column gap-3 mb-5">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="skeleton-card rounded-4 p-3">
                                        <div className="skeleton-line mb-2" />
                                        <div className="skeleton-line w-75 mb-2" />
                                        <div className="skeleton-line w-50" />
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Navbar */}
                            <Navbar />
                        </div>
                    );
                }

                export default Profile;
