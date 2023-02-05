//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05


const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const cors = require("cors")
const key = require("../config.js")
const verify = require("../auth/verify.js")
const jwt = require("jsonwebtoken")

const storeDB = require("../model/actor.js");
const customerDB = require("../model/customer.js");
const loginDB = require("../model/login.js");
const staffDB = require("../model/staff.js");
const filmDB = require("../model/film.js");


app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cors())


//endpoint 1
app.post("/actorSearch", (req, res) => {
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    storeDB.getActor(first_name, last_name, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal Server Error" }); //sends error message in json format w/ err code 500
        } else if (result === 204) {
            res.status(204).send(`No content. Record of given actor_id cannot be found.`)
            console.log(`No content. Record of given actor_id cannot be found.`) //prints error message to console
        } else {
            res.status(200).send(result); //sends result to postman/user.
        }
    })
})

//endpoint 2 
app.get('/actors', (req, res) => {
    var limit = req.query.limit
    var offset = req.query.offset
    storeDB.getActorOrder(limit, offset, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal Server Error" })//sends error message in json format w/ err 500
        } else {
            res.status(200).send(result) //sends result to postman/user
        }
    })
})

//endpoint 3
app.post("/actors", (req, res) => {
    var actor_details = { 'first_name': req.body.first_name, 'last_name': req.body.last_name }
    storeDB.addActor(actor_details, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal Server Error" }) //sends error message in json format w/ err 500
        } else if (result == 400) {
            res.status(400).json({ "error_msg": "missing data" }) //sends error msg in json format w/ err 400
        } else {
            res.status(201).json({ "actor_id": result.insertId.toString() }) //sends successful msg
        }
    })
})

//endpoint 4
app.put("/actors/:actor_id", (req, res) => {
    var actor_id = req.params.actor_id
    var actor_details = req.body
    console.log(actor_details)
    storeDB.updateActor(actor_id, actor_details, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
        } else if (result == 400) {
            res.status(400).json({ "error_msg": "missing data" }) //sends error message in json format w/ error 400
        } else if (result == 204) {
            res.status(204).send(`No Content. Record of given actor_id cannot be found.`) //sends error message in json format w/ error 204
        } else {
            res.status(200).json({ "success_msg": "record updated" }) //sends successful msg
        }
    })
})

//endpoint 5
app.delete("/actors/:actor_id", (req, res) => {
    var actor_id = req.params.actor_id
    storeDB.deleteActor(actor_id, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
        } else if (result == 204) {
            res.status(204).send(`No Content. Record of given actor_id cannot be found.`) //sends error message in json format w/ error 204
        } else {
            res.status(200).json({ "success_msg": "actor deleted" }) //sends successful msg
        }
    })
})

//endpoint 6 
app.get("/film_categories/:category_id/films", (req, res) => {
    var category_id = req.params.category_id
    filmDB.getCategory(category_id, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
        } else {
            for (i = 0; i < result.length; i++) { //this for loop converts the release_year and duration of the movies into a string.
                result[i].release_year = result[i].release_year.toString()
                result[i].duration = result[i].duration.toString()
            }
        res.status(200).json(result) //sends successful msg
        }
    })
})

//endpoint 7 
app.get("/customer/:customer_id/payment", (req, res) => {
    var customer_id = req.params.customer_id
    var start_date = req.query.start_date
    var end_date = req.query.end_date
    customerDB.getPaymentDetails(customer_id, start_date, end_date, (err, result) => {
        totalSum = 0
        if (err) {
            if (err.errno = 1525) {
                res.status(406).json({"error_msg":"Invalid input"})
            } else {
                res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
            }
        } else {
            for (i = 0; i < result.length; i++) { //this for loop adds the result into a variable, and changes it into a string.
                totalSum += result[i].amount
                result[i].amount = result[i].amount.toString()
            }
            totalSum = totalSum.toFixed(2) //rounds the variable to 2 decimal points
            if (result.length == 0) { // if the length of the result is 0, there is no record for the period, hence the sum is 0.
                totalSum = "0"
            }
            res.status(200).json({ "rental": result, "total": totalSum }) //sends successful msg
        }
    })
})

//endpoint 8
app.put("/customer", (req, res) => {
    var details = req.body
    var address = details.address
    customerDB.postNewCustomer(details, address, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
        } else if (result == 400) {
            res.status(400).json({ "error_msg": "missing data" }) //sends error message in json format w/ error 400
        } else if (result == 1062) {
            res.status(409).send({ "error_msg": "email already exist" }) //sends error message in json format w/ error 409
        } else {
            res.status(200).json(result) //sends successful msg
        }
    })
})

