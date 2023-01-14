console.log(`help me`)


$("#actor-query").submit((event) =>{
    console.log(`help`)
    event.preventDefault();
    const reqBody = {
        queryID: $("#actor_id").val()
    }
    const baseUrl = "http://localhost:3000"
    const actorID = reqBody.queryID
    axios.get(`${baseUrl}/actors/${actorID}`)
        .then((response) => {
            document.getElementById("response").innerHTML = ``
            console.log(response.data)
            resp = response.data
            htmlData = `
                            <p>First Name: ${multiStringCapitalize(resp.first_name)}</p>
                            <p>Last Name: ${multiStringCapitalize(resp.last_name)}</p>`;

            $("#response").append(htmlData)
        })
        .catch((error) => {
            console.log(error)
        })
})

