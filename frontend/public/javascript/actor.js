$("#actor-query").submit((event) =>{
    event.preventDefault();
    const reqBody = {
        queryID: $("#actor_id").val()
    }
    const baseUrl = "http://localhost:3000"
    const actorID = reqBody.queryID
    axios.get(`${baseUrl}/actors/${actorID}`)
        .then((response) => {
            console.log(response)
            if(response.status == 204) {
                document.getElementById("response").innerHTML = ``
                htmlData = `<p>Actor not found!</p>`
            } else {
                document.getElementById("response").innerHTML = ``
                console.log(response.data)
                resp = response.data
                htmlData = `
                                <p>First Name: ${commonFunction.multiStringCapitalize(resp.first_name)}</p>
                                <p>Last Name: ${commonFunction.multiStringCapitalize(resp.last_name)}</p>`;
            }
            $("#response").append(htmlData)
            // 
        }) 
        .catch((error) => {
            console.log(error)
        })
})

