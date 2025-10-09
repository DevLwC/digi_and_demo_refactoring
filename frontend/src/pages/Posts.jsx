import React, {useState} from 'react'
import './Posts.css'
import {API_BASE_URL} from "../config.js";

function Posts() {
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('authorUsername', localStorage.getItem('username'));
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        const res = await fetch(`${API_BASE_URL}/api/posts/create`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        const data = await res.json();
        if (res.ok) {
            setMessage('Post created successfully!');
            setContent('');
            setImage(null);
        } else {
            setMessage(data.error || 'Failed to create post.');
        }
    }

    return (
        <div className="posts-bg">
            <div className="posts-center-container">
                <section className="card">
                    <h2 style={{marginBottom: 24, color: "var(--primary)"}}>Create a Post</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="upload-area">
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        borderRadius: '16px',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <span style={{color: "var(--muted)"}}>Click or drag to upload an image</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={handleImageChange}
                            />
                        </label>
                        <textarea
                            className="form-control"
                            placeholder="What's on your mind?"
                            required
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <button className="btn" type="submit">
                            Create Post
                        </button>
                    </form>
                    {message && <div className="alert">{message}</div>}
                </section>
            </div>
        </div>
    )
}

export default Posts