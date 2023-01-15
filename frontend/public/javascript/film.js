$("#fcat-query").submit((event) =>{
    event.preventDefault();
    const reqBody = {
        queryID: $("#f_category").val()
    }
    const baseUrl = "http://localhost:3000"
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
                $("#filmresponse").append(headCat)
                resp.forEach((film) => {
                htmlData += `
                            <div class = "col-md-6">
                                <p>Film Title: ${commonFunction.multiStringCapitalize(film.title)}</p>
                                <p>Film Rating: ${(film.rating)}</p>
                                <p>Film's Release Year: ${(film.release_year)}</p>
                                <p>Film's Duration: ${(film.duration)}</p>
                            </div>
                `})
                $("#filmresponse").append(htmlData)
            }
        }) 
        .catch((error) => {
            console.log(error)
        })
})

