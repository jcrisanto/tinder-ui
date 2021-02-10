redirectIfNotLoggedIn();
let userForLikeId;
getRandomUser();

_logoutButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

_likeButton.addEventListener('click', () => {
    const requestBody = {likedId: userForLikeId};
    console.log(requestBody);
    httpClient.put('/matches/send-like', requestBody)
        .then((response) => {
            response.text()
                .then((data) => {
                    if(response.status === 200){
                        alert(data);
                    } else if(response.status === 500){
                        notifyOfError();
                    }
                    getRandomUser();
                })
        });
});

_dislikeButton.addEventListener('click', () => {
    const requestBody = {likedId: userForLikeId};
    console.log(requestBody);
    httpClient.put('/matches/send-dislike', requestBody)
        .then((response) => {
            getRandomUser();
        });
});

_matchesButton.addEventListener('click', () => {
    window.location.href = 'matches.html';
});

_profileButton.addEventListener('click', () => {
    window.location.href = 'profile.html';
});


function getRandomUser(){
    httpClient.get('/users/random')
        .then((response) => {
            response.text()
                .then((data) => {
                    if(response.status === 200){
                        const user = JSON.parse(data);
                        _randomUserView.innerHTML = user.firstName + ' ' + user.lastName;
                        userForLikeId = user.id;
                        return;
                    } else if(response.status === 400){
                        alert(data);
                        return;
                    }
                    notifyOfError();
                })
        });
}