//endpoint 9 -> posting new city and country
app.post("/country", (req, res) => {
    var country = req.body.country
    var city = req.body.city
    storeDB.postNewLocation(country, city, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error" }) //sends error message in json format w/ error 500
        } else if (result == 400) {
            res.status(400).json({ "error_msg": "Missing Data!" }) //sends error message in json format w/ error 400
        } else if (result == 409) {
            res.status(409).json({ "error_msg": "Geographic location already present in system!" }) //sends error message in json format w/ error 409
        } else {
            res.status(201).json({ "cityID": result[1].toString(), "countryID": result[2].toString() }) //sends successful msg
        }
    })
})

//endpoint 10 -> posting new staff
app.put("/staff", (req, res) => {
    var details = req.body
    var address = details.address
    console.log(details)
    console.log(address)
    staffDB.postNewStaff(details, address, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 400) {
            res.status(400).json({ "error_msg": "Missing Data!" }) //sends error message in json format w/ error 400
        } else {
            res.status(200).json({result}) //sends successful msg
        }
    })
})

//endpoint 11 -> logging in staff
app.post("/adminLogin", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    loginDB.staffLogin(username, password, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 403) {
            res.status(403).json({ "error_msg": "person not verified" })
        } else {
            const payload = { staff_id: result.staff_id }
            jwt.sign(payload, key, { algorithm: "HS256" }, (error, token) => {
                if (err) {
                    console.log(error)
                    res.status(401).json({ "error": "unauthorized" })
                } else {
                    res.status(200).json({ token: token, result: result })
                }
            })
            // res.status(201).json(result)
        }
    })
})

//endpoint 12 -> checking staff on startup
app.get("/adminCheck", verify, (req, res) => {
    var staffid = req.decodedToken.staff_id
    loginDB.staffVerify(staffid, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 403) {
            res.status(403).json({ "error_msg": "person not verified" })
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 13 -> logging in customer
app.post("/custLogin", (req, res) => {
    var email = req.body.email
    var password = req.body.password
    loginDB.custLogin(email, password, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 403) {
            res.status(403).json({ "error_msg": "person not verified" })
        } else {
            const payload = { customer_id: result.customer_id }
            jwt.sign(payload, key, { algorithm: "HS256" }, (error, token) => {
                if (err) {
                    console.log(error)
                    res.status(401).json({ "error": "unauthorized" })
                } else {
                    res.status(200).json({ token: token, result: result })
                }
            })
        }
    })
})

//endpoint 14 -> checks if customer login is valid
app.get("/custCheck", verify, (req, res) => {
    var customer_id = req.decodedToken.customer_id
    loginDB.custVerify(customer_id, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 403) {
            res.status(403).json({ "error_msg": "person not verified" })
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 15 -> checks for category of films
app.get("/filmCat", (req, res) => {
    filmDB.filmCatList((err, result) => {
        if (err){
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 16 -> gets distinct list of ratings
app.get("/filmRating", (req, res) => {
    filmDB.filmRatingList((err, result) => {
        if (err){
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 17 -> gets films based on criteria
app.post("/filmSearch", (req, res) => {
    var category = req.body.category
    var rating = req.body.rating
    var title = req.body.title
    var price = req.body.price
    // console.log(req.body.category)
    filmDB.filmSearch(category, rating, title, price, (err, result) => {
        if (err){
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else if (result == 204){
            res.status(204).json({"error_msg":"no movies found"})
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 18 -> get all film details based on id 
app.get("/filmGet/:film_id", (req, res) => {
    var id = req.params.film_id
    filmDB.getFilmDetails(id, (err, result) => {
        if (err){
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 19 -> gets films that actor has acted in 
app.get("/getActor/:actor_id", (req, res) =>{
    var id = req.params.actor_id
    filmDB.getActorFilms(id, (err, result) => {
        if (err){
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 20 => getting list of all stores
app.get("/getAllStores", (req, res) => {
    storeDB.getAllStores((err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 21 => getting list of all cities
app.post("/getAllCities", (req, res) => {
    id = req.body.id
    storeDB.getAllCity(id, (err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 22 ->  getting list of all countries
app.get("/getAllCountry", (req, res) => {
    searchStr = req.body.searchStr
    storeDB.getAllCountry((err, result) => {
        if (err) {
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result)
        }
    })
})

//endpoint 23 -> getting staff details from database
app.get("/getAllStaff/:id", verify, (req, res) => {
    var id = req.params.id
    console.log(req.decodedToken)
    var role = req.decodedToken
    if (role.staff_id == undefined){
        res.status(401).json({"error_msg":"Not authorized!"})
    } else {
        staffDB.getAllStaff(id, (err, result) => {
            if (err) {
                res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
            } else {
                res.status(200).json(result[0])
            }
        })
    }
})

//endpoint 24 -> getting customer details from database
app.get("/getAllCustomer/:id", (req, res) => {
    var id = req.params.id
    customerDB.getAllCustomer(id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ "error_msg": "Internal server error!" }) //sends error message in json format w/ error 500
        } else {
            res.status(200).json(result[0])
        }
    })
})


 


module.exports = app