$("#staff-login").submit((event) =>{
    event.preventDefault();
    const baseUrl = "http://localhost:3000"
    axios.post(`${baseUrl}/adminLogin`, {username: $("#staff_user").val(), password: $("#staff_pwd").val()})
        .then((response) => {
            document.getElementById("loginResponse").innerHTML = ``
            htmlData = `<p>Welcome, ${response.data.result.first_name} ${response.data.result.last_name}.</p>`
            $("#loginResponse").append(htmlData)
        }) 
        .catch((error) => {
            console.log(error)
        })
})

