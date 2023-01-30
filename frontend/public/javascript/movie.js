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
                inventoryInfo = response.data[2]

                $("#filmTitle").append(commonFunction.multiStringCapitalize(filmInfo.title))

                filmActorTable = `<table class = "text-center table table-bordered"><thead><tr><th scope = "col">Notable Actors!</th></tr><tbody>`
                actorInfo.forEach((info) => {
                    filmActorTable += `
                    <tr>
                        <td class = "actorHighlight" id = "actor${info.actor_id}" onclick= checkActor(actor${info.actor_id})>${commonFunction.multiStringCapitalize(info.first_name)} ${commonFunction.multiStringCapitalize(info.last_name)}</td>
                    </tr>`
                })
                filmActorTable += `</table></tbody>`
                $("#actorTable").append(filmActorTable)

                filmDescTable = `<table class = "table table-bordered"><thead><tr><th scope = "col" colspan = "2" class = "text-center">Film Details!</th></tr><tbody>`
                filmDescTable += `<tr><td>Film's Description:</td><td>${filmInfo.description}</td></tr>`
                filmDescTable += `<tr><td>Film's Category:</td><td>${filmInfo.category}</td></tr>`
                filmDescTable += `<tr><td>Film's Length:</td><td>${commonFunction.hourCalculator(filmInfo.length)}</td></tr>`
                filmDescTable += `<tr><td>Film's Release Year:</td><td>${filmInfo.release_year}</td></tr>`
                filmDescTable += `<tr><td>Film's Rental Rate:</td><td>$${filmInfo.rental_rate}</td></tr>`
                filmDescTable += `<tr><td>Film's Special Features:</td><td>${filmInfo.special_features.replace(",", ", ")}</td></tr>`
                filmDescTable += `<tr><td>Film's Language:</td><td>${filmInfo.language}</td></tr>`
                filmDescTable += `<tr><td>Film's Rating:</td><td>${filmInfo.rating}</td></tr>`
                $("#filmDescription").append(filmDescTable)

                storeArray = inventoryCounter(inventoryInfo)
                filmInvTable = `<table class = "table table-bordered"><thead><tr><th scope = "col" colspan = "2" class = "text-center">Check for inventory!</th></tr><tbody>`
                filmInvTable += `<tr><td>Store:</td><td>In Stock?</td></tr>`  
                storeArray.forEach(value => {
                    filmInvTable += `<tr><td>${value[0]}</td><td>${value[1]} piece(s) left!</td></tr>`
                })
                if (storeArray.length == 0) {
                    filmInvTable += `<tr><td colspan = 2 class = "text-center">Not in stock!</td></tr>`
                }
                $("#filmDescription").append(filmInvTable)
            })
            .catch((error) => {
                console.log(error)
              })
    }
}

function inventoryCounter (array){
    var uniqueStore = []
    var storeInvCounter = []
    var outputArray = []
    array.forEach(value => {
        if (!uniqueStore.includes(value["store_id",'address'])){
            uniqueStore.push(value["store_id",'address'])
        }
    })
    for (i = 0; i < uniqueStore.length ;i++){
        counter = 0
        array.forEach(value => {
            if (value['address'] == uniqueStore[i]){
                counter++
            }
        })
        storeInvCounter.push(counter)
    }
    for (i = 0 ; i < uniqueStore.length; i++){
        inputArray = [uniqueStore[i], storeInvCounter[i]]
        outputArray.push(inputArray)
    }
    return outputArray
}

function checkActor(emitter) {
  localStorage.setItem("clickActor", emitter.id.replace("actor",""))
  console.log(emitter.id.replace("actor",""))
  window.location.assign("/actorDetails")
}