const baseUrl = "http://localhost:3000"

function pullFilm() {
    id = localStorage.getItem("clickItem")
    if (id == undefined || id == ""){
        window.location.assign('/film')
    } else {
        axios.get(`${baseUrl}/filmGet/${id}`)
            .then((response) => {
                filmInfo = response.data[0][0]
                actorInfo = response.data[1]
                console.log(response.data)
                $("#filmTitle").append(commonFunction.multiStringCapitalize(filmInfo.title))
                filmActorTable = `<table class = "text-center table table-bordered"><thead><tr><th scope = "col">Notable Actors!</th></tr><tbody>`
                actorInfo.forEach((info) => {
                    filmActorTable += `
                    <tr>
                        <td>${commonFunction.multiStringCapitalize(info.first_name)} ${commonFunction.multiStringCapitalize(info.last_name)}</td>
                    </tr>`
                })
                filmActorTable += `</table></tbody>`
                $("#actorTable").append(filmActorTable)

                filmDescTable = `<table class = "table table-bordered"><thead><tr><th scope = "col" colspan = "2" class = "text-center">Film Details!</th></tr><tbody>`
                filmDescTable += `<tr><td>Film's Description:</td><td>${filmInfo.description}</td></tr>`
                filmDescTable += `<tr><td>Film's Length:</td><td>${commonFunction.hourCalculator(filmInfo.length)}</td></tr>`
                filmDescTable += `<tr><td>Film's Release Year:</td><td>${filmInfo.release_year}</td></tr>`
                filmDescTable += `<tr><td>Film's Rental Rate:</td><td>${filmInfo.rental_rate}</td></tr>`
                filmDescTable += `<tr><td>Film's Special Features:</td><td>${filmInfo.special_features.replace(",", ", ")}</td></tr>`
                $("#filmDescription").append(filmDescTable)
            })
    }
}