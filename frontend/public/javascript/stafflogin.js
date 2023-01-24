$("#staff-login").submit((event) => {
    event.preventDefault();
    const baseUrl = "http://localhost:3000"
    console.log($("#loginType").val())
    axios.post(`${baseUrl}/adminLogin`, { username: $("#staff_user").val(), password: $("#staff_pwd").val() })
        .then((response) => {
            // document.getElementById("loginResponse").innerHTML = ``
            htmlData = `<div class = "alert alert-success text-center" role = "alert"><p>Welcome, ${response.data.result.first_name} ${response.data.result.last_name}.</p><p>Page will refresh shortly.</p></div>`
            $("#staff-login").append(htmlData)
            console.log(response.data.staff_id)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("staffID", response.data.staff_id)
            setInterval(() => {
                location.reload()
            }, 1500)
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status == 403) {
                // $("#loginResponse").empty()
                $("#staff-login").append(
                    `<div class="alert alert-warning text-center" role="alert">
                        Login details are incorrect!
                    </div>`)
            }

        })
})


function logout() {
    localStorage.clear()
    location.reload()
}       