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
                    $("#site-login").append(`<div class = "login-form container " id = "loginResponse"><div class="text-center"><p>Welcome, ${response.data[0][0].first_name} ${response.data[0][0].last_name}.</p><p>What would you like to do today?</p></div></div>`)
                    $("#loginResponse2").append(`<div class = "py-5 text-center" id = "postLoginOptions"><a href = "/admin" id = "acc1" onclick = clickAcc(acc1)><button type="button" class="btn btn-light mx-5">Add Customer.</button></a><a href = "/admin" id = "acc2" onclick = clickAcc(acc2)><button type="button" class="btn btn-light mx-5">Add Actor.</button></a><a href = "/admin"  id = "acc3" onclick = clickAcc(acc3)><button type="button" class="btn btn-light mx-5">Edit Account Information.</button></a></div>`)
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
                $("#adminResponse").replaceWith(`<div class = "d-flex justify-content-center"><div id = adminResponse class="text-center h3 py-5 my-5 alert alert-warning col-md-8"><div class = py-5>Error 403 Forbidden.</div><div class = py-5>You don't have sufficient rights to access /admin on this server.</div><div class = py-5>Redirecting you shortly.</div></div></div>`)
            })
        }
    }
}

// code for button
// <button type="button" class="btn btn-light mx-5">Edit Account Information</button>