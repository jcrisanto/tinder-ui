redirectIfLoggedIn()

_registerButton.addEventListener('click', () => {
    const firstName = _firstNameInput.value;
    const lastName = _lastNameInput.value;
    const email = _emailInput.value;
    const age = parseInt(_ageInput.value);
    const password = _passwordInput.value;
    const confirmPassword = _confirmPasswordInput.value;

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

    if (password.length === 0) {
        alert('please enter a password');
        return;
    }

    if (confirmPassword.length === 0) {
        alert('please enter a password confirmation');
        return;
    }

    if (confirmPassword !== password) {
        alert('the password does not match');
        return;
    }

    const requestBody = {firstName: firstName, lastName: lastName, email: email, age: age, password: password };

    httpClient.post('/users/register', requestBody)
        .then((response) => {
            if(response.status === 400){
                response.text()
                    .then((data) => {
                        alert(data);
                    });
                return;
            } else if(response.status === 201){
                alert('user registered successfully!');
                document.location.reload();
                return;
            }
            notifyOfError();
        });
});

_loginButton.addEventListener('click', () => window.location.href = 'login.html');