function onLogin() {
    const reqBody = {
        token: localStorage.getItem("token")
    }
    if (reqBody.token == null || reqBody.token == undefined) {
        return;
    } else {
        const baseUrl = "http://localhost:3000"
        axios.get(`${baseUrl}/adminCheck`, { headers: { "Authorization": "Bearer " + reqBody.token } })
            .then((response) => {
                $("#staff-login").empty()
                $("#login").replaceWith(`<a class = "nav-link active" href="/login" id = "login">Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</a>`) //replaces navbar
                $("#staff-login").append(`<div class = "login-form container" id = "loginResponse"><div class="text-center"><p>Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</p><p>What would you like to do today?</p></div></div>`)
                $("#loginResponse2").append(`<div class = "py-5"><button type="button" class="btn btn-light mx-5">Add Customer.</button><button type="button" class="btn btn-light mx-5">Add Actor.</button></div>`)
                $("#loginResponse2").append(`<button type="submit" class = "btn btn-warning" onclick = logout()>Log-out!</button>`)
            })
    }
}