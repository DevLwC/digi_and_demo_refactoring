document.addEventListener('DOMContentLoaded', async function () {
    // Fetch current user info
    const res = await fetch('/api/auth/me');
    if (!res.ok) return;
    const user = await res.json();
    const username = user.username;

    const feedRes = await fetch(`/api/posts/feed?username=${encodeURIComponent(username)}`);
    const posts = await feedRes.json();
    const ul = document.getElementById('postFeed');
    ul.innerHTML = '';
    posts.forEach(p => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<b>${p.author.username}</b>: ${p.content} <br><small>${p.createdAt}</small>`;
        ul.appendChild(li);
    });
});



// Send chat message
document.getElementById('sendMessageForm').onsubmit = async function(e) {
    e.preventDefault();
    const sender = document.getElementById('chatSender').value;
    const receiver = document.getElementById('chatReceiver').value;
    const content = document.getElementById('chatContent').value;
    const res = await fetch(`/api/chat/send?senderUsername=${encodeURIComponent(sender)}&receiverUsername=${encodeURIComponent(receiver)}&content=${encodeURIComponent(content)}`, {method: 'POST'});
    alert(res.ok ? 'Message sent!' : 'Error sending message');
};

// Show chat
document.getElementById('fetchChatForm').onsubmit = async function(e) {
    e.preventDefault();
    const user1 = document.getElementById('chatUser1').value;
    const user2 = document.getElementById('chatUser2').value;
    const res = await fetch(`/api/chat/messages?user1=${encodeURIComponent(user1)}&user2=${encodeURIComponent(user2)}`);
    const messages = await res.json();
    const ul = document.getElementById('chatMessages');
    ul.innerHTML = '';
    messages.forEach(m => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<b>${m.sender.username}</b>: ${m.content} <br><small>${m.timestamp}</small>`;
        ul.appendChild(li);
    });
};
