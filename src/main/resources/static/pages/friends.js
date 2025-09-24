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