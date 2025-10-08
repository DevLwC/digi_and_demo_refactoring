import React, {useState} from 'react'
import './Posts.css'

function Posts() {
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('Post creation not implemented yet.')
        setContent('')
        setImage(null)
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