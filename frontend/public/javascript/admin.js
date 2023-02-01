function onAccess() {
    taskToDo = localStorage.getItem("accClickItem")
    if (taskToDo == 1) {
        $("#adminResponse").append(`<div>Add Customer</div>`)
        $("#adminInput").append(`
            <form>
                <div class="form-group">
                    <div>
                        <label for="fname">First Name:</label>
                        <div>
                            <input type="text" class="form-control" id="fname"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">Last Name:</label>
                        <div>
                            <input type="text" class="form-control" id="lname"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">E-Mail:</label>
                        <div>
                            <input type="text" class="form-control" id="email"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">Address Line 1:</label>
                        <div>
                            <input type="text" class="form-control" id="addrline1"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">Address Line 2:</label>
                        <div>
                            <input type="text" class="form-control" id="addrline2"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">City:</label>
                        <div>
                            <input type="text" class="form-control" id="city"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">Postal/Zip Code:</label>
                        <div>
                            <input type="text" class="form-control" id="postal"></input>
                        </div>
                    </div>
                    <div>
                        <label for="fname">Phone Number:</label>
                        <div>
                            <input type="text" class="form-control" id="phone"></input>
                        </div>
                    </div>
                </div>
            </form>`)

    }

    if (taskToDo == 2) {
        $("#adminResponse").append(`<p>Add Actor</p>`)
    }

    if (taskToDo == 3) {
        $("#adminResponse").append(`<p>Edit account information</p>`)
    }
}