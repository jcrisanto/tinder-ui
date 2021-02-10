redirectIfNotLoggedIn();

const list = document.querySelector('#list');

httpClient.get('/matches')
    .then((response) => {
        response.text()
            .then((data) => {
                if (response.status === 200) {
                    const users = JSON.parse(data);
                    users.forEach(u => list.appendChild(createListItem(u.id, u.firstName + ' ' + u.lastName)));
                    if(users.length === 0){
                        alert('No matches found for today, Try again later');
                    }
                    return;
                }
                notifyOfError();
            })
    });

_mainPageButton.addEventListener('click', () => {
    window.location.href = 'main.html';
});

_logoutButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

_profileButtton.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

function createListItem(id, fullName) {
    let li = document.createElement('li');
    li.textContent = fullName;
    li.id = id;
    li.style.margin = '16px';
    const requestBody = {likedId: id};

    let button = document.createElement('button');
    button.textContent = 'Dislike'
    button.style.color = 'white';
    button.style.backgroundColor = 'red';
    button.style.marginLeft = '16px';
    button.addEventListener("click", () => {
        httpClient.put('/matches/send-dislike', requestBody);
        document.location.reload();
    });
    li.appendChild(button);
    console.log(li);
    return li;
}