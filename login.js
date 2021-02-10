redirectIfLoggedIn()

_loginButton.addEventListener('click', () => {
    const email = _loginEmailInput.value;
    const password = _loginPasswordInput.value;

    if (email.length === 0) {
        alert('please enter a valid email')
        return;
    }

    if (password.length === 0) {
        alert('please enter a password')
        return;
    }

    httpClient.get('/users/login', {email, password })
        .then((response) => {
            response.text()
                .then((data) => {
                    if(response.status === 200){
                        localStorage.setItem('token', data)
                        window.location.href = 'main.html';
                        return;
                    } else if(response.status === 400){
                        alert(data);
                        return;
                    }
                    notifyOfError();
                })
        });

});

_registerButton.addEventListener('click', () => window.location.href = 'register.html')