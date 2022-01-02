fetch('https://jsonplaceholder.typicode.com/users')
.then(users => users.json())
.then(usersArr => {
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('wrapper');

    for (let i = 0; i < usersArr.length; i++){
        let div = document.createElement('div');
        div.innerText = `${usersArr[i].id} ${usersArr[i].name}`;
        div.classList.add('user_block');

        let button = document.createElement('div');
        button.innerText = 'Details';
        button.classList.add('btn');

        button.onclick = function (){
            let userDetails = JSON.parse(localStorage.getItem('userDetails'));

            if (!userDetails){
                let userDetails = [];
                userDetails.push(usersArr[i]);
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                window.location.href = 'user-details.html';
            }
            else{
                userDetails.shift();
                userDetails.push(usersArr[i]);
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                window.location.href = 'user-details.html';
            }
        }

        div.appendChild(button);
        divWrapper.appendChild(div);
    }

    document.body.appendChild(divWrapper);
})