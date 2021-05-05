_mainPageButton.addEventListener('click', () => {
    window.location.href = 'main.html';
});

const showFullName = (user) => user.firstName + ' ' + user.lastName;

const editUser = (id) => window.location.href = 'adminedit.html'+'?'+id;

httpClient.get('/admin/users/')
    .then((response) => {
        if(response.status === 401){
            localStorage.clear();
            window.location.href = 'login.html';
        } else if(response.status === 200){
            let users = [];
            response.text()
                .then((data) => {
                    users = JSON.parse(data).items;
                    console.log(users);
                    const usersHtml = users.map(x => `<li><p>Name: ${showFullName(x)}<button onclick="editUser('${x.id}')">EDIT</button></p><p>Age: ${x.age}</p><p>Gender: ${x.gender}</p></li>`);
                    usersHtml.unshift(`<li style="font-weight: bold">Users (${users.length})</li>`);
                    _usersListView.innerHTML = usersHtml.join('');
                });
            httpClient.get('admin/matches/')
                .then((response) => {
                    if(response.status === 401){
                        localStorage.clear();
                        window.location.href = 'login.html';
                    } else if(response.status === 200){
                        response.text()
                            .then((data) => {
                                const matches = JSON.parse(data).items;
                                console.log(matches);
                                const itemsHtml = matches.map(x => `<li><p>${showFullName(users.find(u => u.id === x.sendingLikeId))}</p><p>${showFullName(users.find(u => u.id === x.receivingLikeId))}</p><p>Approved: ${x.isApproved}</p></li>`);
                                itemsHtml.unshift(`<li style="font-weight: bold">Matches (${matches.length})</li>`);
                                _matchesListView.innerHTML = itemsHtml.join('');
                            });
                        return;
                    }
                    notifyOfError();
                });
            return;
        }
        notifyOfError();
    });