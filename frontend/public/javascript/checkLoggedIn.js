function onLogin() {
    const reqBody = {
        token: localStorage.getItem("token")
    }
    if (reqBody.token == null || reqBody.token == undefined) {
        return;
    } else {
        const baseUrl = "http://localhost:3000"
        if (localStorage.role == "staff"){
            axios.get(`${baseUrl}/adminCheck`, { headers: { "Authorization": "Bearer " + reqBody.token } })
                .then((response) => {
                    $("#site-login").empty()
                    $("#login").replaceWith(`<a class = "nav-link active" href="/login" id = "login">Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</a>`) //replaces navbar
                    $("#site-login").append(`<div class = "login-form container" id = "loginResponse"><div class="text-center"><p>Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</p><p>What would you like to do today?</p></div></div>`)
                    $("#loginResponse2").append(`<div class = "py-5 text-center" id = "postLoginOptions"><button type="button" class="btn btn-light mx-5">Add Customer.</button><button type="button" class="btn btn-light mx-5">Add Actor.</button><button type="button" class="btn btn-light mx-5">Edit Account Information</button></div>`)
                    $("#loginResponse2").append(`<button type="submit" class = "btn btn-warning" onclick = logout()>Log-out!</button>`)
                })
        } else if (localStorage.role == "customer"){
            axios.get(`${baseUrl}/custCheck`, { headers: { "Authorization": "Bearer " + reqBody.token } })
            .then((response) => {
                $("#site-login").empty()
                $("#login").replaceWith(`<a class = "nav-link active" href="/login" id = "login">Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</a>`) //replaces navbar
                $("#site-login").append(`<div class = "login-form container" id = "loginResponse"><div class="text-center"><p>Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</p><p>What would you like to do today?</p></div></div>`)
                $("#loginResponse2").append(`<div class = "py-5 text-center" id = "postLoginOptions"><button type="button" class="btn btn-light mx-5">Edit Account Information</button><button type="button" class="btn btn-light mx-5">View Payment History</button></div>`)
                $("#loginResponse2").append(`<button type="submit" class = "btn btn-warning" onclick = logout()>Log-out!</button>`)
            })
        }
    }
}

// code for button
// <button type="button" class="btn btn-light mx-5">Edit Account Information</button>