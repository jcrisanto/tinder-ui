basePath = 'http://localhost:3000';

const httpClient = {
    post: function (path, body = {}) {
        const url = new URL(path, basePath);
        return fetch(url, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem('token') || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });
    },
    get: function (path, params = {}) {
        const url = new URL(path, basePath);
        url.search = new URLSearchParams(params).toString();
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': localStorage.getItem('token') || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
    },
    put: function (path, body = {}) {
        const url = new URL(path, basePath);
        return fetch(url, {
            body: JSON.stringify(body),
            method: 'PUT',
            headers: new Headers({
                'Authorization': localStorage.getItem('token') || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });
    },
    delete: function (path, params = {}) {
        const url = new URL(path, basePath);
        url.search = new URLSearchParams(params).toString();
        return fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': localStorage.getItem('token') || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
    }
}

function notifyOfError(){
    alert('there was an error processing your request!');
}

function redirectIfLoggedIn() {
    if(localStorage.getItem('token')){
        window.location.href = 'main.html';
    }
}

function redirectIfNotLoggedIn() {
    if(!localStorage.getItem('token')){
        window.location.href = 'login.html';
    }
}

function isEmailValid(email){
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
}
