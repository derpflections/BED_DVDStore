const baseUrl = "http://localhost:3000"
const pattern = /^.{6,}$/;
var city = 0

function onLoad() {
    taskToDo = localStorage.getItem("accClickItem")
    if (taskToDo == 4) {
        axios.get(`${baseUrl}/getAllStores`)
            .then((response) => {
                // console.log(response.data)
                resp = response.data
                resp.forEach((store) => {
                    $("#store_id").append(`<option value = "${store.store_id}">${store.address}</option>`)
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
    customerId = localStorage.getItem("customerID")
    console.log(taskToDo)
    if (taskToDo == 4) {
        $("#custResponse").append(`<p class = "h2">Edit account information</p>`)
        $("#custInput").append(`
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
                        <input type="text" class="form-control" id="email" readonly></input>
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
                </div>
            </div>
        </form>`)
        $("#countrySelect").on("change", () => {
            axios.post(`${baseUrl}/getAllCities`, { id: $("#countrySelect").val() })
                .then((response) => {
                    htmlData = ""
                    console.log(response.status)
                    resp = response.data
                    resp.forEach((city) => {
                        htmlData += (`<option value = "${city.city_id}">${city.city}</option>`)
                    })
                    $("#citySelect").html(htmlData)
                })
        })
        axios.get(`${baseUrl}/getAllCustomer/${customerId}`)
            .then((response) => {
                console.log(response.data)
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
            })

        $("#editAcc").submit((event) => {
            event.preventDefault()
            if (pattern.test($("#password").val()) == false) {
                $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4"><div class = "alert alert-warning h3" role = "alert">Password must be at least 6 characters long!</div></div>`)
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                const reqBody3 = {
                    "customer_id": customerId,
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
                axios.put(`${baseUrl}/customer`, reqBody3)
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
                        }
                    })
            }
        })
        $("#email").click(() => { 
            $("#responseDiv").html(`<div class = "d-flex justify-content-center py-4 text-center"><div class = "alert alert-info h2 p-5" role = "alert"><p>Do contact customer service to change your account's email.</p></div></div>`) 
            window.scrollTo(0, document.body.scrollHeight)
        })
    } else if (taskToDo == 5) {
        $("#custResponse").append(`<p class = "h2">View Payment History</p>`)
        $("#custInput").append(`
            <form id = "payHist">
                <div class="input-group">
                    <div class = "paymentFormStart">
                        <label for = "start>Start Date: </label>
                        <input type="date" id = "start" class="form-control" required>
                    </div>
                    <div class = "paymentFormEnd">
                        <label for = "end">End Date: </label>
                        <input type="date" id = "end" class="form-control" required>
                    </div>
                </div>
                <div>
                    <button type = "submit" class = "btn btn-primary mt-3">Submit!</button>
                </div>
            </form>`)
        $("#payHist").submit((event) => {
            event.preventDefault()
            axios.get(`${baseUrl}/customer/${customerId}/payment`, {params: {
                start_date: $("#start").val(),
                end_date: $("#end").val()
            }})
            .then((response) => {
                resp = response.data.rental
                htmlData = ""
                resp.forEach((film) => {
                   htmlData += `
                        <tr>
                        <td>${film.title}</td>
                        <td>$${film.amount}</td>
                        <td>${film.payment_date.slice(0,10)}</td>
                        </tr>
                    `
                })
                $("#responseDiv").html(`<table class = "table px-5"><thead><tr><th>Title</th><th>Price</th><th>Rental Date</th></tr></thead>${htmlData}</table>`)
            })
            .catch((err) => {
                if(err.response.status == 406){
                    $("#responseDiv").html(`<div class = "d-flex justify-content-center pt-4 text-center"><div class = "alert alert-danger h2 p-5" role = "alert"><p>Please enter valid information!</p></div></div>`)
                }
            })
        })

    }
}

function backToLogin(){
    window.location.assign("/login")
}