let wrapper = document.createElement('div');
wrapper.classList.add('wrapper_user_details');

let userDetails = JSON.parse(localStorage.getItem('userDetails'));

for (let i = 0; i < userDetails.length; i++) {
    let divUserDetails = document.createElement('div');
    divUserDetails.classList.add('user_block_details');

    divUserDetails.innerHTML = `${userDetails[i].id} <h3>${userDetails[i].name}</h3><br>
            username: ${userDetails[i].username}<br>
            email: ${userDetails[i].email}<br>
<br>
            <b>Address:</b>
            street: ${userDetails[i].address.street}<br>
            suite: ${userDetails[i].address.suite}<br>
            city: ${userDetails[i].address.city}<br>
            zipcode: ${userDetails[i].address.zipcode}<br>
<br>
            <b>Geo:</b>
            lat: ${userDetails[i].address.geo.lat}<br>
            lng: ${userDetails[i].address.geo.lng}<br>
<br>
            phone: ${userDetails[i].phone}<br>
            website: ${userDetails[i].website}<br>
<br>
            <b>Company:</b>
            name: ${userDetails[i].company.name}<br>
            catchPhrase: ${userDetails[i].company.catchPhrase}<br>
            bs: ${userDetails[i].company.bs}`;

    wrapper.appendChild(divUserDetails);

    let userId = userDetails[i].id;

    function getUserId() {
        return userId;
    }
}

let userId = getUserId();



let postBlock = document.createElement('div');
postBlock.classList.add('post_wrapper');

let divButtonDetails = document.createElement('div');
divButtonDetails.classList.add('btn_user_details');
divButtonDetails.innerText = 'post of current user';

divButtonDetails.onclick = function () {
    divUserPostDetails.classList.toggle('hide_body');
}



let divUserPostDetails = document.createElement('div');
divUserPostDetails.classList.add('post_details', 'hide_body');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(userPost => userPost.json())
    .then(userPostArr => {
        for (let i = 0; i < userPostArr.length; i++) {
            let userPostDiv = document.createElement('div');
            userPostDiv.classList.add('userPost');

            let title = document.createElement('h3');
            title.innerText = userPostArr[i].title;

            let button = document.createElement('div');
            button.innerText = 'Details';
            button.classList.add('btn_post_details');

            button.onclick = function () {
                let postDetails = JSON.parse(localStorage.getItem('postDetails'));

                if (!postDetails) {
                    let postDetails = [];
                    postDetails.push(userPostArr[i]);
                    localStorage.setItem('postDetails', JSON.stringify(postDetails));
                    window.location.href = 'post-details.html';
                } else {
                    postDetails.shift();
                    postDetails.push(userPostArr[i]);
                    localStorage.setItem('postDetails', JSON.stringify(postDetails));
                    window.location.href = 'post-details.html';
                }
            }

            userPostDiv.append(title, button);
            divUserPostDetails.appendChild(userPostDiv);
        }
    })

postBlock.append(divButtonDetails, divUserPostDetails);
wrapper.appendChild(postBlock);

document.body.appendChild(wrapper);