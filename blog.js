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
const desktopNav = document.querySelector('.desktop-nav'); // Get desktop nav element

// Initialize posts data
function initializePosts() {
    let posts = localStorage.getItem('blogPosts');

    if (!posts) {
        // Define sample posts if localStorage is empty
        const samplePosts = [
            {
                id: 1,
                title: 'Introduction to Railway Signal Performance Monitoring',
                content: 'Railway Signal Performance Monitoring (SPM) is a critical aspect of maintaining safe and efficient rail operations. It involves the continuous collection and analysis of data from signaling systems to detect anomalies, predict failures, and optimize performance. By monitoring signal aspects, interlocking states, train detection, and communication links, operators can gain valuable insights into the health and reliability of the signaling infrastructure. This proactive approach helps prevent delays, reduces maintenance costs, and enhances overall safety. Advanced SPM systems often utilize data analytics and machine learning to identify patterns and trends that human operators might miss, leading to more accurate diagnostics and predictive maintenance scheduling. Understanding the principles of SPM is essential for anyone involved in railway operations or infrastructure management.',
                category: 'technology',
                author: 'John Smith',
                date: '2025-03-30',
                imageUrl: 'https://source.unsplash.com/random/600x400?railway,signal'
            },
             {
                id: 2,
                title: 'Analyzing Train Stop Speed and Time Data',
                content: 'Understanding train stop behavior is crucial for optimizing railway schedules and improving efficiency. By analyzing data on train stop speed and time at various stations and signals, operators can identify bottlenecks, assess the effectiveness of traffic management strategies, and fine-tune timetables. Factors influencing stop speed and duration include signal aspects, track conditions, platform availability, passenger boarding/alighting times, and driver behavior. Data analysis techniques, such as statistical modeling and visualization, can reveal insights into typical stop profiles, variations, and deviations. This information can be used to predict arrival and departure times more accurately, minimize dwell times, and reduce overall journey durations. Monitoring stop performance also helps identify potential operational issues or areas where infrastructure improvements might be needed.',
                category: 'analysis',
                author: 'Jane Doe',
                date: '2025-04-05',
                imageUrl: 'https://source.unsplash.com/random/600x400?train,station'
            },
             {
                id: 3,
                title: 'Managing Train Normal Speed and Over Speed Events',
                content: 'Maintaining trains at their normal operating speed is vital for safety, efficiency, and adherence to schedules. However, managing over-speed events is equally important to prevent accidents and ensure compliance with speed limits. Railway SPM systems play a key role in monitoring train speed profiles, comparing them against authorized limits, and generating alerts for over-speed instances. Analysis of normal speed data can help identify sections of track where trains consistently operate below the target speed, potentially indicating issues with track quality, signaling, or power supply. Conversely, analyzing over-speed events helps pinpoint specific locations, train types, or operational conditions that contribute to excessive speed. This data is invaluable for implementing corrective measures, such as enforcing speed restrictions, optimizing signaling, or providing additional driver training. Effective speed management relies on robust monitoring and timely intervention based on accurate data analysis.',
                category: 'analysis',
                author: 'Peter Jones',
                date: '2025-04-10',
                imageUrl: 'https://source.unsplash.com/random/600x400?train,speed'
            },
             {
                id: 4,
                title: 'The Role of Data Analytics in Predictive Maintenance',
                content: 'Predictive maintenance is transforming railway operations by allowing maintenance teams to address potential equipment failures before they occur. Data analytics, powered by SPM systems and other data sources, is the cornerstone of this approach. By analyzing historical and real-time data from signals, track sensors, rolling stock, and weather systems, sophisticated algorithms can identify patterns indicative of impending failures. Machine learning models can predict the remaining useful life of components, such as points motors, track circuits, or level crossing equipment. This enables maintenance activities to be scheduled optimally, minimizing disruptions to service and reducing emergency repairs. Implementing a successful predictive maintenance program requires integrating data from disparate systems, developing robust analytical models, and establishing efficient workflows for acting on the predictions.',
                category: 'technology',
                author: 'Emily White',
                date: '2025-04-15',
                imageUrl: 'https://source.unsplash.com/random/600x400?data,analytics'
            },
             {
                id: 5,
                title: 'Recent Updates to the SPM Analysis CLI Tool',
                content: 'We are excited to announce the latest updates to our Railway SPM Analysis Command Line Interface (CLI) tool. Version 1.2 brings several new features and performance enhancements designed to streamline your analysis workflows. Key updates include improved data import capabilities supporting additional file formats, new commands for generating detailed reports on signal failures and delays, and enhanced visualization options for analyzing trends over time. We have also focused on performance optimization, significantly reducing processing times for large datasets. The update also includes bug fixes and improved error handling based on user feedback. We encourage all users to upgrade to the latest version to take advantage of these improvements. Refer to the updated documentation for a complete list of changes and instructions on how to get started.',
                category: 'updates',
                author: 'Team SPM',
                date: '2025-04-20',
                imageUrl: 'https://source.unsplash.com/random/600x400?code,terminal'
            },
             {
                id: 6,
                title: 'Case Study: Reducing Delays Through SPM Insights',
                content: 'In this case study, we explore how a major railway operator successfully reduced train delays by leveraging insights from their Signal Performance Monitoring system. By analyzing SPM data, the operator identified several recurring issues, including intermittent track circuit failures in specific areas and signal anomalies triggered by adverse weather conditions. Using this data, they implemented targeted maintenance interventions, upgraded aging equipment, and developed weather-response protocols. The SPM system also helped them optimize train sequencing during periods of disruption, minimizing the impact on overall network performance. The results demonstrated a significant reduction in signal-related delays and improved on-time performance across the network, highlighting the tangible benefits of a robust SPM program and effective data analysis.',
                category: 'analysis',
                author: 'Consulting Analyst',
                date: '2025-04-25',
                imageUrl: 'https://source.unsplash.com/random/600x400?railway,tracks'
            }
        ];
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

        // Use post.imageUrl if available, otherwise use a fallback Unsplash image
        const imageUrl = post.imageUrl || `https://source.unsplash.com/random/600x400?${post.category},railway`;

        postCard.innerHTML = `
            ${post.imageUrl ? `<img src="${imageUrl}" alt="${post.title}">` : ''}
            <div class="post-card-content">
                <span class="post-category">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.content.substring(0, 150)}...</p> <div class="post-meta">
                    <span>${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </div>
        `;

        // Event listener for clicking the post card (excluding the delete button)
        postCard.addEventListener('click', (e) => {
            // Prevent opening the post if the delete button was clicked
            if (!e.target.classList.contains('delete-btn') && !e.target.closest('.delete-btn')) { // Check closest as well
                 viewPost(post);
            }
        });

        postsContainer.appendChild(postCard);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    try {
         return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return dateString; // Return original string if invalid date
    }
}

// Filter posts by category
function filterPosts(category) {
    const posts = JSON.parse(localStorage.getItem('blogPosts'));

    if (category === 'all') {
        displayPosts(posts);
    } else {
        // Use toLowerCase for case-insensitive comparison
        const filteredPosts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
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
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Add new post
function addNewPost(newPost) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || []; // Ensure posts is an array
    const fileInput = document.getElementById('post-image');

    // Handle image upload
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newPost.imageUrl = e.target.result;
            completePostCreation(newPost, posts);
        }
        reader.onerror = function(error) {
            console.error("Error reading file:", error);
            newPost.imageUrl = null; // Proceed without image on error
            completePostCreation(newPost, posts);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        newPost.imageUrl = null; // No image selected
        completePostCreation(newPost, posts);
    }
}

function completePostCreation(newPost, posts) {
    newPost.id = Date.now(); // Simple unique ID based on timestamp
    newPost.date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    posts.unshift(newPost); // Add new post to the beginning
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    displayPosts(posts); // Re-render posts

    // Close modal and reset form
    postModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    postForm.reset();
}


// Delete post
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || []; // Ensure posts is an array
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    displayPosts(updatedPosts); // Re-render posts
}

