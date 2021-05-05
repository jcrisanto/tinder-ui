redirectIfLoggedIn()

_registerButton.addEventListener('click', () => {
    const firstName = _firstNameInput.value;
    const lastName = _lastNameInput.value;
    const email = _emailInput.value;
    const age = parseInt(_ageInput.value) || 0;
    const gender = _genderSelect.value;
    const height = parseInt(_heightInput.value) || 0;
    const city = _cityInput.value;
    const favouriteAnimals = [];
    if(_checkDog.checked) favouriteAnimals.push('Dog');
    if(_checkCat.checked) favouriteAnimals.push('Cat');
    if(_checkRabbit.checked) favouriteAnimals.push('Rabbit');
    if(_checkHamster.checked) favouriteAnimals.push('Hamster');
    if(_checkParrot.checked) favouriteAnimals.push('Parrot');
    const favouriteColours = [];
    if(_checkWhite.checked) favouriteColours.push('White');
    if(_checkBlack.checked) favouriteColours.push('Black');
    if(_checkBlue.checked) favouriteColours.push('Blue');
    if(_checkRed.checked) favouriteColours.push('Red');
    if(_checkGreen.checked) favouriteColours.push('Green');
    if(_checkBrown.checked) favouriteColours.push('Brown');
    if(_checkYellow.checked) favouriteColours.push('Yellow');
    if(_checkOrange.checked) favouriteColours.push('Orange');
    if(_checkPink.checked) favouriteColours.push('Pink');
    const musicGenres = [];
    if(_checkHipHop.checked) musicGenres.push('Hip Hop');
    if(_checkRnB.checked) musicGenres.push('R&B');
    if(_checkSoca.checked) musicGenres.push('Soca');
    if(_checkPop.checked) musicGenres.push('Pop');
    if(_checkRock.checked) musicGenres.push('Rock');
    if(_checkBlues.checked) musicGenres.push('Blues');
    const genderLimits = _genderLimitsSelect.value.split(',');
    const minAge = parseInt(_minAgeInput.value) || 0;
    const maxAge = parseInt(_maxAgeInput.value) || 0;

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

    if (age < 18) {
        alert('you need to be 18 or older to register');
        return;
    }

    if(height < 1){
        alert('height cannot be 0 or less');
        return;
    }

    if (city.length === 0) {
        alert('please enter a city');
        return;
    }

    if (favouriteAnimals.length === 0) {
        alert('please choose an animal from the list');
        return;
    }

    if (favouriteColours.length === 0) {
        alert('please choose a color from the list');
        return;
    }

    if (musicGenres.length === 0) {
        alert('please choose a music genre from the list');
        return;
    }

    if (minAge < 18) {
        alert('you need to select a min age 18 or older to register');
        return;
    }

    if (minAge > 60) {
        alert('you need to select a max age 60 or younger to register');
        return;
    }

    if(minAge > maxAge){
        alert('min age has to less than max age');
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

    const requestBody = {firstName, lastName, email, age, gender, height, city,
        favouriteAnimals, favouriteColours, musicGenres, genderLimits, ageLimits: [minAge, maxAge], password};

    httpClient.post('/users/register', requestBody)
        .then((response) => {
            if (response.status === 400) {
                response.text()
                    .then((data) => {
                        alert(data);
                    });
                return;
            } else if (response.status === 201) {
                alert('user registered successfully!');
                document.location.reload();
                return;
            }
            notifyOfError();
        });
});

_loginButton.addEventListener('click', () => window.location.href = 'login.html');