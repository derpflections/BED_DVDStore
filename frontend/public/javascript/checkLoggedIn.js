function onLogin() {
    const reqBody = {
        token: localStorage.getItem("token")
    }
    if (reqBody.token == null || reqBody.token == undefined){
        return;
    } else {
        const baseUrl = "http://localhost:3000"
        axios.get(`${baseUrl}/adminCheck`,  { headers: { "Authorization": "Bearer " + reqBody.token } })
            .then((response) => {
                console.log(response.data[0])
                $("#login").replaceWith(`<a class = "nav-link active" href="/login" id = "login">Welcome, ${response.data[0].first_name} ${response.data[0].last_name}.</a>`)
            })
    }
}