// Mobile menu toggle function
function toggleMobileMenu() {
    hamburger.classList.toggle('active'); // Toggle hamburger icon animation

    // Find or create the mobile menu element
    let mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        header.after(mobileMenu); // Insert the empty mobile menu div after the header

         // Clone the entire desktop navigation and append it to the mobile menu
        const navContent = desktopNav.cloneNode(true);
        navContent.classList.remove('desktop-nav'); // Remove the desktop specific class
        mobileMenu.appendChild(navContent);


        // Add event listeners to mobile menu links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Close the mobile menu when a link is clicked
                closeMobileMenu();
            });
        });
    }

    mobileMenu.classList.toggle('active'); // Toggle visibility of the mobile menu element

    // Add/remove event listener to close menu when clicking outside
    if (mobileMenu.classList.contains('active')) {
        // Use a timeout to allow the menu to finish opening before adding the listener
        setTimeout(() => {
             document.addEventListener('click', closeMenuOnClickOutside);
        }, 50); // Small delay
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Function to close the mobile menu
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active'); // Reset hamburger icon
        document.removeEventListener('click', closeMenuOnClickOutside); // Clean up listener
    }
}

// Event handler to close menu when clicking outside
function closeMenuOnClickOutside(event) {
    const mobileMenu = document.querySelector('.mobile-menu');
     // Check if the click is outside the mobile menu and not on the hamburger
    if (mobileMenu &&
        !mobileMenu.contains(event.target) &&
        !hamburger.contains(event.target)) {
        closeMobileMenu();
    }
}


// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    const posts = initializePosts();
    displayPosts(posts);

    // Delete post handler (delegated)
    postsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) { // Check both the element and its closest parent
            const postId = parseInt(e.target.dataset.id || e.target.closest('.delete-btn').dataset.id); // Get ID safely
            if (confirm('Are you sure you want to delete this post?')) {
                deletePost(postId);
            }
        } else {
             // If click wasn't on delete button, check if it was on the card itself
             const postCard = e.target.closest('.post-card');
             if(postCard) {
                 // Find the post data based on the ID or other identifier if needed
                 // For simplicity, we can re-find the post data from localStorage or the displayed posts array
                 const postId = parseInt(postCard.querySelector('.delete-btn').dataset.id); // Assuming delete button always exists
                 const allPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
                 const postToView = allPosts.find(post => post.id === postId);
                 if (postToView) {
                     viewPost(postToView);
                 }
             }
        }
    });

    // Category filter handler
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            filterPosts(link.dataset.category);
             // Close mobile menu after selecting category on mobile
            if (window.innerWidth <= 768) {
                 closeMobileMenu();
            }
        });
    });

    // Open create post modal
    createPostBtn.addEventListener('click', () => {
        postModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
         // Close mobile menu if open
        closeMobileMenu();
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

    // Handle post form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPost = {
            title: document.getElementById('post-title').value,
            content: document.getElementById('post-content').value,
            category: document.getElementById('post-category').value,
            author: document.getElementById('post-author').value
            // Image URL handled within addNewPost
        };
        addNewPost(newPost);
    });

    // Hamburger menu toggle listener
    hamburger.addEventListener('click', toggleMobileMenu);

    // Optional: Close mobile menu if window is resized to desktop size while menu is open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// Initial sample posts (defined inside initializePosts)
