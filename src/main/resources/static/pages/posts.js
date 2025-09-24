// Create post
document.getElementById('createPostForm').onsubmit = async function(e) {
    e.preventDefault();
    const author = document.getElementById('postAuthor').value;
    const content = document.getElementById('postContent').value;
    const res = await fetch(`/api/posts/create?authorUsername=${encodeURIComponent(author)}&content=${encodeURIComponent(content)}`, {method: 'POST'});
    alert(res.ok ? 'Post created!' : 'Error creating post');
};