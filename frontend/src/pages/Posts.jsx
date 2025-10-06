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
        // TODO: Add logic to create a post (API call)
        setMessage('Post creation not implemented yet.')
        setContent('')
        setImage(null)
    }

    return (
        <div className="container-mt-3">
            <div id="posts" role="tabpanel">
                <form className="mb-2" onSubmit={handleSubmit}>
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
                            <span>Click or drag to upload an image</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleImageChange}
                        />
                    </label>
                    <textarea
                        className="form-control mb-2"
                        placeholder="What's on your mind?"
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        Create Post
                    </button>
                </form>
                {message && <div className="alert alert-info mt-2">{message}</div>}
            </div>
        </div>
    )
}

export default Posts
