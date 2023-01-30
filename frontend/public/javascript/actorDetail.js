const baseUrl = "http://localhost:3000"

function pullActorMovie () {
    id = localStorage.getItem("clickActor")
    if (id == undefined || id == ""){
        window.location.assign('/filmDetails')
    } else {
        axios.get(`${baseUrl}/getActor/${id}`)
            .then ((response) => {
                actorName = response.data[1][0]
                $("#actorName").append(`${commonFunction.multiStringCapitalize(actorName.first_name)} ${commonFunction.multiStringCapitalize(actorName.last_name)}`)
                $("#actorFilms").append(`<div class = "h5 py-2">This actor has acted in: </div>`)
                resp = response.data[0]
                resp.forEach((value) => {
                    $("#actorFilms").append(`<div class = 'col-md-6 actorFilms text-center border py-2' id = film${value.film_id} onclick = clickFilm(film${value.film_id})>${commonFunction.multiStringCapitalize(value.title)}</div>`)
                })


            })
            .catch((error) => {
                console.log(error)
              })
    }
}

function clickFilm (emitter) {
    console.log(emitter.id.replace("film", ""))
    localStorage.setItem("clickItem", emitter.id.replace("film",""))
    window.location.assign('/filmDetails')
  }