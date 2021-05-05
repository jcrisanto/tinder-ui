console.log(window.location.href);
const id = window.location.href.split('?')[1];
redirectIfNotLoggedIn();
let user = {};
httpClient.get('/admin/users/'+id)
    .then((response) => {
        if(response.status === 401){
            localStorage.clear();
            window.location.href = 'login.html';
        } else if(response.status === 200){
            response.text()
                .then((data) => {
                    user = JSON.parse(data);
                    console.log(user);
                    _firstNameInput.value = user.firstName;
                    _lastNameInput.value = user.lastName;
                    _emailInput.value = user.email;
                    _ageInput.value = user.age;
                    _genderSelect.value = user.gender;
                    _heightInput.value = user.height;
                    _cityInput.value = user.city;

                    _checkDog.checked = user.favouriteAnimals.includes('Dog');
                    _checkCat.checked = user.favouriteAnimals.includes('Cat');
                    _checkRabbit.checked = user.favouriteAnimals.includes('Rabbit');
                    _checkHamster.checked = user.favouriteAnimals.includes('Hamster');
                    _checkParrot.checked = user.favouriteAnimals.includes('Parrot');

                    _checkWhite.checked = user.favouriteColours.includes('White');
                    _checkBlack.checked = user.favouriteColours.includes('Black');
                    _checkBlue.checked = user.favouriteColours.includes('Blue');
                    _checkRed.checked = user.favouriteColours.includes('Red');
                    _checkGreen.checked = user.favouriteColours.includes('Green');
                    _checkBrown.checked = user.favouriteColours.includes('Brown');
                    _checkYellow.checked = user.favouriteColours.includes('Yellow');
                    _checkOrange.checked = user.favouriteColours.includes('Orange');
                    _checkPink.checked = user.favouriteColours.includes('Pink');

                    _checkHipHop.checked = user.musicGenres.includes('Hip Hop');
                    _checkRnB.checked = user.musicGenres.includes('R&B');
                    _checkSoca.checked = user.musicGenres.includes('Soca');
                    _checkPop.checked = user.musicGenres.includes('Pop');
                    _checkRock.checked = user.musicGenres.includes('Rock');
                    _checkBlues.checked = user.musicGenres.includes('Blues');

                    _genderLimitsSelect.value = user.genderLimits.join(',');
                    _minAgeInput.value = user.ageLimits[0];
                    _maxAgeInput.value = user.ageLimits[1];
                });
            return;
        }
        notifyOfError();
    });

_mainPageButton.addEventListener('click', () => {
    window.location.href = 'main.html';
});

_deleteAccountButton.addEventListener('click', () => {
    httpClient.delete('/admin', {id})
        .then((response) => {
            window.location.href = 'admin.html';
        });
});

_updateButton.addEventListener('click', () => {
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

    const requestBody = {id,firstName, lastName, email, age, gender, height, city,
        favouriteAnimals, favouriteColours, musicGenres, genderLimits, ageLimits: [minAge, maxAge], password: 'user.password' };

    httpClient.put('/admin', requestBody)
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