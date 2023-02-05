//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

const baseUrl = "http://localhost:3000"
const pattern = /^.{6,}$/;
var city = 0


function onLoad() {
    taskToDo = localStorage.getItem("accClickItem")
    if (taskToDo == 1 || taskToDo == 3) {
        axios.get(`${baseUrl}/getAllStores`)
            .then((response) => {
                // console.log(response.data)
                resp = response.data
                resp.forEach((store) => {
                    $("#store_id").append(`<option value = "${store.store_id}">${store.address} (ID: ${store.store_id})</option>`)
                })
            })
        axios.get(`${baseUrl}/getAllCountry`)
            .then((response) => {
                // console.log(response.data)
                resp = response.data
                resp.forEach((country) => {
                    $("#countrySelect").append(`<option value = ${country.country_id}>${country.country}</option>`)
                })
            })
    }
}


function onAccess() {
    taskToDo = localStorage.getItem("accClickItem")
    if (taskToDo == 1) {
        $("#adminResponse").append(`<div class = "h2">Add Customer</div>`)
        $("#adminInput").append(`
            <form id = "newCustSubmit">
                <div class="form-group">
                    <div>
                        <label for="store_id">Store:</label>
                        <div>
                            <select class="form-select" id="store_id"></select>
                        </div>
                    </div>
                    <div>
                        <label for="fname">First Name:</label>
                        <div>
                            <input type="text" class="form-control" id="fname"></input>
                        </div>
                    </div>
                    <div>
                        <label for="lname">Last Name:</label>
                        <div>
                            <input type="text" class="form-control" id="lname"></input>
                        </div>
                    </div>
                    <div>
                        <label for="email">E-Mail:</label>
                        <div>
                            <input type="text" class="form-control" id="email"></input>
                        </div>
                    </div>
                    <div>
                        <label for="passowrd">Password: (At least 6 characters)</label>
                        <div>
                            <input type="password" class="form-control" id="password"></input>
                        </div>
                    </div>
                    <div>
                        <label for="addrline1">Address Line 1:</label>
                        <div>
                            <input type="text" class="form-control" id="addrline1"></input>
                        </div>
                    </div>
                    <div>
                        <label for="addrline2">Address Line 2:</label>
                        <div>
                            <input type="password" class="form-control" id="addrline2"></input>
                        </div>
                    </div>
                    <div>
                    <label for="countrySelect">Country:</label>
                        <div>
                            <select id = "countrySelect" class = "form-select"><option value = "">Select a country..</option></select>
                        </div>
                    </div>
                    <div>
                    <label for="citySelect">City:</label>
                        <div>
                            <select id = "citySelect" class = "form-select"></select>
                        </div>
                    </div>
                    <div>
                        <label for="district">District:</label>
                        <div>
                            <input type="text" class="form-control" id="district"></input>
                        </div>
                    </div>
                    <div>
                        <label for="postal">Postal/Zip Code:</label>
                        <div>
                            <input type="text" class="form-control" id="postal"></input>
                        </div>
                    </div>
                    <div>
                        <label for="phone">Phone Number:</label>
                        <div>
                            <input type="text" class="form-control" id="phone"></input>
                        </div>
                    </div>
                    <div>
                        <button type = "submit" class = "btn btn-primary mt-3">Submit!</button>
                        <button type = "reset" class = "btn btn-primary mt-3">Reset</button>
                    </div>
                </div>
            </form>`)

        $("#newCustSubmit").submit((event) => {
            event.preventDefault()
            if (pattern.test($("#password").val()) == false) {
                $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-warning h3" role = "alert">Password must be at least 6 characters long!</div></div>`)
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                const reqBody = {
                    "store_id": $("#store_id").val(),
                    "first_name": $("#fname").val(),
                    "last_name": $("#lname").val(),
                    "email": $("#email").val(),
                    "password": $("#password").val(),
                    "address": {
                        "address_line1": $("#addrline1").val(),
                        "address_line2": $("#addrline2").val(),
                        "district": $("#district").val(),
                        "city_id": $("#citySelect").val(),
                        "postal_code": $("#postal").val(),
                        "phone": $("#phone").val(),
                    }
                }
                axios.post(`${baseUrl}/customers`, reqBody, { headers: { "Authorization": "Bearer " + localStorage.token } })
                    .then((response) => {
                        if (response.status == 201) {
                            $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-success h3" role = "alert">Customer added successfully!</div></div>`)
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.status)
                        if (error.response.status == 400) {
                            $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-danger h3" role = "alert">Error 400: Missing Data!</div></div>`)
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                        if (error.response.status == 409) {
                            $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-danger h3" role = "alert">Error 409: Duplicate Email!</div></div>`)
                            window.scrollTo(0, document.body.scrollHeight);
                        } else if (error.response.status == 401){
                            $("#adminResponse").html(`<div class = "d-flex justify-content-center" onclick = "badLoginRedir()" ><div id = adminResponse class="text-center h3 py-5 my-5 alert alert-warning col-md-8"><div class = py-5>Error 403 Forbidden.</div><div class = py-5>You don't have admin rights on this server.</div><div class = py-5>Click here to return to the homepage.</div></div></div>`)
                    }
            })
        }
        })
        $("#countrySelect").on("change", () => {
            axios.post(`${baseUrl}/getAllCities`, { id: $("#countrySelect").val() })
                .then((response) => {
                    htmlData = ""
                    resp = response.data
                    resp.forEach((city) => {
                        htmlData += (`<option value = "${city.city_id}">${city.city}</option>`)
                    })
                    $("#citySelect").html(htmlData)
                })
        })
    }

    if (taskToDo == 2) {
        $("#adminResponse").append(`<p class = "h2">Add Actor</p>`)
        $("#adminInput").append(`
            <form id = "actorAdd">
                <div class = "form-group text-center">
                    <div>
                        <label for = "first_name">First Name:</label>
                        <div>
                            <input type = "text" class = "form-control" id = "first_name" placeholder = "First Name"></input>
                        </div>
                    </div>
                    <div>
                        <label for = "last_name">Last Name:</label>
                        <div>
                            <input type = "text" class = "form-control" id = "last_name" placeholder = "Last Name"></input>
                        </div>
                    </div>
                    <div>
                        <button type = "submit" class = "btn btn-primary mt-3">Submit!</button>
                    </div>
                </div>
            </form>
        `)
        $("#adminInput").submit((event) => {
            event.preventDefault()
            const ReqBody = {
                "first_name": $("#first_name").val(),
                "last_name": $("#last_name").val()
            }
            axios.post(`${baseUrl}/actors`, ReqBody, { headers: { "Authorization": "Bearer " + localStorage.token } })
                .then((response) => {
                    if (response.status == 201) {
                        $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4 text-center"><div class = "alert alert-success h2 p-5" role = "alert"><p>Actor added successfully!<p><p>New actor ID is ${response.data.actor_id}</p></div></div>`)
                    } else if (response.status == 400) (
                        $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-danger h3" role = "alert">Error 400: Missing Data!</div></div>`)
                    )
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status == 400) {
                        $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-danger h3" role = "alert">Error 400: Missing Data!</div></div>`)
                    } else if (error.response.status == 401){
                        $("#responseDiv").html(`<div class = "d-flex justify-content-center" onclick = "badLoginRedir()" ><div id = adminResponse class="text-center h3 py-5 my-5 alert alert-warning col-md-8"><div class = py-5>Error 403 Forbidden.</div><div class = py-5>You don't have admin rights on this server.</div><div class = py-5>Click here to return to the homepage.</div></div></div>`)
                    }
                })
        })
    }

    if (taskToDo == 3) {
        staffId = localStorage.getItem("staffID")
        $("#adminResponse").append(`<p class = "h2">Edit account information</p>`)
        $("#adminInput").append(`
        <form id = "editAcc">
            <div class="form-group">
                <div>
                    <label for="store_id">Store:</label>
                    <div>
                        <select class="form-select" id="store_id"></select>
                    </div>
                </div>
                <div>
                    <label for="fname">First Name:</label>
                    <div>
                        <input type="text" class="form-control" id="fname"></input>
                    </div>
                </div>
                <div>
                    <label for="lname">Last Name:</label>
                    <div>
                        <input type="text" class="form-control" id="lname"></input>
                    </div>
                </div>
                <div>
                    <label for="email">E-Mail:</label>
                    <div>
                        <input type="text" class="form-control" id="email"></input>
                    </div>
                </div>
                <div>
                    <label for="passowrd">Password: (At least 6 characters)</label>
                    <div>
                        <input type="password" class="form-control" id="password" required></input>
                    </div>
                </div>
                <div>
                    <label for="addrline1">Address Line 1:</label>
                    <div>
                        <input type="text" class="form-control" id="addrline1"></input>
                    </div>
                </div>
                <div>
                    <label for="addrline2">Address Line 2:</label>
                    <div>
                        <input type="text" class="form-control" id="addrline2"></input>
                    </div>
                </div>
                <div>
                <label for="countrySelect">Country:</label>
                    <div>
                        <select id = "countrySelect" class = "form-select"><option value = "">Select a country..</option></select>
                    </div>
                </div>
                <div>
                <label for="citySelect">City:</label>
                    <div>
                        <select id="citySelect" class="form-select"></select>
                    </div>
                </div>
                <div>
                    <label for="district">District:</label>
                    <div>
                        <input type="text" class="form-control" id="district"></input>
                    </div>
                </div>
                <div>
                    <label for="postal">Postal/Zip Code:</label>
                    <div>
                        <input type="text" class="form-control" id="postal"></input>
                    </div>
                </div>
                <div>
                    <label for="phone">Phone Number:</label>
                    <div>
                        <input type="text" class="form-control" id="phone"></input>
                    </div>
                </div>
                <div>
                    <button type = "submit" class = "btn btn-primary mt-3">Submit!</button>
                    <button type = "reset" class = "btn btn-primary mt-3">Reset</button>
                </div>
            </div>
        </form>`)
        $("#countrySelect").on("change", () => {
            axios.post(`${baseUrl}/getAllCities`, { id: $("#countrySelect").val() })
                .then((response) => {
                    htmlData = ""
                    resp = response.data
                    resp.forEach((city) => {
                        htmlData += (`<option value = "${city.city_id}">${city.city}</option>`)
                    })
                    $("#citySelect").html(htmlData)
                })
        })
        axios.get(`${baseUrl}/getAllStaff/${staffId}`, { headers: { "Authorization": "Bearer " + localStorage.token } })
            .then((response) => {
                $("#fname").val(`${response.data.first_name}`)
                $("#lname").val(`${response.data.last_name}`)
                $("#email").val(`${response.data.email}`)
                // $("#password").val(`${response.data.password}`)
                $("#addrline1").val(`${response.data.address}`)
                $("#district").val(`${response.data.district}`)
                $("#postal").val(`${response.data.postal_code}`)
                $("#phone").val(`${response.data.phone}`)
                $("#countrySelect").val(`${response.data.country_id}`)
                $("#store_id").val(`${response.data.store_id}`)
                city = response.data.city_id
                if (response.data.address2 == null) {
                    $("#addrline2").val(``)
                } else {
                    $("#addrline2").val(`${response.data.address2}`)
                }
                axios.post(`${baseUrl}/getAllCities`, { id: $("#countrySelect").val() })
                    .then((response2) => {
                        htmlData = ""
                        resp = response2.data
                        resp.forEach((city) => {
                            if (city.city_id == response.data.city_id) {
                                htmlData += (`<option value = "${city.city_id}" selected>${city.city}</option>`)
                            } else {
                                htmlData += (`<option value = "${city.city_id}">${city.city}</option>`)
                            }
                        })
                        $("#citySelect").html(htmlData)
                    })
            }).catch((error) => {
                console.log(error)
                if (error.response.status == 400) {
                    $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4 text-center"><div class = "alert alert-danger h2 p-5" role = "alert"><p>Missing information!</p></div></div>`)
                    window.scrollTo(0, document.body.scrollHeight);
                } else if (error.response.status == 401){
                   $("#adminResponse").html(`<div class = "d-flex justify-content-center" onclick = "badLoginRedir()" ><div id = adminResponse class="text-center h3 py-5 my-5 alert alert-warning col-md-8"><div class = py-5>Error 403 Forbidden.</div><div class = py-5>You don't have sufficient rights to access /admin on this server.</div><div class = py-5>Click here to return to the homepage.</div></div></div>`)
                   $("#adminInput").empty()
                }
            })

        $("#editAcc").submit((event) => {
            event.preventDefault()
            if (pattern.test($("#password").val()) == false) {
                $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-warning h3" role = "alert">Password must be at least 6 characters long!</div></div>`)
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                const reqBody3 = {
                    "staff_id": staffId,
                    "store_id": $("#store_id").val(),
                    "first_name": $("#fname").val(),
                    "last_name": $("#lname").val(),
                    "email": $("#email").val(),
                    "password": $("#password").val(),
                    "address": {
                        "address_line1": $("#addrline1").val(),
                        "address_line2": $("#addrline2").val(),
                        "district": $("#district").val(),
                        "city_id": $("#citySelect").val(),
                        "postal_code": $("#postal").val(),
                        "phone": $("#phone").val(),
                    }
                }
                axios.put(`${baseUrl}/staff`, reqBody3)
                    .then((response) => {
                        if (response.status == 200) {
                            $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4 text-center"><div class = "alert alert-success h2 p-5" role = "alert"><p>Information Updated!</p><p>Refreshing page...</p></div></div>`)
                            setTimeout(() => { window.location.assign("/login") }, 750)
                            window.scrollTo(0, document.body.scrollHeight)
                        }
                    }).catch((error) => {
                        console.log(error)
                        if (error.response.status == 400) {
                            $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4 text-center"><div class = "alert alert-danger h2 p-5" role = "alert"><p>Missing information!</p></div></div>`)
                            window.scrollTo(0, document.body.scrollHeight);
                        } else if (error.response.status == 401){
                           $("#adminResponse").html(`<div class = "d-flex justify-content-center" onclick = "badLoginRedir()" ><div id = adminResponse class="text-center h3 py-5 my-5 alert alert-warning col-md-8"><div class = py-5>Error 403 Forbidden.</div><div class = py-5>You don't have sufficient rights to access /admin on this server.</div><div class = py-5>Click here to return to the homepage.</div></div></div>`)
                           $("#adminInput").empty()
                        }
                    })
            }
        })
    }
}

function backToLogin() {
    window.location.assign("/login")
}