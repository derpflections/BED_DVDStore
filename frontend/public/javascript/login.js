$("#site-login").submit((event) => {
    event.preventDefault();
    const baseUrl = "http://localhost:3000"
    console.log($("#loginType").val())
    if ($("#loginType").val() == "staff"){
        axios.post(`${baseUrl}/adminLogin`, { username: $("#user").val(), password: $("#pwd").val() })
            .then((response) => {
                // document.getElementById("loginResponse").innerHTML = ``
                htmlData = `<div class = "alert alert-success text-center py-5" role = "alert" id = "loginAlert"><p>Welcome, ${response.data.result.first_name} ${response.data.result.last_name}.</p><p>Page will refresh shortly.</p></div>`
                $("#site-login").append(htmlData)
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("staffID", response.data.result.staff_id)
                localStorage.setItem("role", "staff")
                setInterval(() => {
                    location.reload()
                }, 1500)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status == 403) {
                    // $("#loginResponse").empty()
                    $("#site-login").append(
                        `<div class="alert alert-warning text-center" role="alert" id = "loginAlert">
                            Login details are incorrect!
                        </div>`)
                    setInterval(() => {
                        $("#loginAlert").remove()
                    }, 1500)
                }

            })
    } else if ($("#loginType").val() == "customer"){
        axios.post(`${baseUrl}/custLogin`, { email: $("#user").val(), password: $("#pwd").val()})
            .then ((response) => {
                console.log(response)
                htmlData = `<div class = "alert  alert-success text-center py-5" role = "alert" id = "loginAlert"><p>Welcome, ${response.data.result.first_name} ${response.data.result.last_name}.</p><p>Page will refresh shortly.</p></div>`
                $("#site-login").append(htmlData)
                console.log(response.data)
                console.log(response.data.customer_id)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("customerID", response.data.result.customer_id)
                localStorage.setItem("role", "customer")
                setInterval(() => {
                    location.reload()
                }, 1500)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status == 403) {
                    // $("#loginResponse").empty()
                    $("#site-login").append(
                        `<div class="alert alert-warning text-center" role="alert" id = "loginAlert">
                            Login details are incorrect!
                        </div>`)
                    setInterval(() => {
                        $("#loginAlert").remove()
                    }, 1500)
                }

            })
    }
})


function logout() {
    localStorage.clear()
    location.reload()
}

function clickAcc (emitter) {
    console.log(emitter.id.replace("acc", ""))
    localStorage.setItem("accClickItem", emitter.id.replace("acc",""))
    window.location.assign('/admin')
}