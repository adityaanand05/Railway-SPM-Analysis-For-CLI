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

// Sample blog posts (initial data if localStorage is empty)
const samplePosts = [
    {
        id: 1,
        title: 'Introduction to Railway Signal Performance Monitoring',
        content: 'Railway Signal Performance Monitoring (SPM) is a critical aspect of modern railway operations. It involves collecting and analyzing data from various signal systems to ensure optimal performance and safety. This post introduces the key concepts behind SPM and why it matters for railway operations.\n\nSPM systems collect data on signal aspects, train movements, and related parameters to provide insights into system performance, identify potential issues before they cause disruptions, and help optimize signal timing and placement. With advanced analytics, railways can improve both safety and operational efficiency.',
        category: 'technology',
        author: 'John Smith',
        date: '2025-03-30',
        imageUrl: 'https://source.unsplash.com/random/300x200?railway,signal'
    },
    {
        id: 2,
        title: 'Analyzing Train Speed Patterns: Key Insights',
        content: 'Understanding train speed patterns is essential for optimizing railway operations. This post explores how analyzing speed data can reveal important insights about system performance, safety thresholds, and potential bottlenecks in the network.\n\nBy analyzing speed patterns across different times, locations, and conditions, operators can identify areas where speeds consistently fall below expectations, potentially indicating infrastructure issues or scheduling problems. Advanced analytics can also help identify patterns that might lead to safety concerns, allowing preventative action before incidents occur.',
        category: 'analysis',
        author: 'Emma Johnson',
        date: '2025-03-27',
        imageUrl: 'https://source.unsplash.com/random/300x200?train,speed'
    },
    {
        id: 3,
        title: 'New Features Added to SPM Dashboard',
        content: 'We\'re excited to announce several new features that have been added to our Railway SPM Analysis Dashboard! These updates include enhanced visualization tools, more comprehensive data filtering options, and improved export capabilities.\n\nThe new visualization tools allow for better comparison of speed data across different train categories and time periods. We\'ve also added interactive heatmaps that show problematic sections of track based on historical speed and signal data. These improvements should make it much easier to identify trends and anomalies in your railway performance data.',
        category: 'updates',
        author: 'Michael Lee',
        date: '2025-03-25',
        imageUrl: 'https://source.unsplash.com/random/300x200?dashboard'
    }
];

// Initialize posts data
function initializePosts() {
    let posts = localStorage.getItem('blogPosts');
    
    if (!posts) {
        localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
        return samplePosts;
    }
    
    return JSON.parse(posts);
}

// Display posts
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
            </div>
        `;
        
        postCard.addEventListener('click', () => viewPost(post));
        postsContainer.appendChild(postCard);
    });
}

// Format date to readable format
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

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    const posts = initializePosts();
    displayPosts(posts);
    
    // Filter by category
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            categoryLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            filterPosts(link.dataset.category);
        });
    });
    
    // Open create post modal
    createPostBtn.addEventListener('click', () => {
        postModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            postModal.style.display = 'none';
            viewPostModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
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
    
    // Submit post form
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('post-title').value,
            content: document.getElementById('post-content').value,
            category: document.getElementById('post-category').value,
            author: document.getElementById('post-author').value
        };
        
        addNewPost(newPost);
        
        // Reset form
        postForm.reset();
        
        // Close modal
        postModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Toggle mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
});

// Implementation for a simple API mock service to simulate backend
class BlogApiService {
    constructor() {
        this.storageKey = 'blogPosts';
    }
    
    getAllPosts() {
        return Promise.resolve(JSON.parse(localStorage.getItem(this.storageKey)));
    }
    
    getPostById(id) {
        const posts = JSON.parse(localStorage.getItem(this.storageKey));
        return Promise.resolve(posts.find(post => post.id === id));
    }
    
    getPostsByCategory(category) {
        const posts = JSON.parse(localStorage.getItem(this.storageKey));
        return Promise.resolve(posts.filter(post => post.category === category));
    }
    
    createPost(postData) {
        const posts = JSON.parse(localStorage.getItem(this.storageKey));
        
        const newPost = {
            ...postData,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            imageUrl: `https://source.unsplash.com/random/300x200?${postData.category},railway`
        };
        
        posts.unshift(newPost);
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
        
        return Promise.resolve(newPost);
    }
    
    updatePost(id, postData) {
        const posts = JSON.parse(localStorage.getItem(this.storageKey));
        const index = posts.findIndex(post => post.id === id);
        
        if (index !== -1) {
            posts[index] = { ...posts[index], ...postData };
            localStorage.setItem(this.storageKey, JSON.stringify(posts));
            return Promise.resolve(posts[index]);
        }
        
        return Promise.reject(new Error('Post not found'));
    }
    
    deletePost(id) {
        const posts = JSON.parse(localStorage.getItem(this.storageKey));
        const newPosts = posts.filter(post => post.id !== id);
        
        localStorage.setItem(this.storageKey, JSON.stringify(newPosts));
        return Promise.resolve({ success: true });
    }
}

// Create instance of API service
const blogApi = new BlogApiService();
