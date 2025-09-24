// User search
document.getElementById('searchUserForm').onsubmit = async function(e) {
    e.preventDefault();
    const username = document.getElementById('searchUsername').value;
    const res = await fetch(`/api/users/search?username=${encodeURIComponent(username)}`);
    const users = await res.json();
    const ul = document.getElementById('userResults');
    ul.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = u.username + ' (' + u.email + ')';
        ul.appendChild(li);
    });
};

// Friend request
document.getElementById('friendRequestForm').onsubmit = async function(e) {
    e.preventDefault();
    const sender = document.getElementById('friendSender').value;
    const receiver = document.getElementById('friendReceiver').value;
    const res = await fetch(`/api/friends/request?senderUsername=${encodeURIComponent(sender)}&receiverUsername=${encodeURIComponent(receiver)}`, {method: 'POST'});
    alert(res.ok ? 'Request sent!' : 'Error sending request');
};

// Show pending requests
document.getElementById('pendingRequestsForm').onsubmit = async function(e) {
    e.preventDefault();
    const receiver = document.getElementById('pendingReceiver').value;
    const res = await fetch(`/api/friends/requests?receiverUsername=${encodeURIComponent(receiver)}`);
    const requests = await res.json();
    const ul = document.getElementById('pendingRequests');
    ul.innerHTML = '';
    requests.forEach(r => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `From: ${r.sender.username}`;
        const acceptBtn = document.createElement('button');
        acceptBtn.className = 'btn btn-success btn-sm ms-2';
        acceptBtn.textContent = 'Accept';
        acceptBtn.onclick = async () => {
            await fetch(`/api/friends/respond?requestId=${r.id}&status=ACCEPTED`, {method: 'POST'});
            li.remove();
        };
        const declineBtn = document.createElement('button');
        declineBtn.className = 'btn btn-danger btn-sm ms-2';
        declineBtn.textContent = 'Decline';
        declineBtn.onclick = async () => {
            await fetch(`/api/friends/respond?requestId=${r.id}&status=REJECTED`, {method: 'POST'});
            li.remove();
        };
        li.appendChild(acceptBtn);
        li.appendChild(declineBtn);
        ul.appendChild(li);
    });
};

// Create post
document.getElementById('createPostForm').onsubmit = async function(e) {
    e.preventDefault();
    const author = document.getElementById('postAuthor').value;
    const content = document.getElementById('postContent').value;
    const res = await fetch(`/api/posts/create?authorUsername=${encodeURIComponent(author)}&content=${encodeURIComponent(content)}`, {method: 'POST'});
    alert(res.ok ? 'Post created!' : 'Error creating post');
};

// Show feed
document.getElementById('fetchFeedForm').onsubmit = async function(e) {
    e.preventDefault();
    const username = document.getElementById('feedUsername').value;
    const res = await fetch(`/api/posts/feed?username=${encodeURIComponent(username)}`);
    const posts = await res.json();
    const ul = document.getElementById('postFeed');
    ul.innerHTML = '';
    posts.forEach(p => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<b>${p.author.username}</b>: ${p.content} <br><small>${p.createdAt}</small>`;
        ul.appendChild(li);
    });
};

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
