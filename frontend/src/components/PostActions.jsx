import React, {useEffect, useState} from 'react';
import {API_BASE_URL} from "../config.js";
import './PostActions.css'

export default function PostActions({
                                        post,
                                        user,
                                        comments,
                                        setComments,
                                        setShowCommentsFor,
                                        showCommentsFor,
                                        avatars,
                                        newComment,
                                        setNewComment,
                                        postingComment,
                                        setPostingComment,
                                        setPosts
                                    }) {
    const [communityNotes, setCommunityNotes] = useState([]);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showAllNotesModal, setShowAllNotesModal] = useState(false);
    const [noteContent, setNoteContent] = useState("");
    const [postingNote, setPostingNote] = useState(false);

    useEffect(() => {
        // Fetch all notes, not just approved ones
        fetch(`${API_BASE_URL}/api/notes/post/${post.id}/all`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(setCommunityNotes)
            .catch(() => setCommunityNotes([]));
    }, [post.id]);

    // Sort notes by helpfulness ratio, regardless of status
    const sortedNotes = [...communityNotes].sort((a, b) =>
        (b.helpfulVotes + b.notHelpfulVotes === 0 ? 0 : b.helpfulVotes / (b.helpfulVotes + b.notHelpfulVotes)) -
        (a.helpfulVotes + a.notHelpfulVotes === 0 ? 0 : a.helpfulVotes / (a.helpfulVotes + a.notHelpfulVotes))
    );

    const topNote = sortedNotes.length > 0 ? sortedNotes[0] : null;

    // Handle note submission
    const handleNoteSubmit = async e => {
        e.preventDefault();
        if (!noteContent.trim()) return;
        setPostingNote(true);
        await fetch(`${API_BASE_URL}/api/notes/submit`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                postId: post.id,
                content: noteContent,
                authorUsername: user.name
            })
        });
        // Refresh notes
        const res = await fetch(`${API_BASE_URL}/api/notes/post/${post.id}/all`, { credentials: "include" });
        const updatedNotes = await res.json();
        setCommunityNotes(updatedNotes);
        setNoteContent("");
        setPostingNote(false);
        setShowNoteModal(false);
    };

    // Vote on a community note
    const voteOnNote = async (noteId, helpful) => {
        await fetch(`${API_BASE_URL}/api/notes/${noteId}/vote?voterUsername=${user.name}&helpful=${helpful}`, {
            method: "POST",
            credentials: "include"
        });
        // Refresh notes
        const res = await fetch(`${API_BASE_URL}/api/notes/post/${post.id}/all`, { credentials: "include" });
        const updatedNotes = await res.json();
        setCommunityNotes(updatedNotes);
    };

    // Get status badge color
    const getStatusBadgeStyle = (status) => {
        switch(status) {
            case "APPROVED": return { background: "#e0ffea", color: "#2a9d5b", border: "1px solid #a3e0c1" };
            case "REJECTED": return { background: "#ffe0e0", color: "#9d2a2a", border: "1px solid #e0a3a3" };
            default: return { background: "#f0f0f0", color: "#777", border: "1px solid #ddd" }; // PENDING
        }
    };

    return (
        <div>
            {topNote && (
                <div className="card" style={{marginBottom: "12px", background: "#f7f7f7", padding: "12px", borderRadius: "8px"}}>
                    <div style={{fontWeight: 600, marginBottom: "4px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div>Community Note by {topNote.author.username} ({new Date(topNote.createdAt).toLocaleString()})</div>
                        <div style={{
                            fontSize: "0.75em",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            ...getStatusBadgeStyle(topNote.status)
                        }}>
                            {topNote.status || "PENDING"}
                        </div>
                    </div>
                    <div className="community-note-text" style={{marginBottom: "6px"}}>
                        {topNote.content}
                    </div>
                    <div style={{fontSize: "0.95em", color: "#555", display: "flex", gap: "12px", alignItems: "center"}}>
                        <button
                            type="button"
                            title="Helpful"
                            style={{background: "none", border: "none", cursor: "pointer", fontSize: "1.1em"}}
                            onClick={() => voteOnNote(topNote.id, true)}
                        >
                            👍 <span className="community-note-votes">{topNote.helpfulVotes}</span>
                        </button>
                        <button
                            type="button"
                            title="Not Helpful"
                            style={{background: "none", border: "none", cursor: "pointer", fontSize: "1.1em"}}
                            onClick={() => voteOnNote(topNote.id, false)}
                        >
                            👎 <span className="community-note-votes">{topNote.notHelpfulVotes}</span>
                        </button>

                        {/* Show button for all notes when there are more than one, regardless of status */}
                        {communityNotes.length > 1 && (
                            <button
                                type="button"
                                style={{marginLeft: "auto", background: "#e0eaff", border: "1px solid #b3c6ff",
                                    borderRadius: "6px", padding: "4px 10px", cursor: "pointer",
                                    color: "#2a4d9b", fontSize: "0.9em"}}
                                onClick={() => setShowAllNotesModal(true)}
                            >
                                See all {communityNotes.length} notes
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* All Notes Modal */}
            {showAllNotesModal && (
                <div className="modal-overlay" onClick={() => setShowAllNotesModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>All Community Notes</h3>
                        <div style={{maxHeight: "400px", overflowY: "auto"}}>
                            {communityNotes.map((note, index) => (
                                <div key={index} style={{
                                    padding: "12px",
                                    borderBottom: index < communityNotes.length - 1 ? "1px solid #eee" : "none",
                                    marginBottom: "10px"
                                }}>
                                    <div style={{fontWeight: 600, marginBottom: "4px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        <div>By {note.author.username} ({new Date(note.createdAt).toLocaleString()})</div>
                                        <div style={{
                                            fontSize: "0.75em",
                                            padding: "2px 8px",
                                            borderRadius: "12px",
                                            ...getStatusBadgeStyle(note.status)
                                        }}>
                                            {note.status || "PENDING"}
                                        </div>
                                    </div>
                                    <div style={{marginBottom: "8px"}}>
                                        {note.content}
                                    </div>
                                    <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                                        <button
                                            type="button"
                                            title="Helpful"
                                            style={{background: "none", border: "none", cursor: "pointer", fontSize: "1.1em"}}
                                            onClick={() => voteOnNote(note.id, true)}
                                        >
                                            👍 <span className="community-note-votes">{note.helpfulVotes}</span>
                                        </button>
                                        <button
                                            type="button"
                                            title="Not Helpful"
                                            style={{background: "none", border: "none", cursor: "pointer", fontSize: "1.1em"}}
                                            onClick={() => voteOnNote(note.id, false)}
                                        >
                                            👎 <span className="community-note-votes">{note.notHelpfulVotes}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAllNotesModal(false)}
                            style={{marginTop: "12px", padding: "6px 14px"}}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            <div className="post__actions" style={{
                display: "flex",
                gap: "18px",
                padding: "12px 16px 10px 16px",
                borderTop: "1px solid var(--primary-light)",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{display: "flex", gap: "18px"}}>
                    <button
                        type="button"
                        title="Comment"
                        style={{background: "none", border: "none", cursor: "pointer"}}
                        onClick={() => setShowCommentsFor(post.id)}
                    >
                        💬 <span style={{fontSize: "0.95em"}}>{comments[post.id]?.length || 0}</span>
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
                <button
                    type="button"
                    title="Post Community Note"
                    style={{
                        background: "#e0eaff",
                        border: "1px solid #b3c6ff",
                        borderRadius: "6px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        color: "#2a4d9b",
                        fontWeight: 600
                    }}
                    onClick={() => setShowNoteModal(true)}
                >
                    + Community Note
                </button>
            </div>
            {showNoteModal && (
                <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>Post a Community Note</h3>
                        <form onSubmit={handleNoteSubmit}>
                            <textarea
                                value={noteContent}
                                onChange={e => setNoteContent(e.target.value)}
                                rows={4}
                                style={{width: "100%", padding: "8px"}}
                                placeholder="Write your community note..."
                                disabled={postingNote}
                            />
                            <button
                                type="submit"
                                disabled={postingNote || !noteContent.trim()}
                                style={{marginTop: "12px"}}
                            >
                                {postingNote ? "Posting..." : "Post Note"}
                            </button>
                        </form>
                        <button onClick={() => setShowNoteModal(false)} style={{marginTop: "12px"}}>Close</button>
                    </div>
                </div>
            )}
            {/* Comments modal remains unchanged */}
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
        </div>
    );
}
