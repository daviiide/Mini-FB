let posts = [];

// Function to add a new post
function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];
    const imageURL = image ? URL.createObjectURL(image) : '';

    if (title && content) {
        const post = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleString(),
            image: imageURL,
            likes: 0,
            hearts: 0,
            sads: 0
        };

        posts.push(post);
        renderPosts();
        clearForm();
    } else {
        alert('Please fill in both the title and content.');
    }
}

// Function to render posts on the page
function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-date">${post.date}</div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" class="post-image" />` : ''}
            <div class="post-actions">
                <button class="btn btn-like" onclick="likePost(${post.id})">Like (${post.likes})</button>
                <button class="btn btn-heart" onclick="heartPost(${post.id})">❤️ (${post.hearts})</button>
                <button class="btn btn-sad" onclick="sadPost(${post.id})">😢 (${post.sads})</button>
                <button class="btn btn-unlike" onclick="unlikePost(${post.id})">Unlike</button>
                <button class="btn" onclick="editPost(${post.id})">Edit</button>
                <button class="btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

// Function to clear the post form
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
}

// Function to delete a post
function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    renderPosts();
}

// Function to edit a post
function editPost(id) {
    const post = posts.find(post => post.id === id);
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    document.getElementById('image').value = ''; // To handle image separately
    deletePost(id);
}

// Function to like a post
function likePost(id) {
    const post = posts.find(post => post.id === id);
    post.likes += 1;
    renderPosts();
}

// Function to add a heart reaction to a post
function heartPost(id) {
    const post = posts.find(post => post.id === id);
    post.hearts += 1;
    renderPosts();
}

// Function to add a sad reaction to a post
function sadPost(id) {
    const post = posts.find(post => post.id === id);
    post.sads += 1;
    renderPosts();
}

// Function to remove a reaction from a post
function unlikePost(id) {
    const post = posts.find(post => post.id === id);
    if (post.hearts > 0) post.hearts -= 1;
    else if (post.sads > 0) post.sads -= 1;
    else if (post.likes > 0) post.likes -= 1;
    renderPosts();
}

// Function to search posts by title or content
function searchPosts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query));
    renderFilteredPosts(filteredPosts);
}

// Function to render filtered posts
function renderFilteredPosts(filteredPosts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-date">${post.date}</div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" class="post-image" />` : ''}
            <div class="post-actions">
                <button class="btn btn-like" onclick="likePost(${post.id})">Like (${post.likes})</button>
                <button class="btn btn-heart" onclick="heartPost(${post.id})">❤️ (${post.hearts})</button>
                <button class="btn btn-sad" onclick="sadPost(${post.id})">😢 (${post.sads})</button>
                <button class="btn btn-unlike" onclick="unlikePost(${post.id})">Unlike</button>
                <button class="btn" onclick="editPost(${post.id})">Edit</button>
                <button class="btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

// Function to sort posts by date
function sortPostsByDate() {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts();
}

// Function to sort posts by title
function sortPostsByName() {
    posts.sort((a, b) => a.title.localeCompare(b.title));
    renderPosts();
}
