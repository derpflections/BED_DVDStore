const baseUrl = "http://localhost:3000"

$("#fcat-query").submit((event) =>{

    event.preventDefault();
    const reqBody = {
        queryID: $("#categorySelection").val()
    }
    console.log($("#categorySelection").val)
    const categoryID = reqBody.queryID
    axios.get(`${baseUrl}/film_categories/${categoryID}/films`)
        .then((response) => {
            console.log(response)
            if(response.status == 204) {
                document.getElementById("filmresponse").innerHTML = ``
                htmlData = `<p>Actor not found!</p>`
            } else {
                document.getElementById("filmresponse").innerHTML = ``
                resp = response.data
                console.log(resp)
                queryCat = resp[0].name
                htmlData = ``
                headCat = `<div class="text-center" id = "queryCat">Category: ${queryCat}</div>`
                filmNo = 0
                $("#filmresponse").append(headCat)
                resp.forEach((film) => {
                htmlData += `
                <div class = "col-md-6" id = "film${film.film_id} n${filmNo}">
                    <table class="table">
                    <tbody>
                      <tr>
                        <td>Film Title:</td>
                        <td>${commonFunction.multiStringCapitalize(film.title)}</td>
                      </tr>
                      <tr>
                        <td>Film Rating:</td>
                        <td>${film.rating}</td>
                      </tr>
                      <tr>
                        <td>Film's Release Year</td>
                        <td>${film.release_year}</td>
                      </tr>
                      <tr>
                        <td>Film's Rental Rate</td>
                        <td>${film.rental_rate}</td>
                      </tr>
                      <tr>
                        <td>Film's Duration:</td>
                        <td>${film.duration}</td>
                      </tr>
                    </tbody>
                    </table>
                    </div>`
                    filmNo++
                })
                $("#filmresponse").append(htmlData)
            }
        }) 
        .catch((error) => {
            console.log(error)
        })
})

$("#fcat-query").ready(() => {
    axios.get(`${baseUrl}/filmCat`)
        .then((response) => {
            console.log(response)
            resp = response.data
            resp.forEach((category) => {
                $("#categorySelection").append(`<option value = ${category.category_id}>${category.name}</option>`)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    axios.get(`${baseUrl}/filmRating`)
      .then((response) => {
        console.log(response)
        resp = response.data
        resp.forEach((rating) => {
          $("#ratingSelection").append(`<option value = ${rating.rating}>${rating.rating}</option>`)
        })
      })
})
