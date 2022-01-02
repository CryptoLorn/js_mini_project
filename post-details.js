let wrapper = document.createElement('div');
wrapper.classList.add('wrapper_post_details');

let postDetails = JSON.parse(localStorage.getItem('postDetails'));

for (let i = 0; i < postDetails.length; i++){
    let divPostDetails = document.createElement('div');
    divPostDetails.classList.add('post_block_details');

    divPostDetails.innerHTML = `<h3>${postDetails[i].id}</h3>
    <h2>${postDetails[i].title}</h2>
    <p>${postDetails[i].body}</p>`;

    wrapper.appendChild(divPostDetails);

    let postId = postDetails[i].id;

    function getPostId() {
        return postId;
    }
}

let postId = getPostId();



let comments = document.createElement('div');
comments.classList.add('comments');
comments.innerHTML = `<h2>Comments:</h2>`;


let commentsBlock = document.createElement('div');
commentsBlock.classList.add('post_details_wrapper');

wrapper.append(comments, commentsBlock);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(userComments => userComments.json())
    .then(userCommentsArr => {
        for (let i = 0; i < userCommentsArr.length; i++){
            let userCommentsDiv = document.createElement('div');
            userCommentsDiv.classList.add('userComments');
            userCommentsDiv.innerText = `${userCommentsArr[i].body}`;

            commentsBlock.appendChild(userCommentsDiv);
        }
    })

document.body.appendChild(wrapper);

