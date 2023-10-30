        // Function to save and retrieve posts from local storage
        function savePosts(posts) {
            localStorage.setItem('forumPosts', JSON.stringify(posts));
        }

        function getPosts() {
            const postsData = localStorage.getItem('forumPosts');
            return postsData ? JSON.parse(postsData) : [];
        }

        // Function to render posts and comments
        function renderPosts() {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';

            const posts = getPosts();
            posts.forEach((post, postIndex) => {
                // Create a container for each post
                const postContainer = document.createElement('div');
                postContainer.className = 'post-container';

                const postDiv = document.createElement('div');
                postDiv.className = 'post-content';
                postDiv.innerHTML = post.content;

                // Create a "Comment" button
                const commentButton = document.createElement('button');
                commentButton.className = 'comment-button';
                commentButton.textContent = "Comment";

                // Create a form for posting comments (hidden by default)
                const commentForm = document.createElement('form');
                commentForm.style.display = "none";
                commentForm.innerHTML = `
                    <label for="comment-content-${postIndex}">Comment:</label><br>
                    <textarea id="comment-content-${postIndex}" rows="2" cols="40"></textarea><br>
                    <input type="submit" value="Post Comment">
                `;

                // Create a container for comments (hidden by default)
                const commentsContainer = document.createElement('div');
                commentsContainer.className = 'comments-container';

                // Create a "View Comments" button
                const viewCommentsButton = document.createElement('button');
                viewCommentsButton.className = 'view-comments-button';
                viewCommentsButton.textContent = "View Comments";

                // Add an event listener to show the comment form when the "Comment" button is clicked
                commentButton.addEventListener('click', () => {
                    commentForm.style.display = "block";
                    commentButton.style.display = "none"; // Hide the "Comment" button
                });

                // Add an event listener to handle comment submission
                commentForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const commentContent = document.getElementById(`comment-content-${postIndex}`).value;
                    if (commentContent.trim() !== '') {
                        post.comments.push(commentContent);
                        savePosts(posts);
                        renderPosts();
                    }
                    commentForm.style.display = "none"; // Hide the comment form after posting
                });

                // Add an event listener to show the comments when the "View Comments" button is clicked
                viewCommentsButton.addEventListener('click', () => {
                    commentsContainer.innerHTML = post.comments.map((comment) => `<div class="comment">${comment}</div>`).join("");
                    commentsContainer.style.display = "block";
                });

                postDiv.appendChild(commentForm);
                postContainer.appendChild(postDiv);
                postContainer.appendChild(commentButton);
                postContainer.appendChild(viewCommentsButton);
                postContainer.appendChild(commentsContainer);

                postsContainer.appendChild(postContainer);
            });
        }

        // Add an event listener to handle post submission
        const postForm = document.getElementById('post-form');
        postForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const postContent = document.getElementById('post-content').value;
            if (postContent.trim() !== '') {
                const posts = getPosts();
                posts.push({ content: postContent, comments: [] });
                savePosts(posts);
                document.getElementById('post-content').value = '';
                renderPosts();
            }
        });

        // Add an event listener to show the password input and confirm button
        const erasePostsButton = document.getElementById('erase-posts');
        erasePostsButton.addEventListener('click', () => {
            const passwordContainer = document.getElementById('password-container');
            passwordContainer.style.display = 'block';
        });

        // Add an event listener to erase all posts (with password check)
        const confirmEraseButton = document.getElementById('confirm-erase');
        confirmEraseButton.addEventListener('click', () => {
            const passwordInput = document.getElementById('erase-password').value.trim();
            if (passwordInput === 'ACS') {
                localStorage.removeItem('forumPosts');
                document.getElementById('erase-password').value = ''; // Clear the password input field
                document.getElementById('password-container').style.display = 'none'; // Hide the password input
                renderPosts();
            } else {
                alert('Incorrect password. Posts were not erased.');
            }
        });

        // Render posts on page load
        renderPosts();