$("#actor-query").submit((event) =>{
    event.preventDefault();
    const reqBody = {
        first_name : $("#first_name").val(),
        last_name : $("#last_name").val()
    }
    const baseUrl = "http://localhost:3000"
    axios.post(`${baseUrl}/actorSearch`, reqBody)
        .then((response) => {
            console.log(response)
            if(response.status == 204) {
                $("#response").empty()
                htmlData = `<p>Actor not found!</p>`
            } else {
                $("#response").empty()
                resp = response.data
                console.log(resp)

                resp.forEach((actor) => {
                    $("#response").append(`<div class = "actorResponse col-md-6" id = "actor${actor.actor_id}"onclick = clickActor(actor${actor.actor_id})>
                        <div class = py-2>
                            <div>First name: ${commonFunction.multiStringCapitalize(actor.first_name)}</div>
                            <div>Last name: ${commonFunction.multiStringCapitalize(actor.last_name)}</div>
                        <div>
                    </div>`)
                })
            }
        }) 
        .catch((error) => {
            console.log(error)
        })
})

function clickActor (emitter) {
    console.log(emitter.id.replace("actor", ""))
    localStorage.setItem("clickActor", emitter.id.replace("actor",""))
    window.location.assign('/actorDetails')
}

