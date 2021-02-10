redirectIfNotLoggedIn();
let user = {};
httpClient.get('/users/info')
    .then((response) => {
    if(response.status === 401){
        localStorage.clear();
        window.location.href = 'login.html';
    } else if(response.status === 200){
        response.text()
            .then((data) => {
                user = JSON.parse(data);
                _firstNameInput.value = user.firstName;
                _lastNameInput.value = user.lastName;
                _emailInput.value = user.email;
                _ageInput.value = user.age;
            });
        return;
    }
    notifyOfError();
});

_matchesButtton.addEventListener('click', () => {
    window.location.href = 'matches.html';
});

_logoutButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

_mainPageButton.addEventListener('click', () => {
    window.location.href = 'main.html';
});

_deleteAccountButton.addEventListener('click', () => {
    httpClient.delete('/users')
        .then((response) => {
            localStorage.clear();
            window.location.href = 'login.html';
        });
});

_updateButton.addEventListener('click', () => {
    const firstName = _firstNameInput.value;
    const lastName = _lastNameInput.value;
    const email = _emailInput.value;
    const age = parseInt(_ageInput.value);

    if (firstName.length === 0) {
        alert('please enter a name');
        return;
    }

    if (lastName.length === 0) {
        alert('please enter a last name');
        return;
    }

    if (email.length === 0) {
        alert('please enter an email');
        return;
    }

    if (!isEmailValid(email)) {
        alert('please enter a valid email');
        return;
    }

    if (age < 8) {
        alert('you need to be 18 or older to register');
        return;
    }

    const requestBody = {firstName: firstName, lastName: lastName, email: email, age: age, password: user.password };

    httpClient.put('/users', requestBody)
        .then((response) => {
            if(response.status === 400){
                response.text()
                    .then((data) => {
                        alert(data);
                        localStorage.clear();
                        window.location.href = 'login.html';
                    });
                return;
            } else if(response.status === 200){
                alert('Information updated successfully!');
                return;
            }
            notifyOfError();
        });
});

