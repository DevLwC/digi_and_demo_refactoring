document.addEventListener('DOMContentLoaded', async function () {
    // Fetch current user info
    const res = await fetch('/api/auth/me');
    if (!res.ok) return;
    const user = await res.json();
    const username = user.username;

    document.getElementById('createPostForm').onsubmit = async function(e) {
        e.preventDefault();
        const content = document.getElementById('postContent').value;
        const response = await fetch(`/api/posts/create?authorUsername=${encodeURIComponent(username)}&content=${encodeURIComponent(content)}`, {
            method: 'POST'
        });
        alert(response.ok ? 'Post created!' : 'Error creating post');
        document.getElementById('postContent').value = '';
    };
});
