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
                $("#loginResponse").append(`<div class = "row text-center" id = "staffDetails"><p>First Name: ${response.data[0][0].first_name}</p>
                <p>Last Name: ${response.data[0][0].last_name}</p>
                <p>E-Mail: ${response.data[0][0].email}</p>
                <p>Address: ${response.data[1][0].address} ${response.data[1][0].address2}</p>
                <p>Phone Number: ${response.data[1][0].phone}</p>
                <p>Postal Code: ${response.data[1][0].postal_code}</p></div>`)
                $("#loginResponse2").append(`<button type="submit" class = "btn btn-warning" onclick = logout()>Log-out!</button>`)
            })
    }
}