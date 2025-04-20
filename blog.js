// DOM Elements
const postsContainer = document.querySelector('.posts-container');
const categoryLinks = document.querySelectorAll('.categories a');
const createPostBtn = document.getElementById('create-post-btn');
const postModal = document.getElementById('post-modal');
const viewPostModal = document.getElementById('view-post-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const postForm = document.getElementById('post-form');
const singlePostContent = document.getElementById('single-post-content');
const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('header');

// Initialize posts data
function initializePosts() {
    let posts = localStorage.getItem('blogPosts');
    
    if (!posts) {
        localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
        return samplePosts;
    }
    
    return JSON.parse(posts);
}

// Display posts with delete buttons
function displayPosts(posts) {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-posts">No posts found. Create a new post to get started!</div>';
        return;
    }
    
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        
        postCard.innerHTML = `
            <img src="${post.imageUrl || 'https://source.unsplash.com/random/300x200?railway'}" alt="${post.title}">
            <div class="post-card-content">
                <span class="post-category">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.content.substring(0, 100)}...</p>
                <div class="post-meta">
                    <span>${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        
        postCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                viewPost(post);
            }
        });
        postsContainer.appendChild(postCard);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Filter posts by category
function filterPosts(category) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));
    
    if (category === 'all') {
        displayPosts(posts);
    } else {
        const filteredPosts = posts.filter(post => post.category === category);
        displayPosts(filteredPosts);
    }
}

// View single post
function viewPost(post) {
    singlePostContent.innerHTML = `
        <h1>${post.title}</h1>
        <div class="post-info">
            <span class="post-category">${post.category}</span>
            <span>By ${post.author} | ${formatDate(post.date)}</span>
        </div>
        <div class="post-body">
            ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
        </div>
    `;
    
    viewPostModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add new post
function addNewPost(newPost) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));
    
    newPost.id = Date.now();
    newPost.date = new Date().toISOString().split('T')[0];
    newPost.imageUrl = `https://source.unsplash.com/random/300x200?${newPost.category},railway`;
    
    posts.unshift(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    displayPosts(posts);
}

// Delete post
function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    displayPosts(updatedPosts);
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    const posts = initializePosts();
    displayPosts(posts);

    // Delete post handler
    postsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const postId = parseInt(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this post?')) {
                deletePost(postId);
            }
        }
    });

    // Existing event listeners remain the same
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            filterPosts(link.dataset.category);
        });
    });

    createPostBtn.addEventListener('click', () => {
        postModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            postModal.style.display = 'none';
            viewPostModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === postModal) {
            postModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === viewPostModal) {
            viewPostModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPost = {
            title: document.getElementById('post-title').value,
            content: document.getElementById('post-content').value,
            category: document.getElementById('post-category').value,
            author: document.getElementById('post-author').value
        };
        addNewPost(newPost);
        postForm.reset();
        postModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    hamburger.addEventListener('click', toggleMobileMenu);
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    } else {
        const menu = document.createElement('div');
        menu.classList.add('mobile-menu', 'active');
        const nav = document.querySelector('nav').cloneNode(true);
        menu.appendChild(nav);
        header.after(menu);
    }
}

// Sample posts data
const samplePosts = [
    {
        id: 1,
        title: 'Introduction to Railway Signal Performance Monitoring',
        content: 'Railway Signal Performance Monitoring (SPM) is a critical aspect...',
        category: 'technology',
        author: 'John Smith',
        date: '2025-03-30',
        imageUrl: 'https://source.unsplash.com/random/300x200?railway,signal'
    },
    // Other sample posts...
];

// Update toggleMobileMenu function
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.classList.toggle('active');
    
    if (!mobileMenu) {
        const menu = document.createElement('div');
        menu.classList.add('mobile-menu');
        const nav = document.querySelector('nav').cloneNode(true);
        menu.appendChild(nav);
        header.after(menu);
        
        // Add click listeners to mobile menu items
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
    
    document.querySelector('.mobile-menu').classList.toggle('active');
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && 
            !e.target.closest('.hamburger') &&
            mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}
// Update the addNewPost function
function addNewPost(newPost) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));
    const fileInput = document.getElementById('post-image');
    
    // Handle image upload
    if(fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newPost.imageUrl = e.target.result;
            completePostCreation(newPost, posts);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        newPost.imageUrl = null;
        completePostCreation(newPost, posts);
    }
}

function completePostCreation(newPost, posts) {
    newPost.id = Date.now();
    newPost.date = new Date().toISOString().split('T')[0];
    
    posts.unshift(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    displayPosts(posts);
}

// Update the post card generation
postCard.innerHTML = `
    ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}">` : ''}
    <div class="post-card-content">
        <!-- rest of the content remains the same -->
    </div>
`;
